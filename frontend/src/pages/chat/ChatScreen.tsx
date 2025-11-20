import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Plus, LogOut, MessageCircle, User, Send } from "react-feather";
import { io } from "socket.io-client";
import logo2 from "../../assets/images/logo2.png";
import axios from "axios";

// Connect to backend
const socket = io("http://localhost:8888");

// Define message type
interface MessageType {
    username: string;
    text: string;
    time: string;
    from: string; // sender ID
    to: string;   // receiver ID
}

// Define user type
interface UserType {
    _id: string;
    username: string;
}

export const Chat = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [users, setUsers] = useState<UserType[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const navigate = useNavigate();

    const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const loggedUserId: string = loggedUser?._id || "";

    const handleSignout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
        navigate("/signin", { replace: true });
    };

    // Fetch all users except the logged-in user
    const getUsers = async () => {
        try {
            const res = await axios.get("http://localhost:8888/user");

            console.log("FULL USER API RESPONSE:", res.data);

            const userArray = res.data?.data || []; // backend returns users in data

            const otherUsers = userArray
                .filter((u: UserType) =>
                    u._id !== loggedUserId && u.username !== "admin1"
                );

            setUsers(otherUsers);

            if (otherUsers.length > 0 && !selectedUser) {
                setSelectedUser(otherUsers[0]);
            }

        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };


    useEffect(() => {
        getUsers();
    }, []);

    // Listen to incoming messages
    useEffect(() => {
        socket.on("chatMessage", (data: MessageType) => {
            // Only show messages for the selected user
            if (
                (data.from === loggedUserId && data.to === selectedUser?._id) ||
                (data.from === selectedUser?._id && data.to === loggedUserId)
            ) {
                setMessages((prev) => [...prev, data]);
            }
        });
        return () => socket.off("chatMessage");
    }, [selectedUser]);

    const sendMessage = () => {
        if (!message || !selectedUser) return;

        const msgData: MessageType = {
            username: loggedUser.username,
            text: message,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            from: loggedUserId,
            to: selectedUser._id,
        };

        socket.emit("chatMessage", msgData);
        setMessages((prev) => [...prev, msgData]);
        setMessage("");
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Navbar */}
            <nav className="bg-white p-4 shadow-md w-full z-10 fixed top-0">
                <div className="container flex items-center justify-between">
                    <img src={logo2} alt="TravelTales Logo" className="h-10 w-40" />
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
            <main className="ml-48 p-6 pt-24 bg-white min-h-screen border-t-4 border-[#f8fbf8]">
                <div className="container mx-auto flex h-full gap-4">
                    {/* Left: User list */}
                    <div className="w-1/4 border-r border-gray-300 h-[80vh] overflow-y-auto rounded-xl p-2">
                        <h2 className="text-xl font-semibold mb-2">Users</h2>
                        {users.length === 0 && <div className="text-gray-500">No users available</div>}
                        {users.map((user) => (
                            <button
                                key={user._id}
                                onClick={() => {
                                    setSelectedUser(user);
                                    setMessages([]); // clear previous chat
                                }}
                                className={`w-full text-left px-4 py-2 rounded-lg mb-2 ${selectedUser?._id === user._id
                                    ? "bg-[#228b22] text-white"
                                    : "bg-gray-200"
                                    }`}
                            >
                                {user.username}
                            </button>
                        ))}
                    </div>

                    {/* Right: Chat box */}
                    <div className="w-3/4 flex flex-col h-[80vh]">
                        <div className="bg-gray-100 rounded-t-xl p-4 flex justify-between items-center">
                            <h2 className="text-xl font-semibold">
                                {selectedUser ? selectedUser.username : "Select a user to chat"}
                            </h2>
                        </div>

                        <div className="flex-1 bg-gray-50 p-4 overflow-y-auto flex flex-col-reverse">
                            {messages.length === 0 && (
                                <div className="text-gray-500 self-center mt-4">No messages yet</div>
                            )}
                            {messages
                                .slice()
                                .reverse()
                                .map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`mb-2 p-2 rounded-lg ${msg.from === loggedUserId ? "bg-[#beeebe] self-end" : "bg-white self-start"
                                            }`}
                                    >
                                        <p className="font-semibold text-[#228b22]">{msg.username}</p>
                                        <p>{msg.text}</p>
                                        <span className="text-sm text-gray-500">{msg.time}</span>
                                    </div>
                                ))}
                        </div>

                        {/* Input */}
                        {selectedUser && (
                            <div className="flex mt-2">
                                <input
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="flex-grow border rounded-xl p-2"
                                    placeholder={`Message ${selectedUser.username}...`}
                                />
                                <button
                                    onClick={sendMessage}
                                    className="ml-2 bg-[#228b22] text-white px-4 rounded-xl"
                                >
                                    Send
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};
