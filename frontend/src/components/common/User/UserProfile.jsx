import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
import { Home, Edit, Plus, Save, Settings, LogOut, Heart, MessageCircle, Bookmark, User, Grid, PlusCircle, } from 'react-feather';
import logo2 from "../../../assets/images/logo2.png";
import axios from "axios";
import { logout } from '../../../utils/auth.helper'


const UserProfile = () => {
    const [view, setView] = useState("posts");

    const [user, setUser] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = JSON.parse(localStorage.getItem("user"));
            console.log(userData._id);
            if (userData) {
                setUser(userData);
                try {
                    const postsResponse = await axios.get(
                        `http://localhost:8888/blogpost/getUserPost/${userData._id}`
                    );
                    setUserPosts(postsResponse.data.userPosts);
                    console.log(postsResponse.data.userPosts);

                    // console.log("madan", postsResponse);
                    // console.log(userPosts);
                    // const savedResponse = await axios.get(
                    //   `http://localhost:8888/posts/saved/${userData._id}`
                    // );
                    // setSavedPosts(savedResponse.data.savedPosts);
                } catch (err) {
                    console.error("Error fetching posts:", err);
                }
            } else {
                navigate("/signin");
            }
        };

        fetchUserData();
    }, [navigate]);


    useEffect(() => {
        const fetchSavedPosts = async () => {
            if (view === "saved") {
                try {
                    const savedResponse = await axios.get(
                        `http://localhost:8888/savedpost/saved`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`
                            }
                        }
                    );
                    // console.log(savedResponse.data);
                    setSavedPosts(savedResponse.data.map(v => v.postId));
                } catch (err) {
                    console.error("Error fetching saved posts:", err);
                }
            }
        };

        fetchSavedPosts();
    }, [view]);

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



    // const displayPosts = view === "posts" ? userPosts : savedPosts;


    const getInitials = (name) => {
        if (!name) return "";

        return name.split(" ").map((part) => part.charAt(0).toUpperCase()).join("");
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Navbar */}
            <nav className="bg-white p-4 shadow-md w-full z-10 top-0 fixed">
                <div className="container flex items-center justify-between">
                    <img src={logo2} alt="TravelTales Logo" className="h-10 w-40" />
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search"
                            className="p-2 border border-gray-300 rounded-xl"
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
                        {/* <a
                            // href=""
                            onClick={() => navigate("/profile")}
                            className="text-black hover:text-[#228b22] transition-colors">
                            <FontAwesomeIcon icon={faUser} />
                        </a> */}

                        <User
                            onClick={() => navigate("/profile")}
                            className="text-black hover:text-[#228b22] transition-colors pr-4 w-28 h-8">
                        </User>

                    </div>
                </div>
            </nav >

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
            <div className="bg-white shadow-md rounded-lg pl-64 py-8 px-4 pt-24" >
                <div className="flex items-start mb-8">
                    <div className="">
                        <div className="h-28 w-28 bg-gray-200 flex items-center justify-center rounded-full text-[#228b22] font-bold text-6xl"
                            style={{ fontFamily: "Tenor Sans, sans-serif" }}>
                            {getInitials(user.name)}
                        </div>
                        {/* <h2 className="text-2xl font-bold p-4" style={{ fontFamily: "Tenor Sans, sans-serif" }}>{user.name}</h2> */}
                    </div>
                    <div className="ml-8" >
                        <h2 className="text-2xl font-bold pt-4" style={{ fontFamily: "Tenor Sans, sans-serif" }}>{user.username}</h2>
                        <div className="text-black-500 text-xl pt-2" style={{ fontFamily: "Assistant, sans-serif" }}>{userPosts.length} Post</div>

                        {/* Add other user details*/}
                    </div>
                </div>
                <div className="flex justify-between space-x-1 mb-4">
                    <button
                        className={`flex-1 py-2 px-4 rounded focus:outline-none flex justify-center items-center ${view === "posts"
                            ? "bg-[#228b22] text-white"
                            : "bg-gray-200 text-black"
                            }`}
                        onClick={() => setView("posts")}>
                        <Grid className="flex mr-2 items-center justify-center" />
                    </button>
                    <button
                        className={`flex-1 py-2 px-4 rounded focus:outline-none flex justify-center items-center ${view === "addpost"
                            ? "bg-[#228b22] text-white"
                            : "bg-gray-200 text-black"
                            }`}
                        onClick={() => navigate("/addpost")}>
                        <PlusCircle className="mr-2" />
                    </button>
                    <button
                        className={`flex-1 py-2 px-4 rounded focus:outline-none flex justify-center items-center ${view === "saved"
                            ? "bg-[#228b22] text-white"
                            : "bg-gray-200 text-black"
                            }`}
                        onClick={() => setView("saved")}>
                        <Bookmark className="mr-2" />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(view === "posts" ? userPosts : savedPosts)?.map((post) => (
                        <div key={post._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <img
                                src={`http://localhost:8888/${post?.image}`}
                                alt={post.title}
                                className="w-full h-56 object-cover"
                            />

                            <div className="p-4 flex flex-col h-full">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg text-black" style={{ fontFamily: 'Tenor Sans, sans-serif' }}>
                                        {post.author.username}
                                    </h3>
                                    <div className="flex space-x-4 text-black">
                                        {/* <Heart className="cursor-pointer hover:text-[#228b22]" />
                                        <MessageCircle className="cursor-pointer hover:text-[#228b22]" /> */}
                                    </div>
                                </div>


                                <h2 className="text-lg mb-2 text-black pt-2" style={{ fontFamily: 'Tenor Sans, sans-serif' }}>
                                    {post.title}
                                </h2>
                                <div className="text-black  mb-2 line-clamp-3 pt-2" style={{ fontFamily: 'Tenor Sans, sans-serif' }}>
                                    {/* {post.description.length > 100 ? `${post.description.substring(0, 100)}...` : post.description} */}
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                post.description.length > 100
                                                    ? `${post.description.substring(0, 200)}...`
                                                    : post.description,
                                        }}
                                    />
                                </div>
                                <div className="py-2 flex justify-between items-center">
                                    <button
                                        className=" flex-grow py-2 rounded-lg hover:bg-[#228b22] hover:text-[white] bg-[#beeebe] text-[#228b22] focus:outline-none bottom-0 transition-colors duration-200"
                                        onClick={() => navigate(`/viewpost/${post._id}`)}>
                                        See more
                                    </button>
                                    {view === "posts" && (
                                        <button
                                            className="px-4 py-2 rounded-lg bg-[white] text-[#228b22] hover:text-[white] hover:bg-[#228b22] focus:outline-none flex items-center"
                                            onClick={() => navigate(`/editPost/${post._id}`)}
                                        >
                                            <Edit className="mr-2" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}


                </div>
            </div >

        </div >
    );
};

export default UserProfile;