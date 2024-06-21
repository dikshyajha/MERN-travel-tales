import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBell,
    faUser,
    faHome,
    faPlus,
    faSave,
    faCog,
    faSignOutAlt,
    faTh,
    faFolderPlus,
    faBookmark
} from "@fortawesome/free-solid-svg-icons";
import logo2 from "../../../assets/images/logo2.png";
import axios from "axios";

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
                        `http://localhost:8888/posts/saved`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`
                            }
                        }
                    );
                    setSavedPosts(savedResponse.data);
                } catch (err) {
                    console.error("Error fetching saved posts:", err);
                }
            }
        };

        fetchSavedPosts();
    }, [view]);

    const handleSignout = () => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/signin", { replace: true });
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const displayPosts = view === "posts" ? userPosts : savedPosts;


    const getInitials = (name) => {
        if (!name) return "";

        return name.split(" ").map((part) => part.charAt(0).toUpperCase()).join("");
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Navbar */}
            <nav className="bg-white p-4 shadow-md">
                <div className="container flex items-center justify-between">
                    <img src={logo2} alt="TravelTales Logo" className="h-10 w-40" />
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search"
                            className="p-2 border border-gray-300 rounded-xl"
                        />
                        <button className="bg-[#228b22] text-white rounded-xl w-24 h-10 ml-2">
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
                            // href=""
                            onClick={() => navigate("/profile")}
                            className="text-black hover:text-[#228b22] transition-colors">
                            <FontAwesomeIcon icon={faUser} />
                        </a>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <div className="fixed h-full w-48 bg-white shadow-md">
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
                        to="/addpost"
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
                        <FontAwesomeIcon icon={faBookmark} className="mr-2 text-black" />
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
            <div className="bg-white shadow-md rounded-lg pl-64 py-8 px-4">
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
                        <div className="text-balck-500 text-xl pt-2" style={{ fontFamily: "Assistant, sans-serif" }}>{userPosts.length} Posts</div>

                        {/* Add other user details*/}
                    </div>
                </div>
                <div className="flex justify-between space-x-1 mb-4">
                    <button
                        className={`py-2 px-4 w-80 rounded focus:outline-none ${view === "posts"
                            ? "bg-[#228b22] text-white"
                            : "bg-gray-200 text-black"
                            }`}
                        onClick={() => setView("posts")}>
                        <FontAwesomeIcon icon={faTh} className="mr-2" />

                    </button>
                    <button
                        className={`py-2 px-4  w-80 rounded focus:outline-none ${view === "addpost"
                            ? "bg-[#228b22] text-white"
                            : "bg-gray-200 text-black"
                            }`}
                        onClick={() => navigate("/addpost")}>
                        <FontAwesomeIcon icon={faFolderPlus} className="mr-2" />

                    </button>
                    <button
                        className={`py-2 px-4 rounded w-80 focus:outline-none ${view === "saved"
                            ? "bg-[#228b22] text-white"
                            : "bg-gray-200 text-black"
                            }`}
                        onClick={() => setView("saved")}>
                        <FontAwesomeIcon icon={faBookmark} className="mr-2" />

                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userPosts.map((post) => (
                        <div key={post._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <img
                                src={`http://localhost:8888/${post?.image}`}
                                alt={post.title}
                                className="w-full h-56 object-cover"
                            />

                            <div className="p-4">
                                <h3 className="text-lg font-bold mb-2 text-black" style={{ fontFamily: 'Tenor Sans, sans-serif' }}>
                                    {post.author.username}
                                </h3>
                                <h2 className="text-lg font-bold mb-2 text-black" style={{ fontFamily: 'Tenor Sans, sans-serif' }}>
                                    {post.title}
                                </h2>
                                <div className="text-black font-semibold mb-2" style={{ fontFamily: 'Assistant, sans-serif' }}>
                                    {post.description.length > 100 ? `${post.description.substring(0, 100)}...` : post.description}
                                </div>
                                <div className="px-4 py-2 flex justify-between items-center bg-gray-100">
                                    <button
                                        className="text-[#228b22] hover:text-[#176911] focus:outline-none"
                                        onClick={() => navigate(`/viewpost`)}>
                                        Read more
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}


                </div>
            </div>

        </div>
    );
};

export default UserProfile;