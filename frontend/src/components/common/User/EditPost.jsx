import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
const token = localStorage.getItem("token");

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
    ],
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
];

export default function EditPost() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState();

    const { id } = useParams();
    // const [post, setPost] = useState(null);
    const navigate = useNavigate();
    // const { params } = useParams();
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8888/blogpost/${id}`);
                setTitle(response.data?.singlePost?.title);
                setDescription(response.data?.singlePost?.description);
                // setTitle(response.data?.singlePost?.title);
                // setPost(response.data?.singlePost);
            } catch (err) {
                console.error("Error fetching post:", err);
            }
        };

        fetchPost();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("file", file);

        const configuration = {
            method: "patch",
            url: "http://localhost:8888/blogpost/" + id,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: formData,
        };

        axios(configuration)
            .then((result) => {
                console.log(result);
                window.location.href = "/dashboard";
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                <h2 className="font-semibold text-center mb-6 text-[#228b22] text-4xl" style={{ fontFamily: 'Tenor Sans, sans-serif' }}>Create a New Post</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="formBasicTitle" className="block text-sm font-medium mb-2 text-[#228b22] ">Title</label>
                        <input
                            type="text"
                            id="formBasicTitle"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            style={{ borderColor: "lightgray" }}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="formFile" className="block text-sm font-medium mb-2 text-[#228b22]">Upload Image</label>
                        <input
                            type="file"
                            id="formFile"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            style={{ borderColor: "lightgray" }}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="formBasicDescription" className="block text-sm font-medium mb-2 text-[#228b22]">Description</label>
                        <ReactQuill
                            theme="snow"
                            value={description}
                            onChange={(newValue) => setDescription(newValue)}
                            modules={modules}
                            formats={formats}
                            className="h-40"
                            style={{ borderColor: "#228b22" }}
                        />
                    </div>
                    <div className="text-center pt-12">
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75" style={{ fontFamily: 'Tenor Sans, sans-serif' }} >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
