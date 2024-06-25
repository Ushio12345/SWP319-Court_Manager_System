// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GuestPage from "./pages/guest/index";
import Login from "./pages/login";
import Register from "./pages/register";
import RoleSelector from "./pages/role-selection";
import ForgotPassword from "./pages/forgot-password";
import TokenResetPassword from "./pages/token-reset-password";
import InputNewPassword from "./pages/input-new-password";
import ProtectedRoute from "./components/ProtectedRoute";
import CourtManager from "./page/court_manager/CourtManager";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GuestPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify-token" element={<TokenResetPassword />} />
                <Route path="/reset-password" element={<InputNewPassword />} />

                <Route path="/role-selector" element={
                    <ProtectedRoute>
                        <RoleSelector />
                    </ProtectedRoute>
                } />
                <Route path="/court_manager" element={
                    <ProtectedRoute>
                        <CourtManager />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
