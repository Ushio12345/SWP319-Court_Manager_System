import React, { Component } from "react";
import "../css/style.css";
export default class Header extends Component {
    render() {
        return (
            <div>
                <section className="header">
                    <div className>
                        <div className="header-top">
                            <div className="logo">
                                <img src="asserts/img/logo-cau-long-dep-01.png" alt />
                            </div>
                            <div className="search-name">
                                <input type="text" placeholder="Nhập tên sân cần tìm" id />
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
                                                <a href>Quận Bình Thạnh</a>
                                            </li>
                                            <li>
                                                <a href>Quận Tân Phú</a>
                                            </li>
                                            <li>
                                                <a href>Quận 7</a>
                                            </li>
                                            <li>
                                                <a href>TP.Thủ Đức</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="login">
                                    {/* truyền avata và user-name nếu người dùng đã login  */}
                                    {/* nếu chưa login chuyển sang trang login  */}
                                    <a href="updateProfile.html" className="user">
                                        {/* truyền avt  */}
                                        <img src="asserts/img/download (user).jpg" alt />
                                    </a>
                                    <p className="user-name">Ushio</p>
                                    <a href="/login" className="logout">
                                        Đăng xuất
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="header-bot">
                        <a href="HomePage.html" className="active">
                            Trang Chủ
                        </a>
                        <a href>Giới Thiệu</a>
                        <a href="historyOrder.html">Lịch sử đặt sân</a>
                        <a href>Giới Thiệu</a>
                        <a href>Liên hệ </a>
                        <a href>Quy định</a>
                    </div>
                </section>
            </div>
        );
    }
}
