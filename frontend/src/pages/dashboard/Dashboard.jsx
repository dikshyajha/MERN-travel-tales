import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Home, Plus, Save, Settings, LogOut, Heart, MessageCircle, Bookmark, User, Send } from 'react-feather';

import { Card, Collapse } from "@mantine/core";
import axios from "axios";
import logo2 from "../../assets/images/logo2.png";

export const Dashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedDescriptions, setExpandedDescriptions] = useState({});
    const navigate = useNavigate();

    const handleSignout = () => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.reload();
            navigate("/signin", { replace: true });
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const getBlogs = async () => {
        try {
            const res = await axios.get("http://localhost:8888/blogpost/create");
            setBlogs(res.data.getpost);
        } catch (error) {
            console.error("error fetching blogs. Please try again");
        }
    };

    useEffect(() => {
        getBlogs();
    }, []);

    const handleSavePost = async (postId) => {
        try {
            await axios.post(
                `http://localhost:8888/savedpost/save`,
                { postId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            alert("Post saved successfully!");
        } catch (error) {
            console.error("Error saving post:", error);
            alert(error.response.data.message);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // ✅ GET LOGGED USER
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    const loggedUserId = loggedUser?._id;

    // ✅ FILTER OUT OWN POSTS + SEARCH
    const filteredBlogs = blogs
        .filter((blog) => blog.author._id !== loggedUserId) // remove user’s own posts
        .filter((blog) => {
            const titleLowerCase = blog.title.toLowerCase();
            const searchWords = searchQuery.toLowerCase().split(" ");
            return searchWords.some((word) => titleLowerCase.includes(word));
        });

    return (
        <div className="bg-white min-h-screen">
            {/* Navbar */}
            <nav className="bg-white p-4 shadow-md w-full z-10 fixed top-0">
                <div className="container flex items-center justify-between">
                    <img src={logo2} alt="TravelTales Logo" className="h-10 w-40" />
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            name="search"
                            onChange={handleSearchChange}
                            className="p-2 border border-gray-400 rounded-xl font-thin"
                            style={{ fontFamily: "Tenor Sans, sans-serif" }}
                        />
                        <button
                            className="bg-[#228b22] text-white rounded-xl w-24 h-10 ml-2"
                            style={{ fontFamily: "Tenor Sans, sans-serif" }}
                        >
                            Search
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <User
                            onClick={() => navigate("/profile")}
                            className="text-black hover:text-[#228b22] transition-colors pr-4 w-28 h-8"
                        />
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <div className="fixed h-full w-48 bg-white shadow-md pt-24">
                <nav className="flex flex-col p-4 space-y-12">
                    {/* Home */}
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `flex items-center text-black py-2 px-4 rounded-lg transition-colors ${isActive ? "bg-[#228b22] text-white" : "hover:bg-[#228b22] hover:text-white"
                            }`
                        }
                    >
                        <Home className="mr-2" />
                        <span className="text-xl font-medium">Home</span>
                    </NavLink>

                    <NavLink
                        to="/addPost"
                        className={({ isActive }) =>
                            `flex items-center text-black py-2 px-4 rounded-lg transition-colors ${isActive ? "bg-[#228b22] text-white" : "hover:bg-[#228b22] hover:text-white"
                            }`
                        }
                    >
                        <Plus className="mr-2" />
                        <span className="text-xl font-medium">Add Post</span>
                    </NavLink>

                    <NavLink
                        to="/chat"
                        className={({ isActive }) =>
                            `flex items-center text-black py-2 px-4 rounded-lg transition-colors ${isActive ? "bg-[#228b22] text-white" : "hover:bg-[#228b22] hover:text-white"
                            }`
                        }
                    >
                        <MessageCircle className="mr-2" />
                        <span className="text-xl font-medium">Chat</span>
                    </NavLink>


                    {/* Sign out */}
                    <button
                        className="flex items-center text-black hover:bg-[#228b22] hover:text-white py-2 px-4 rounded-lg transition-colors"
                        onClick={handleSignout}
                    >
                        <LogOut className="mr-2" />
                        <span className="text-xl font-medium">Sign out</span>
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="bg-white min-h-screen">
                <main className="ml-48 p-6 pt-28 bg-white min-h-screen border-t-4 border-[#f8fbf8]">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredBlogs.map((blog) => (
                                <div
                                    key={blog._id}
                                    className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                                >
                                    <img
                                        className="w-full h-56 object-cover"
                                        src={`http://localhost:8888/${blog?.image}`}
                                        alt="Blog Post"
                                    />
                                    <div className="p-4 flex flex-col h-full">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3
                                                className="text-lg text-black"
                                                style={{ fontFamily: "Tenor Sans, sans-serif" }}
                                            >
                                                {blog.author.username}
                                            </h3>

                                            <div className="flex space-x-4 text-black">
                                                <Send
                                                    className="cursor-pointer hover:text-[#228b22]"
                                                    onClick={() => {
                                                        navigate(`/chat/${blog.author._id}`, {
                                                            state: { username: blog.author.username }
                                                        });
                                                    }}
                                                />


                                                <Bookmark
                                                    className="cursor-pointer hover:text-[#228b22]"
                                                    onClick={() => handleSavePost(blog._id)}
                                                />
                                            </div>
                                        </div>
                                        <h2
                                            className="text-lg mb-2 text-black pt-2"
                                            style={{ fontFamily: "Tenor Sans, sans-serif" }}
                                        >
                                            {blog.title}
                                        </h2>
                                        <div
                                            className="text-black mb-2 line-clamp-3 pt-2"
                                            style={{ fontFamily: "Tenor Sans, sans-serif" }}
                                        >
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        blog.description.length > 100
                                                            ? `${blog.description.substring(0, 200)}...`
                                                            : blog.description,
                                                }}
                                            />
                                        </div>
                                        <div className="flex py-2 justify-between items-center">
                                            <button
                                                className="flex-grow py-2 rounded-lg hover:bg-[#228b22] hover:text-[white] bg-[#beeebe] text-[#228b22] transition-colors duration-200"
                                                onClick={() => navigate(`/viewpost/${blog._id}`)}
                                            >
                                                See more
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
