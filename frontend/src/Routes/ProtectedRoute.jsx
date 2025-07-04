// src/Routes/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppContext } from '@/Contexts/AppContext';
import Loader from '@/Components/Global/Loader/Loader';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading, roles } = useContext(AppContext);
  const location = useLocation();

  if (loading) {
    return <Loader/>;
  }

  const isAuthenticated = !!user;

  if (!isAuthenticated) {
    const loginPath = role === 'admin' ? '/admin/login' : '/login';
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  const userHasRole = (roles).some(r => r === role);

  if (!userHasRole) {
    const fallbackPath = (roles).some(r => r === 'admin') ? '/admin' : '/';
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
};

export default ProtectedRoute;