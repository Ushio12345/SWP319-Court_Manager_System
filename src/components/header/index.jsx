import React from "react";
import { Link } from "react-router-dom";
import '../header/index.css';
import '../../App.css';
import forbad_logo from '../../assets/images/forbad_logo.png'; 

const Header = ({ isLoggedIn, user, handleLogout }) => {
    return (
        <div>
            <section className="header">
                <div className="header-top">
                    <div className="logo">
                        <img src={forbad_logo} alt="Logo" />
                    </div>
                    <div className="search-name">
                        <input type="text" placeholder="Nhập tên sân cần tìm" />
                        <i className="fa-solid fa-magnifying-glass" />
                    </div>
                    <div className="header-top-right">
                        <div className="list-location">
                            <p>
                                <i className="fa-solid fa-location-dot" /> Tìm theo vị trí
                            </p>
                            <div className="location-item">
                                <ul id="location">
                                    <li>
                                        <a href="#">Quận Bình Thạnh</a>
                                    </li>
                                    <li>
                                        <a href="#">Quận Tân Phú</a>
                                    </li>
                                    <li>
                                        <a href="#">Quận 7</a>
                                    </li>
                                    <li>
                                        <a href="#">TP.Thủ Đức</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="login">
                            {isLoggedIn ? (
                                <div className="user-info">
                                    <div className="user-name"><p>Xin chào, {user.username}</p></div>
                                    <Link to="/updateProfile" className="user">
                                        <img src={user.avatar} alt="User Avatar" />
                                    </Link>  
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
                    <Link to="/about">Giới Thiệu</Link>
                    {isLoggedIn ? (<Link to="/historyOrder">Lịch sử đặt sân</Link>) : ""}
                    <Link to="/contact">Liên hệ</Link>
                    <Link to="/rules">Quy định</Link>
                </div>
            </section>
        </div>
    );
};

export default Header;
