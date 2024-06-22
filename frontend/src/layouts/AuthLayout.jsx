import React from "react";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/landing/Home";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { AdminDashboard } from "../pages/dashboard/AdminDashboard";
import UserProfile from "../components/common/User/UserProfile";
import AddPost from "../components/common/User/AddPost";
// import ViewPost from "../components/common/User/ViewPost";

export const AuthLayout = () => {
    return (
        <>
            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/addPost" element={<AddPost />} />
                {/* <Route path="/editPost" element={<ViewPost />} />
                <Route path="/viewPost" element={<ViewPost />} /> */}
                <Route path="/*" element={<div>404 Not found</div>} />
            </Routes>
        </>
    );
};