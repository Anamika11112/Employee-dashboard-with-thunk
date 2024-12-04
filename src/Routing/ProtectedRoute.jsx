import React from 'react';
import { Navigate } from 'react-router-dom';
function ProtectedRoute({ children }) {
  if (localStorage.getItem("isLoggedIn")) {
    return children;
  }
  return <Navigate to="/login" replace />;
}
export default ProtectedRoute;
