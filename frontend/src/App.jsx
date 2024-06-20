import React, { useEffect, useState } from "react";
import "./App.css";
import '@mantine/carousel/styles.css';
import { Navigate, Route, Routes } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getTokenFromLocalStorage } from "./utils/localstorage.helper";
import { setToken } from "./store/modules/auth/action";
import { AuthLayout } from "./layouts/AuthLayout";
import SignIn from "./pages/auth/SignIn";
import { Hero } from "./pages/landing/Hero";
import { Dashboard } from "./pages/dashboard/Dashboard";
import SignUp from "./pages/auth/SignUp";
import { AdminDashboard } from "./pages/dashboard/AdminDashboard";
import UserProfile from "./components/common/User/UserProfile";
import AddPost from "./components/common/User/AddPost";

function App() {
  const token = useSelector((state) => state.tokenReducer.token);
  // console.log("Token is ", token);
  const dispatch = useDispatch();
  useEffect(() => {
    const isLoggedIn = getTokenFromLocalStorage();
    if (isLoggedIn) {
      dispatch(setToken(isLoggedIn))
    }
  }, [dispatch]);

  const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.role === 'admin';
  };
  return (
    <>
      <Routes>
        <Route path="/" element={token ? <Navigate to={isAdmin() ? "/admin" : "/dashboard"} /> : <Hero />} />
        <Route path="/signin" element={token ? <Navigate to={isAdmin() ? "/admin" : "/dashboard"} /> : <SignIn />} />
        <Route path="/signup" element={token ? <Navigate to="/dashboard" /> : <SignUp />} />
        <Route path="/dashboard/*" element={token ? <Dashboard /> : <Navigate to="/signin" />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/addPost" element={<AddPost />} />

        <Route path="/admin" element={token && isAdmin() ? <AdminDashboard /> : <Navigate to="/signin" />} />
        <Route path="/auth/*" element={token ? <Navigate to={isAdmin() ? "/admin" : "/dashboard"} /> : <AuthLayout />} />
        <Route path="/*" element={<div>404 Not found</div>} />
      </Routes>

    </>
  );
}

export default App;
