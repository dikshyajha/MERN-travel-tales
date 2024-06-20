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

    const handleSignout = () => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/signin", { replace: true });
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    // const displayPosts = view === "posts" ? userPosts : savedPosts;

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
                        <a
                            href="#notifications"
                            className="text-black hover:text-[#228b22] transition-colors">
                            <FontAwesomeIcon icon={faBell} />
                        </a>
                        <a
                            href=""
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
            <div className="bg-white shadow-md rounded-lg pl-64 py-8 px-4">
                <div className="flex items-center mb-8">
                    {/* Add user profile picture here if vyayo vane */}
                    <div>
                        <h2 className="text-2xl font-bold">{user.name}</h2>
                        {/* Add other user details*/}
                    </div>
                </div>

                <div className="flex justify-center space-x-4 mb-4">
                    <button
                        className={`py-2 px-4 rounded focus:outline-none ${view === "posts"
                            ? "bg-[#228b22] text-white"
                            : "bg-gray-200 text-black"
                            }`}
                        onClick={() => setView("posts")}>
                        Posts
                    </button>
                    <button
                        className={`py-2 px-4 rounded focus:outline-none ${view === "saved"
                            ? "bg-[#228b22] text-white"
                            : "bg-gray-200 text-black"
                            }`}
                        onClick={() => setView("saved")}>
                        Saved
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userPosts.map((post) => (
                        <div key={post._id} className="relative rounded-lg overflow-hidden">
                            <img
                                src={`http://localhost:8888/${post?.image}`}
                                // src={"http://localhost:8888/" + userPosts.image}
                                alt={post.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                                <h3 className="text-lg font-semibold">{post.title}</h3>
                                <p className="text-sm">{post.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;