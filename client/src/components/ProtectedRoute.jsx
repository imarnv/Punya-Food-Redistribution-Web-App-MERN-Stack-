// client/src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // Check if user data exists in local storage
    const user = JSON.parse(localStorage.getItem('user'));

    // If a user is logged in, show the requested page (the "Outlet").
    // Otherwise, redirect them to the /login page.
    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;