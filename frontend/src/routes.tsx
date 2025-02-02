import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Payment from './pages/Payment';
import ProtectedRoute from './ProtectedRoute';

const RoutesComponent: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    
    {/* Protected routes */}
    <ProtectedRoute path="/dashboard" element={<Dashboard />} />
    <ProtectedRoute path="/payment" element={<Payment />} />
  </Routes>
);

export default RoutesComponent;
