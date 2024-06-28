import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import forbad_logo from "../../assets/images/forbad_logo.png";

const Header = ({ isLoggedIn, user, handleLogout }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const hideDropdown = () => {
        setDropdownVisible(false);
    };

    return (
        <div>
            <section className="header">
                <div className="header-top container row">
                    <div className="logo col-lg-3">
                        <img src={forbad_logo} alt="Logo" />
                    </div>
                    <div className="search-name col-lg-5">
                        <input type="text" placeholder="Nhập tên sân cần tìm" />
                        <i className="fa-solid fa-magnifying-glass" />
                    </div>

                    <div className="header-top-right col-lg-4">
                        <div className="login w-100">
                            {isLoggedIn ? (
                                <div className="user-info" onClick={toggleDropdown}>
                                    <div className="user d-flex">
                                        <img src={user.avatar} alt="User Avatar" />
                                        <div className="user-name">
                                            <p>{user.username}</p>
                                        </div>
                                    </div>

                                    {dropdownVisible && (
                                        <div className="user-infor-dropdown">
                                            <ul className="p-0 m-0">
                                                <li>
                                                    <Link to="/profile" onClick={hideDropdown}>
                                                        <i className="fa-solid fa-user"></i> Hồ sơ
                                                    </Link>
                                                </li>
                                                <li>
                                                    {isLoggedIn && (
                                                        <Link to="/historyOrder" onClick={hideDropdown}>
                                                            <i className="fa-solid fa-clock-rotate-left"></i> Lịch sử đặt hàng
                                                        </Link>
                                                    )}
                                                </li>
                                                <li>
                                                    <button
                                                        className="btn-logout d-flex p-2"
                                                        style={{ alignItems: "center", justifyContent: "center" }}
                                                        onClick={() => {
                                                            hideDropdown();
                                                            handleLogout();
                                                        }}
                                                    >
                                                        Đăng xuất
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="auth-buttons w-100">
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
                    <Link to="/aboutUs">Giới Thiệu</Link>
                    <Link to="/contact">Liên hệ</Link>
                    <Link to="/rules">Quy định</Link>
                </div>
            </section>
        </div>
    );
};

export default Header;
