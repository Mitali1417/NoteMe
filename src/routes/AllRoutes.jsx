import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import EditPage from "../pages/EditPage";
import CreatePage from "../pages/CreatePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/edit/:id" element={<EditPage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default AllRoutes;
