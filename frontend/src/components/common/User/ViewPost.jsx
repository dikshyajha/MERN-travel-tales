// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";

// const ViewPost = () => {
//     const { postId } = useParams();
//     const [post, setPost] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchPost = async () => {
//             try {
//                 const response = await axios.get(``);
//                 setPost(response.data);
//             } catch (err) {
//                 console.error("Error fetching post:", err);
//             }
//         };

//         fetchPost();
//     }, [postId]);

//     return (
//         <div className="bg-white min-h-screen p-4">
//             <button
//                 className="text-[#228b22] hover:text-[#176911] focus:outline-none absolute top-4 right-4"
//                 onClick={() => navigate(-1)}>
//                 <FontAwesomeIcon icon={faTimes} className="text-2xl" />
//             </button>
//             {post ? (
//                 <div className="container mx-auto">
//                     <img
//                         className="w-full h-96 object-cover mb-4"
//                         src={`http://localhost:8888/${post.image}`}
//                         alt={post.title}
//                     />
//                     <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "Tenor Sans, sans-serif" }}>{post.title}</h1>
//                     <p className="text-gray-700 mb-4" style={{ fontFamily: "Assistant, sans-serif" }}>Author: {post.author.username}</p>
//                     <p className="text-gray-700" style={{ fontFamily: "Assistant, sans-serif" }}>{post.description}</p>
//                 </div>
//             ) : (
//                 <div>Loading...</div>
//             )}
//         </div>
//     );
// };

// export default ViewPost;
