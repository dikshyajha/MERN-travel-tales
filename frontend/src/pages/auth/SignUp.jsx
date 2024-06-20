import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Container, Group, Select } from '@mantine/core';
import { Link } from 'react-router-dom';
import { PostRequest } from "../../plugins/https";
import { useNavigate } from "react-router";
const SignUp = () => {
    const [user, setUser] = useState({
        name: '',
        contact: '',
        email: '',
        username: '',
        password: '',
        gender: '',
        role: 'user',
        // profileImage: null
    });

    const [error, setError] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // For previewing selected image

    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };
    const fileHandler = (e) => {
        const file = e.target.files[0];
        setUser({
            ...user,
            profileImage: file
        });
        setImagePreview(URL.createObjectURL(file)); // Preview selected image
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors

        console.log('User Data:', user);
        if (!user.name || !user.contact || !user.gender || !user.email || !user.username || !user.password || !user.role) {
            setError('Please fill all the boxes');
            return;
        }


        try {
            const res = await PostRequest("/auth/signup", user);
            console.log(res);
            if (res.status === 201) {
                navigate("/auth/signin");
            } else {
                setError(res?.message || 'Failed to sign up');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data.message);
            } else {
                console.error(error);
                setError('An error occurred while signing up');
            }
        }

    };


    return (

        <Container size="xs">
            <Paper withBorder shadow="md" p="md" radius="md" style={{ background: 'rgba(255, 255, 255, 0.8)' }}>
                <Title order={2} align="start" style={{ marginBottom: '6px', color: '#228b22', fontFamily: 'Tenor Sans, sans-serif', fontSize: '36px' }}>Sign Up</Title>
                <p style={{ marginBottom: '6px', fontFamily: 'Assistant, sans-serif', fontSize: '28px', fontWeight: 400 }}>Join Travel Tales!</p>
                <form onSubmit={submitForm} style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '0 auto' }}>
                    {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                    <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                        {/* <label htmlFor="profileImage" style={{ cursor: 'pointer', display: 'block' }}>
                            <div style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                backgroundColor: '#f0f0f0',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: '0 auto',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Profile Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <span style={{ fontSize: '24px', color: '#228b22' }}>+</span>
                                )}
                            </div>
                            <p style={{ marginTop: '8px', fontFamily: 'Assistant, sans-serif', fontSize: '16px', fontWeight: 600, color: '#228b22' }}>
                                Add Profile Image
                            </p>
                        </label> */}
                        <input
                            type="file"
                            id="profileImage"
                            name="profileImage"
                            accept="image/*"
                            onChange={fileHandler}
                            style={{ display: 'none' }}

                        />
                    </div>
                    <TextInput
                        label="Name"
                        placeholder="Enter your name"
                        name="name"
                        value={user.name}
                        onChange={inputHandler}
                        required
                        autoComplete="off"
                        style={{ flexGrow: 1 }}
                    />
                    <TextInput
                        label="Contact No."
                        placeholder="Enter your contact number"
                        name="contact"
                        value={user.contact}
                        onChange={inputHandler}
                        required
                        autoComplete="off"
                        style={{ flexGrow: 1 }}
                    />
                    <Select
                        label="Gender"
                        placeholder="Select your gender"
                        name="gender"
                        value={user.gender}
                        onChange={(value) => setUser({ ...user, gender: value })}
                        data={[
                            { value: 'male', label: 'Male' },
                            { value: 'female', label: 'Female' },
                            { value: 'other', label: 'Other' },
                        ]}
                        required
                        autoComplete="off"
                        style={{ flexGrow: 1 }} />
                    <TextInput
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={inputHandler}
                        required
                        autoComplete="off"
                        style={{ flexGrow: 1 }} />
                    <TextInput
                        label="Username"
                        placeholder="Enter your username"
                        name="username"
                        value={user.username}
                        onChange={inputHandler}
                        required
                        autoComplete="off"
                        style={{ flexGrow: 1 }} />
                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        name="password"
                        value={user.password}
                        onChange={inputHandler}
                        required
                        autoComplete="off"
                        style={{ flexGrow: 1 }} />

                    <TextInput
                        label="Role"
                        placeholder="User"
                        name="role"
                        value={user.role}
                        readOnly // read-only so the user can't change it
                        autoComplete="off"
                        style={{ flexGrow: 1 }} />


                    <Group position="right" >
                        <Button type="submit" color="#228b22" radius="sm" size="md" style={{ width: '100%', fontFamily: 'Tenor Sans, sans-serif' }}>
                            Sign Up
                        </Button>
                    </Group>
                </form>
                <div style={{ marginTop: '8px', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'Assistant, sans-serif', fontSize: '20px', fontWeight: 600 }}>Already have an account? <Link to="/auth/signin" style={{ color: '#228b22', fontWeight: 'bold', textDecoration: 'underline' }}>
                        Sign In
                    </Link></p>
                </div>
            </Paper>
        </Container>
    );
};

export default SignUp;
