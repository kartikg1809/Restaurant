import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element: Component, allowedRoles }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser || !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return Component;
};

export default ProtectedRoute;
