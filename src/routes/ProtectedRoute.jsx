import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  console.log('Is Authenticated:', isAuthenticated);  // Debug authentication status
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
