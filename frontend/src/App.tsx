import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Updated import
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // Ensure this matches the actual filename case
import Dashboard from "./pages/Dashboard";
import Payment from "./pages/Payment";
import AuthGuard from "./AuthGuard";
import "./App.css"; // Optional: You can add your global styles here

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {" "}
          {/* Updated to Routes */}
          <Route path="/" element={<Home />} /> {/* Updated to use element */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
          />
          <Route
            path="/payment"
            element={
              <AuthGuard>
                <Payment />
              </AuthGuard>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
