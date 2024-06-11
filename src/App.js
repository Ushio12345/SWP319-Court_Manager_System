import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./utils/Account/Register";
import Login from "./utils/Login";
import GuestPage from "./page/guest/GuestPage";
import RoleSelection from "./utils/Account/RoleSelection";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<GuestPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Register />} />
                {/* <Route path="/role-selection" element={<RoleSelection />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
