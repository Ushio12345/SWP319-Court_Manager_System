import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import "../../App.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import forbad_logo from "../../assets/images/forbad_logo.png";
import { NavLink } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";

const Header = ({ isLoggedIn, user, handleLogout }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const hideDropdown = () => {
        setDropdownVisible(false);
    };

    const handleShowTermsModal = () => {
        setShowTermsModal(true);
    };

    const handleCloseTermsModal = () => {
        setShowTermsModal(false);
    };

    const handleAcceptTerms = async () => {
        try {
            const response = await axiosInstance.put('/member/update-role', { userId: user.userId, role: 'manager' });
            if (response.status === 200) {
                const data = response.data;

                localStorage.setItem("user", JSON.stringify(data));

                handleCloseTermsModal();
                window.location.href = "/court-manager"
            } else {
                // Handle non-200 responses if necessary
                console.error('Failed to update role:', response.status);
            }
        } catch (error) {
            console.error('Failed to update role:', error);
        }
    };

    return (
        <div>
            <section className="header">
                <div className="header-top container row">
                    <div className="logo col-md-2">
                        <Link to="/">
                            <img src={forbad_logo} alt="Logo" />
                        </Link>
                    </div>
                    <div className="header-bot col-lg-6 col-md-7">
                        <NavLink exact to="/" activeClassName="active">
                            Trang Chủ
                        </NavLink>
                        <NavLink to="/aboutUs" activeClassName="active">
                            Giới Thiệu
                        </NavLink>
                        <NavLink to="/contact" activeClassName="active">
                            Liên hệ
                        </NavLink>
                        <NavLink to="/rules" activeClassName="active">
                            Quy định
                        </NavLink>
                    </div>
                    <div className="header-top-right col-lg-4 col-md-3">
                        <div className="login w-100">
                            {isLoggedIn ? (
                                <div className="user-info" onClick={toggleDropdown}>
                                    <div className="user d-flex">
                                        <div className="user-name">
                                            <p>{user.username}</p>
                                        </div>
                                        <img src={user.avatar} alt="User Avatar" />
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
                                                    {isLoggedIn && user.roles.includes('manager') ? (
                                                        <Link to="/court-manager" onClick={hideDropdown}>
                                                            <i className="fa-solid fa-shop"></i> Cơ sở của tôi
                                                        </Link>
                                                    ) :
                                                        (<Link onClick={() => { hideDropdown(); handleShowTermsModal(); }}>
                                                            <i className="fa-solid fa-shop"></i> Đăng ký kinh doanh
                                                        </Link>)
                                                    }
                                                </li>
                                                <li>
                                                    {isLoggedIn && (
                                                        <Link to="/historyOrder" onClick={hideDropdown}>
                                                            <i className="fa-solid fa-clock-rotate-left"></i> Lịch sử đặt hàng
                                                        </Link>
                                                    )}
                                                </li>
                                                <li>
                                                    {isLoggedIn && (
                                                        <Link onClick={handleLogout}>
                                                            <i className="fa-solid fa-sign-out"></i> Đăng xuất
                                                        </Link>
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="auth-buttons w-100">
                                    <Link to="/login" className="btn btn-primary login-link" style={{ marginRight: "5px" }}>
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
            </section>

            <Modal show={showTermsModal} onHide={handleCloseTermsModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Điều khoản và Điều kiện</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Đây là nội dung điều khoản và điều kiện của bạn...</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseTermsModal}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleAcceptTerms}>
                        Chấp nhận và tiếp tục
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Header;
