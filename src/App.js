import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GuestPage from "./page/guest/GuestPage";
import Login from "./utils/Login";
import Register from "./utils/Account/Register";
import Login from "./utils/Login";
import GuestPage from "./page/guest/GuestPage";
import RoleSelection from "./utils/Account/RoleSelection";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GuestPage />} />

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/court_manager" element={<CourtManager />} />
            </Routes>
        </Router>
    );
}

export default App;
