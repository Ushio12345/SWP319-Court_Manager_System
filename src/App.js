import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GuestPage from "./pages/guest/index";
import Login from "./pages/login";
import Register from "./pages/register";
import RoleSelector from "./pages/role-selection";
import CourtManager from "./page/court_manager/CourtManager";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GuestPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/role-selector" element={<RoleSelector />} />
                <Route path="/court_manager" element={<CourtManager />} />
            </Routes>
        </Router>
    );
}

export default App;
