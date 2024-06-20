import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBell,
    faUser,
    faHome,
    faPlus,
    faSave,
    faCog,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Card, Collapse } from "@mantine/core";
import axios from "axios";
import logo2 from "../../assets/images/logo2.png";

export const Dashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const [expandedDescriptions, setExpandedDescriptions] = useState({});
    const navigate = useNavigate();

    const handleSignout = () => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            navigate("/signin", { replace: true });
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    // useEffect(() => {
    //   handleSignout();
    // }, []);

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

    const toggleExpandDescriptions = (index) => {
        setExpandedDescriptions((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };
    return (
        <div className="bg-white min-h-screen">
            {/* Navbar */}
            <nav className="bg-white p-4 shadow-md fixed w-full z-10">
                <div className="container flex items-center justify-between">
                    <img src={logo2} alt="TravelTales Logo" className="h-10 w-40" />
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search"
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
                        <a
                            href=""
                            onClick={() => navigate("/profile")}
                            className="text-black hover:text-[#228b22] transition-colors pr-4">
                            <FontAwesomeIcon icon={faUser} />
                        </a>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <div className="fixed h-full w-48 bg-white shadow-md pt-24">
                <nav className="flex flex-col p-4 space-y-2">
                    {/* Home */}
                    <NavLink
                        to="/dashboard"
                        className="flex items-center text-black hover:bg-gray-100 py-2 px-4 rounded-lg transition-colors"
                        activeClassName="bg-gray-200 text-[#228b22]">
                        <FontAwesomeIcon icon={faHome} className="mr-2 text-black" />
                        <span className="text-lg font-medium">Home</span>
                    </NavLink>

                    {/* Add Post */}
                    <NavLink
                        to="/addPost"
                        className="flex items-center text-black hover:bg-gray-100 py-2 px-4 rounded-lg transition-colors"

                        activeClassName="bg-gray-200 text-[#228b22]">
                        <FontAwesomeIcon icon={faPlus} className="mr-2 text-black" />
                        <span className="text-lg font-medium">Add Post</span>
                    </NavLink>

                    {/* Saved */}
                    <NavLink
                        to="/saved"
                        className="flex items-center text-black hover:bg-gray-100 py-2 px-4 rounded-lg transition-colors"
                        activeClassName="bg-gray-200 text-[#228b22]">
                        <FontAwesomeIcon icon={faSave} className="mr-2 text-black" />
                        <span className="text-lg font-medium">Saved</span>
                    </NavLink>

                    {/* Settings */}
                    <NavLink
                        to="/settings"
                        className="flex items-center text-black hover:bg-gray-100 py-2 px-4 rounded-lg transition-colors"
                        activeClassName="bg-gray-200 text-[#228b22]">
                        <FontAwesomeIcon icon={faCog} className="mr-2 text-black" />
                        <span className="text-lg font-medium">Settings</span>
                    </NavLink>

                    {/* Sign out */}
                    <button
                        className="flex items-center text-black hover:bg-gray-100 py-2 px-4 rounded-lg transition-colors"
                        onClick={handleSignout}>
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-black" />
                        <span className="text-lg font-medium">Sign out</span>
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <main className="ml-48 p-6 pt-28 bg-white min-h-screen border-t-4 border-[#f8fbf8]">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-md rounded-lg overflow-hidden">
                                <img
                                    className="w-full h-56 object-cover"
                                    // src="https://cdn.pixabay.com/photo/2022/03/24/07/54/nepal-7088480_1280.jpg"
                                    src={`http://localhost:8888/${blog?.image}`}
                                    alt="Blog Post"
                                />
                                <h3 className="flex items-center mb-2 text-black text-lg font-bold "
                                    style={{ fontFamily: 'Tenor Sans, sans-serif' }}
                                >
                                    {blog.author.username}
                                </h3>
                                <h2 className="font-bold text-lg text-black mb-2 " style={{ fontFamily: 'Tenor Sans, sans-serif' }}
                                >{blog.title}</h2>
                                <Collapse in={expandedDescriptions[index]}>
                                    <p className="text-gray-700 mb-4">{blog.description}</p>
                                </Collapse>
                                <div
                                    className="text-black font-semibold"
                                    style={{ fontFamily: 'Assistant, sans-serif' }}
                                    onClick={() => toggleExpandDescriptions(index)}>
                                    {expandedDescriptions[index] ? "see less..." : "see more..."}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};