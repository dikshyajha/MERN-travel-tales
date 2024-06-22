import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    //     faBell,
    faUser,
    //     faHome,
    //     faPlus,
    //     faSave,
    //     faCog,
    //     faSignOutAlt,
    //     faHeart,
    //     faComment,
    //     faBookmark
} from "@fortawesome/free-solid-svg-icons";
import { Home, Plus, Save, Settings, LogOut, Heart, MessageCircle, Bookmark, User, Edit } from 'react-feather';

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
            console.log(res.data.getpost);
            setBlogs(res.data.getpost);
            // console.log(blogs.getPost.author);
        } catch (error) {
            console.error("error fetching blogs. Please try again");
        }
    };

    useEffect(() => {
        getBlogs();
    }, []);


    const handleSavePost = async (postId) => {
        try {
            await axios.post(`http://localhost:8888/savedpost/save`, { postId }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            alert("Post saved successfully!");
        } catch (error) {
            console.error("Error saving post:", error);
            alert(error.response.data.message)
        }
    };
    // const toggleExpandDescriptions = (index) => {
    //     setExpandedDescriptions((prevState) => ({
    //         ...prevState,
    //         [index]: !prevState[index],
    //     }));
    // };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };



    const filteredBlogs = blogs.filter((blog) => {
        const titleLowerCase = blog.title.toLowerCase();
        const searchWords = searchQuery.toLowerCase().split(' ');
        return searchWords.some((word) => titleLowerCase.includes(word));
    })

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
                            style={{ fontFamily: 'Tenor Sans, sans-serif' }}

                        />
                        <button className="bg-[#228b22] text-white rounded-xl w-24 h-10 ml-2"
                            style={{ fontFamily: 'Tenor Sans, sans-serif' }}
                        >
                            Search
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* <a
                            href="#notifications"
                            className="text-black hover:text-[#228b22] transition-colors">
                            <FontAwesomeIcon icon={faBell} />
                        </a> */}
                        <User
                            onClick={() => navigate("/profile")}
                            className="text-black hover:text-[#228b22] transition-colors pr-4 w-28 h-8">
                        </User>
                        {/* <div className="flex items-center space-x-4">
                            <a
                                href=""
                                onClick={() => navigate("/profile")}
                                className="text-black hover:text-[#228b22] transition-colors pr-4 ">
                                <FontAwesomeIcon icon={faUser} />
                            </a>
                        </div> */}
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <div className="fixed h-full w-48 bg-white shadow-md pt-24">
                <nav className="flex flex-col p-4 space-y-12">
                    {/* Home */}
                    <NavLink
                        to="/dashboard"
                        className="flex items-center text-black hover:bg-[#228b22] hover:text-white py-2 px-4 rounded-lg transition-colors"
                        activeClassName="bg-gray-200 text-[#228b22]">
                        <Home className="mr-2" />
                        <span className="text-xl font-medium">Home</span>
                    </NavLink>
                    {/* <NavLink
                        to="/my-posts"
                        className="flex items-center text-black hover:bg-gray-100 py-2 px-4 rounded-lg transition-colors"
                        activeClassName="bg-gray-200 text-[#228b22]">
                        <Home className="mr-2" />
                        <span className="text-lg font-medium">My Posts</span>
                    </NavLink> */}

                    {/* Add Post */}
                    <NavLink
                        to="/addPost"
                        className="flex items-center text-black hover:bg-[#228b22] hover:text-white py-2 px-4 rounded-lg transition-colors"
                        activeClassName="bg-gray-200 text-[#228b22]">
                        <Plus className="mr-2" />
                        <span className="text-xl font-medium">Add Post</span>
                    </NavLink>

                    {/* Saved */}
                    {/* <NavLink
                        to="/saved"
                        className="flex items-center text-black hover:bg-gray-100 py-2 px-4 pt-4 rounded-lg transition-colors"
                        activeClassName="bg-gray-200 text-[#228b22]">
                        <Bookmark className="mr-2" />

                        <span className="text-lg font-medium">Saved</span>
                    </NavLink>

                    {/* Settings */}
                    {/* <NavLink
                        to="/settings"
                        className="flex items-center text-black hover:bg-gray-100 py-2 px-4 pt-4 rounded-lg transition-colors"
                        activeClassName="bg-gray-200 text-[#228b22]">
                        <Settings className="mr-2" /> 

                        <span className="text-lg font-medium">Settings</span>
                    </NavLink> */}

                    {/* Sign out */}
                    <button
                        className="flex items-center text-black hover:bg-[#228b22] hover:text-white py-2 px-4 rounded-lg transition-colors"
                        onClick={handleSignout}>
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
                            {filteredBlogs.map((blog, index) => (
                                <div key={blog._id} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                                    <img
                                        className="w-full h-56 object-cover"
                                        src={`http://localhost:8888/${blog?.image}`}
                                        alt="Blog Post"
                                    />
                                    <div className="p-4 flex flex-col h-full">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-lg  text-black" style={{ fontFamily: 'Tenor Sans, sans-serif' }}>
                                                {blog.author.username}
                                            </h3>
                                            <div className="flex space-x-4 text-black">
                                                {/* <Heart className="cursor-pointer hover:text-[#228b22]" />
                                                <MessageCircle className="cursor-pointer hover:text-[#228b22]" /> */}
                                                <Bookmark className="cursor-pointer hover:text-[#228b22]" onClick={() => handleSavePost(blog._id)} />
                                            </div>
                                        </div>
                                        <h2 className="text-lg mb-2 text-black pt-2" style={{ fontFamily: 'Tenor Sans, sans-serif' }}>
                                            {blog.title}
                                        </h2>
                                        <div className="text-black mb-2 line-clamp-3 pt-2" style={{ fontFamily: 'Tenor Sans, sans-serif' }}>
                                            {/* {blog.description.length > 100 ? `${blog.description.substring(0, 100)}...` : blog.description} */}
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
                                                className=" flex-grow py-2 rounded-lg hover:bg-[#228b22] hover:text-[white] bg-[#beeebe] text-[#228b22] focus:outline-none bottom-0 transition-colors duration-200"
                                                onClick={() => navigate(`/viewpost/${blog._id}`)}>
                                                See more
                                            </button>

                                        </div>
                                        {/* <Collapse in={expandedDescriptions[index]}>
                                        {blog.description}
                                    </Collapse>
                                    <div
                                        className="text-black font-semibold mb-2" style={{ fontFamily: 'Assistant, sans-serif' }}
                                        onClick={() => toggleExpandDescriptions(index)}>
                                        {expandedDescriptions[index] ? "see less..." : "see more..."}
                                    </div>
                                    <div className="px-4 py-2 flex justify-between items-center bg-gray-100">
                                        <button
                                            className="text-[#228b22] hover:text-[#176911] focus:outline-none"
                                            onClick={() => navigate(`/viewPost`)}>
                                            Read more
                                        </button>
                                    </div> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>

        </div >
    );
};