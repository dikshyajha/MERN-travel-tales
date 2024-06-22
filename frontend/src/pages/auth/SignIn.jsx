import axios from "axios";
import baseAxios from "../../plugins/axios";
import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Container, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { PostRequest } from "../../plugins/https";
import { setTokenToLocalStorage } from "../../utils/localstorage.helper";
import { setAuthorizationHeader } from "../../utils/auth.helper";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/modules/auth/action";  //setToken: Action creator dispatched to store the token in Redux.

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (name) => (event) => {
        const value = event.target.value;
        setFormData((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await PostRequest("auth/signin", {
                username: formData.username,
                password: formData.password,
            });
            const { token, user } = res.data;

            setTokenToLocalStorage(res.data.token);
            setAuthorizationHeader(res.data.token);
            localStorage.setItem('user', JSON.stringify(user)); // Store user info in localStorage

            dispatch(setToken(token)); //dispatch an action(setToken) to redux to save tokennn
            if (user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (e) {
            // console.log();
            alert(e.data.message)
        }
    };

    return (
        <Container size="xs" style={{ marginTop: '124px' }}>
            <Paper withBorder shadow="md" p="xl" radius="md" style={{ background: 'rgba(255, 255, 255, 0.8)' }}>
                <Title order={2} align="start"
                    style={{ marginBottom: '20px', color: '#228b22', fontFamily: 'Tenor Sans, sans-serif', fontSize: '36px' }}>Sign In</Title>
                <p style={{ marginBottom: '20px', fontFamily: 'Assistant, sans-serif', fontSize: '28px', fontWeight: 400 }}>Welcome back to Travel Tales!</p>
                < form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', margin: '0 auto' }} >
                    {error && <Text color="red" align="center" style={{ marginBottom: '20px', fontFamily: 'Assistant, sans-serif', fontSize: '20px', fontWeight: 600 }}>{error}</Text>}

                    <TextInput
                        label="Username"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleChange('username')}
                        required
                        autoComplete="off"
                        style={{ flexGrow: 1 }}


                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange('password')}
                        required
                        autoComplete="off"
                        style={{ flexGrow: 1 }}



                    />
                    <Group position="right" mt="md">
                        <Button type="submit" color="#228b22" radius="sm" size="md" style={{ width: '100%', fontFamily: 'Tenor Sans, sans-serif' }}>
                            Sign In
                        </Button>
                    </Group>
                </form>
                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'Assistant, sans-serif', fontSize: '20px', fontWeight: 600 }}>Don't have an account yet? <Link to="/auth/signup" style={{ color: '#228b22', fontWeight: 'bold', textDecoration: 'underline' }}>
                        Sign Up
                    </Link></p>
                </div>
            </Paper>
        </Container >
    );
};

export default SignIn;
