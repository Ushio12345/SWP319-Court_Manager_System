import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import forbad_logo from "../../assets/images/forbad_logo.png";

const Header = ({ isLoggedIn, user, handleLogout }) => {

    // handleManagePage = () => {
    //     const roles = JSON.parse(localStorage.getItem("roles"));

        

    //     // Redirect to login page
    //     window.location.href = "/";
    // };
    return (
        <div>
            <section className="header">
                <div className="header-top ">
                    <div className="logo">
                        <img src={forbad_logo} alt="Logo" />
                    </div>
                    <div className="search-name">
                        <input type="text" placeholder="Nhập tên sân cần tìm" />
                        <i className="fa-solid fa-magnifying-glass" />
                    </div>
                    <div className="header-top-right">
                        <div className="login">
                            {isLoggedIn ? (
                                <div className="user-info">
                                    <div className="user-name"><p>{user.username}</p></div>
                                    <div className="user"><img src={user.avatar} alt="User Avatar" /></div>
                                    <button className="btn btn-primary" onClick={handleLogout}>Đăng xuất</button>
                                </div>
                            ) : (
                                <div className="auth-buttons">
                                    <Link to="/login" className="btn btn-primary login-link">
                                        Đăng nhập
                                    </Link>
                                    <Link to="/register" className="btn btn-outline-primary register-link">
                                        Đăng ký
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="header-bot">
                    <Link to="/" className="active">
                        Trang Chủ
                    </Link>
                    {/* <Link onClick={handleManagePage}>Quản Lý</Link> */}
                    {isLoggedIn && (
                        <Link to="/history">Lịch sử đặt hàng</Link>
                    )} 
                    <Link to="/about">Giới Thiệu</Link>
                    <Link to="/contact">Liên hệ</Link>
                    <Link to="/rules">Quy định</Link>
                </div>
            </section>
        </div>
    );
};

export default Header;
