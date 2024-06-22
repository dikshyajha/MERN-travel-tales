import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ViewPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8888/blogpost/${id}`);
                setPost(response.data?.singlePost);
            } catch (err) {
                console.error("Error fetching post:", err);
            }
        };

        fetchPost();
    }, [id]);

    return (
        <div className="bg-white min-h-screen flex items-center justify-center">
            <button
                className="text-[black] hover:text-[#176911] focus:outline-none absolute top-2 right-2 text-3xl font-bold"
                onClick={() => navigate(-1)}
            >
                <FontAwesomeIcon icon={faTimes} className="text-2xl" />
            </button>
            {post ? (
                <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-screen-md">
                    <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: "Tenor Sans, sans-serif" }}>
                        {post.title}
                    </h1>
                    <div className="rounded-lg overflow-hidden mb-4">
                        <img
                            className="w-full h-auto object-cover"
                            src={`http://localhost:8888/${post.image}`}
                            alt={post.title}
                        />
                    </div>
                    <h2 className="text-gray-700 mb-4 font-semibold text-xl" style={{ fontFamily: "Assistant, sans-serif" }}>
                        Author: {post.author.username}
                    </h2>
                    <div
                        className="text-lg"
                        style={{ fontFamily: "Assistant, sans-serif" }}
                        dangerouslySetInnerHTML={{ __html: post.description }}
                    />
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default ViewPost;
