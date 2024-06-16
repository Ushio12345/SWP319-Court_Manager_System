import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GuestPage from "./pages/guest";
import Login from "./pages/login";
import Register from "./pages/register";
import RoleSelector from "./pages/role-selection";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GuestPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/role-selector" element={<RoleSelector />} />
            </Routes>
        </Router>
    );
}

export default App;
