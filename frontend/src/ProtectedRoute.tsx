import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';  // Import the custom auth context hook

interface ProtectedRouteProps {
  element: React.ReactNode;  // React element that will be rendered
  path: string;  // Add the path as a prop
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, path }) => {
  const { user } = useAuth(); // Accessing user from the auth context

  return (
    <Route
      path={path}
      element={user ? element : <Navigate to="/login" replace />}  // If user is not authenticated, redirect to login
    />
  );
};

export default ProtectedRoute;
