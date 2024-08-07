import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from "../pages/HomePage";
import EditPage from "../pages/EditPage";
import CreatePage from "../pages/CreatePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ProtectedRoute from "../routes/ProtectedRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/edit/:id" element={<ProtectedRoute><EditPage /></ProtectedRoute>} />
      <Route path="/create" element={<ProtectedRoute><CreatePage /></ProtectedRoute>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default AllRoutes;
