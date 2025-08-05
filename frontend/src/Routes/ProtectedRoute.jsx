// src/Routes/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppContext } from '@/Contexts/AppContext';
import Loader from '@/Components/Global/Loader/Loader';
import { toast } from 'react-toastify';
import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';

const ProtectedRoute = ({ children, area }) => {
  const { user, loading, canAccessAdminArea } = useContext(AppContext);
  const location = useLocation();

  
  if (loading) {
    return <LoaderPages/>;
  }

  const isAuthenticated = !!user;

  if (!isAuthenticated) {
    const loginPath = (area === 'admin') ? '/admin/login' : '/login';
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  if (area === 'admin') {
    if (!canAccessAdminArea()) {
      toast.error("Você não tem permissão para acessar a área administrativa.");
      return <Navigate to="/" replace />;
    }
    // if (area === 'admin' && !hasGlobalPermission('view-admin-dashboard')) { ... }
  }

  return children;
};

export default ProtectedRoute;