// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GuestPage from "./pages/guest/index";
import Login from "./pages/login";
import Register from "./pages/register";
import RoleSelector from "./pages/role-selection";
import CourtManager from "./page/court_manager/CourtManager";
import ForgotPassword from "./pages/forgot-password";
import TokenResetPassword from "./pages/token-reset-password";
import InputNewPassword from "./pages/input-new-password";
import Booking from "../src/page/customer/bookingPage/Booking";
import DetailBooking from "./page/customer/bookingPage/detailBooking/detailBooking";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GuestPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/role-selector" element={<RoleSelector />} />
                <Route path="/court_manager" element={<CourtManager />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify-token" element={<TokenResetPassword />} />
                <Route path="/reset-password" element={<InputNewPassword />} />
                <Route path="/bookingPage" element={<Booking />} />
                <Route path="/detailBooking" element={<DetailBooking />} />
            </Routes>
        </Router>
    );
}

export default App;
