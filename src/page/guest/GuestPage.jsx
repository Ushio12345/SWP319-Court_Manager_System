import React, { Component, createRef } from "react";
import "../../css/style.css";

import Footer from "../../componets/Footer";
import CardYard from "../../componets/CardYard";
import { Link } from "react-router-dom";
export default class GuestPage extends Component {
    render() {
        return (
            <div>
                <section className="header">
                    <div className="container">
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
                                                <Link to="/login">Quận Bình Thạnh</Link>
                                            </li>
                                            <li>
                                                <Link to="/login">Quận Tân Phú</Link>
                                            </li>
                                            <li>
                                                <Link to="/login">Quận 7</Link>
                                            </li>
                                            <li>
                                                <Link to="/login">TP.Thủ Đức</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="login">
                                    {/* truyền avata và user-name nếu người dùng đã login  */}
                                    {/* nếu chưa login chuyển sang trang login  */}
                                    <a href="/login" className="user">
                                        {/* truyền avt  */}
                                        <i className="fa-regular fa-user" />
                                    </a>
                                    <a href="/register" className="register">
                                        Đăng kí
                                    </a>{" "}
                                    |
                                    <a href="/login" className="logout">
                                        Đăng nhập{" "}
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
                        <a href>Liên hệ </a>
                        <a href>Quy định</a>
                    </div>
                </section>

                {/* BANNER */}
                <section className="banner">
                    <div className="banner-intro container">
                        <h1>Chào mừng đến với ForBAB</h1>
                        <p>
                            Bạn muốn tìm sân để thể hiện đam mê và nâng cao kỹ năng? <span>ForBAB</span> giúp bạn dễ dàng tìm và đặt sân cầu lông tốt
                            nhất gần bạn. Dù bạn là người chơi giải trí hay vận động viên thi đấu, chúng tôi luôn sẵn sàng phục vụ. Trải nghiệm đặt
                            sân nhanh chóng, linh hoạt với các sân chất lượng hàng đầu. Hãy sẵn sàng nâng tầm trận đấu của bạn cùng{" "}
                            <span>ForBAB</span>!
                        </p>
                        <button className="btn-link">ĐẶT SÂN NGAY</button>
                    </div>
                    {/* chuyển qua trang */}
                </section>
                <div className="filter">
                    <div className="locGio">
                        <p>Giờ hoạt động</p>
                        <ul className="filter-time">
                            <li>
                                <a href="login.html">7:00 - 12:00</a>
                            </li>
                            <li>
                                <a href="login.html">9:00 - 23:00</a>
                            </li>
                            <li>
                                <a href="login.html">7:00 - 24:00</a>
                            </li>
                            <li>
                                <a href="login.html">10:00 - 20:00</a>
                            </li>
                        </ul>
                    </div>
                    <div className="sort">
                        {/* drop down sắp xếp các sân */}
                        <select id="sorted" name>
                            <option value>Sắp xếp theo</option>
                            <option value={1}>Từ A - Z</option>
                            <option value={2}>Từ Z - A</option>
                            <option value={3}>Giá tăng dần</option>
                            <option value={4}>Giá giảm dần</option>
                        </select>
                    </div>
                </div>
                {/* +++++++LIST yard+++++++++++++++ */}
                <section className="yard">
                    <h1 className="m-4">DANH SÁCH CÁC SÂN CẦU LÔNG</h1>
                    <div className="container w-4/5">
                        <div className="list-yard grid lg:grid-cols-4 md:grid-cols-3 gap-4 sm:lg:grid-cols-2">
                            <CardYard />
                            <CardYard />
                            <CardYard />
                            <CardYard />
                            <CardYard />
                            <CardYard />
                            <CardYard />
                            <CardYard />
                        </div>
                    </div>
                </section>
                {/* ================HOT YARD============================ */}
                <section className="yard">
                    <h1 className="m-4">DANH SÁCH CÁC SÂN CẦU LÔNG</h1>
                    <div className="container w-4/5">
                        <div className="grid grid-cols-3 gap-4 ">
                            <CardYard />
                            <CardYard />
                            <CardYard />
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}
