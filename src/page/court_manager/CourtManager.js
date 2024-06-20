import React, { Component } from "react";
import "../../css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Court from "./Court";
import Staff from "./Staff";

import Yard from "./Yard";
import Services from "./Services";
import Order from "./Order";

export default class CourtManager extends Component {
    render() {
        return (
            <div>
                <section className="manager">
                    <div className="topbar">
                        <div className="logo">
                            <div className="logo-img">
                                <img src="asserts/img/logo-cau-long-dep-01.png" alt />
                            </div>
                            <div className="nameapp">
                                <p>ForBaD</p>
                            </div>
                        </div>
                        <div className="select-branch">
                            <select id="branch-select">
                                <option value>Thủ Đức</option>
                                <option value={1}>Gò Vấp</option>
                                <option value={2}>Bình Thạnh</option>
                                <option value={3}>Tân Bình</option>
                            </select>
                        </div>
                        <div className="search">
                            <input type="text" placeholder="Tìm kiếm tại đây." id="search" />
                            <label htmlFor="search">
                                <i className="fa-solid fa-magnifying-glass" />
                            </label>
                        </div>
                        <div className="notification">
                            <div className="bell-icon">
                                <i className="fa-solid fa-bell" />
                                <div className="number-notification">
                                    <p>0</p>
                                </div>
                            </div>
                        </div>
                        <div className="login">
                            <a href="updateProfile.html" className="user">
                                <img src="asserts/img/download (user).jpg" alt />
                            </a>
                            <p className="user-name">Welcome,Ushio</p>
                        </div>
                    </div>
                    <div className="body-manager">
                        <div className="manager-left">
                            <div className="list-option">
                                <ul className="listManaher nav">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#dsDashboard" data-bs-toggle="tab">
                                            <span className="icon">
                                                <i className="fa-solid fa-chart-line" />
                                            </span>
                                            <span className="title">Thống kê</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#dsOrder" data-bs-toggle="tab">
                                            <span className="icon">
                                                <i class="fa-solid fa-file-invoice"></i>
                                            </span>
                                            <span className="title">Quản lý đơn đặt hàng</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#dsStaff" data-bs-toggle="tab">
                                            <span className="icon">
                                                <i className="fa-solid fa-computer" />
                                            </span>
                                            <span className="title">Quản lý Nhân viên</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#dsCoSo" data-bs-toggle="tab">
                                            <span className="icon">
                                                <i className="fa-solid fa-shop" />
                                            </span>
                                            <span className="title">Quản lý Cơ Sở</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#dsYard" data-bs-toggle="tab">
                                            <span className="icon">
                                                <i class="fa fa-table-tennis"></i>
                                            </span>
                                            <span className="title">Quản lý Sân</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#dsServices" data-bs-toggle="tab">
                                            <span className="icon">
                                                <i class="fa-solid fa-mug-saucer"></i>
                                            </span>
                                            <span className="title">Quản lý tiện ích sân</span>
                                        </a>
                                    </li>
                                    <a className="w-75 logout m-auto " href="/login">
                                        <span className="icon">
                                            <i className="fas fa-sign-out-alt" />
                                        </span>
                                        <span className="title">Đăng xuất</span>
                                    </a>
                                </ul>
                            </div>
                        </div>
                        <div className="manager-right">
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="dsDashboard" role="tabpanel">
                                    <div className="dash-num grid grid-cols-4 gap-4">
                                        <div className="dash-num-item">
                                            <div className="dash-num-item-left">
                                                <h3>100</h3>
                                                <p>Lượt truy cập mỗi ngày</p>
                                            </div>
                                            <div className="dash-num-item-icon">
                                                <i className="fa-regular fa-eye" />
                                            </div>
                                        </div>
                                        <div className="dash-num-item">
                                            <div className="dash-num-item-left">
                                                <h3>20</h3>
                                                <p>Chi nhánh</p>
                                            </div>
                                            <div className="dash-num-item-icon">
                                                <i className="fa-solid fa-house" />
                                            </div>
                                        </div>
                                        <div className="dash-num-item">
                                            <div className="dash-num-item-left">
                                                <h3>30</h3>
                                                <p>Đơn / ngày</p>
                                            </div>
                                            <div className="dash-num-item-icon">
                                                <i className="fa-solid fa-file-invoice" />
                                            </div>
                                        </div>
                                        <div className="dash-num-item">
                                            <div className="dash-num-item-left">
                                                <h3>10 tr</h3>
                                                <p>Doanh thu / ngày</p>
                                            </div>
                                            <div className="dash-num-item-icon" style={{ color: "black" }}>
                                                <i className="fa-solid fa-money-bill" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="char">
                                        <canvas id="chardoanhthuthang" width="vw-100" height />
                                    </div>
                                </div>

                                {/* ----------------------Coso------------------------------------- */}

                                <div className="tab-pane fade " id="dsCoSo" role="tabpanel">
                                    <Court />
                                </div>
                                <div className="tab-pane fade " id="dsOrder" role="tabpanel">
                                    <Order />
                                </div>

                                {/* ---------------------------------------kết thúc COw so------------------------------------------------- */}

                                {/* ----------------------Staff---------------------------------------------------------------------- */}

                                <div className="tab-pane fade" id="dsStaff" role="tabpanel">
                                    <Staff />
                                </div>

                                {/* ---------------------------------------kết thúc staff------------------------------------------------- */}
                                <div className="tab-pane fade" id="dsYard" role="tabpanel">
                                    <Yard />
                                </div>
                                <div className="tab-pane fade" id="dsServices" role="tabpanel">
                                    <Services />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="footer-Manager ">
                    <p>© Badminton Court Management - Team 4 - SWP391</p>
                </div>
            </div>
        );
    }
}
