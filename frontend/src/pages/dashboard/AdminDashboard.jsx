import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo2 from '../../assets/images/logo2.png'
import { logout } from '../../utils/auth.helper'
export const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/signin', { replace: true });
            return;
        }

        try {
            const response = await axios.get('/admin/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(response.data.data || []);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSignout = () => {
        try {
            logout();
            // localStorage.clear();
            // window.location.reload();
            // navigate('/signin');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    // if (error) {
    //     return <p>Error fetching users: {error.message}</p>;
    // }

    return (
        <div className="flex flex-col h-screen">
            <nav className="flex justify-between items-center p-4">
                <div className="navbar-logo">
                    <img
                        src={logo2}
                        alt="TravelTales Logo"
                        className="h-10 w-40"
                    />
                </div>
                <h1 className="text-4xl text-[#228b22]" style={{ fontFamily: 'Tenor Sans, sans-serif' }}>Admin Dashboard</h1>
                <button
                    onClick={handleSignout}
                    className="bg-[#228b22] hover:bg-gray-100 text-white py-2 px-4 rounded-lg transition-colors style={{ fontFamily: 'Tenor Sans, sans-serif' }}">
                    Sign out
                </button>


            </nav>
            <div className="flex-grow p-8 bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    {users.length === 0 ? (
                        <p className="text-gray-500">No users found.</p>
                    ) : (
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Name</th>
                                    <th className="py-2 px-4 border-b">Contact</th>
                                    <th className="py-2 px-4 border-b">Email</th>
                                    <th className="py-2 px-4 border-b">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-100">
                                        <td className="py-2 px-4 border-b">{user.name}</td>
                                        <td className="py-2 px-4 border-b">{user.contact}</td>
                                        <td className="py-2 px-4 border-b">{user.email}</td>
                                        <td className="py-2 px-4 border-b">{user.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>

    );
};







