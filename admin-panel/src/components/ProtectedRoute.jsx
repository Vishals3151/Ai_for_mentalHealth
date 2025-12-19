import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check for the auth token in local storage
  const token = localStorage.getItem('adminToken');

  // If token exists, allow access to the nested routes (Outlet)
  // Otherwise, redirect to the /login page
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;