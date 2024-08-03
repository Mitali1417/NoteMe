import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditPage from "./pages/EditPage";
import CreatePage from "./pages/CreatePage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/edit/:id" element={<EditPage />} />
      <Route path="/create" element={<CreatePage />} />
    </Routes>
  );
};

export default AllRoutes;
