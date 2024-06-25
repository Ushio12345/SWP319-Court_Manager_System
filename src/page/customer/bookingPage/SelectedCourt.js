import React, { Component } from "react";
import "./booking.css";
export default class selectedCourt extends Component {
    render() {
        return (
            <div>
                <section className="detail-yard">
                    <h1 className="text-center" style={{ fontSize: 40 }}>
                        THÔNG TIN CHI TIẾT
                    </h1>
                    <h1 className>SÂN CẦU LÔNG ABC</h1>
                    <div className="detail-yard-title">
                        <div className="address">
                            <p>
                                <i className="fa-solid fa-location-dot" /> Địa chỉ:
                                <span> 123 Phường Tân Nhơn Phú, Quận 9, Thành phố Hồ Chí Minh</span>
                            </p>
                        </div>
                        <div className="rate">
                            <p>
                                Đánh giá: 4/5 <i className="fa-solid fa-star" /> (2 / Đánh giá)
                            </p>
                        </div>
                    </div>
                    <div className="detail-yard-info row">
                        <div className="yard-left col-lg-6">
                            <h3>Thông tin sân</h3>
                            <p>
                                Số sân: <span>5 sân</span>
                            </p>
                            <p>
                                Giờ hoạt động: <span>7:00 - 23:00</span>
                            </p>
                            <p>
                                Giá tiền/giờ: <span>50.000 - 75.000</span>
                            </p>
                            <div className="yard-service row">
                                <h4>Dịch vụ tiện ích</h4>
                                <div className="col-lg-6">
                                    <i className="fa-solid fa-wifi" /> Wifi
                                </div>
                                <div className="col-lg-6">
                                    <i className="fa-solid fa-square-parking" /> Bãi đỗ xe rộng rãi
                                </div>
                                <div className="col-lg-6">
                                    <i className="fa-solid fa-mug-saucer" /> Quán cà phê
                                </div>
                                <div className="col-lg-6">
                                    <i className="fa-solid fa-whiskey-glass" />
                                    Trà đá miễn phí
                                </div>
                            </div>
                        </div>
                        <div className="yard-right col-lg-6">
                            <img className="h-100" src="" alt />
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
