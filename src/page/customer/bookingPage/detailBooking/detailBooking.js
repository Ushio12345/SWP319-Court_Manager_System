import React from "react";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import "./index.css";
const DetailBooking = () => {
    return (
        <div>
            <Header />
            <div className="fromOrder container">
                <div className="detailOrder row">
                    <div className="col-lg-7 info-order ">
                        <h4>Chi tiết đơn hàng</h4>
                        <div className="mb-1 row ">
                            <label htmlFor="nameYard" className="col-lg-5 col-form-label">
                                Ngày tạo đơn:
                            </label>
                            <div className="col-lg-7 d-flex " style={{ alignItems: "center" }}>
                                <div className="create-day me-4">30/06/2024</div> <div className="create-time">12:02</div>
                            </div>
                        </div>
                        <div className="mb-1">
                            <div className="id-order d-flex">
                                <label htmlFor="" className="col-lg-5 col-form-label">
                                    Mã đơn hàng
                                </label>
                                <p className="col-lg-7 ms-2" style={{ display: "flex", alignItems: "center" }}>
                                    ABC123
                                </p>
                            </div>
                        </div>
                        <div className="mb-1 row ">
                            <label htmlFor="nameYard" className="col-lg-5 col-form-label">
                                Họ và tên:
                            </label>
                            <div className="col-lg-7 " style={{ display: "flex", alignItems: "center" }}>
                                <p className="">Nguyễn Xuân Hợp</p>
                            </div>
                        </div>

                        <div className="mb-1 row ">
                            <label htmlFor="nameYard" className="col-lg-5 col-form-label">
                                Email:
                            </label>
                            <div className="col-lg-7 " style={{ display: "flex", alignItems: "center" }}>
                                <p className="">abc123@gmail.com</p>
                            </div>
                        </div>

                        <div className="mb-1 row ">
                            <label htmlFor="" className="col-lg-5 col-form-label">
                                Dạng lịch:
                            </label>
                            <div className="col-lg-7 " style={{ display: "flex", alignItems: "center" }}>
                                <p>Lịch đơn</p>
                            </div>
                        </div>

                        <div className="mb-1 infoOfBooking mt-3 py-2">
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th>Slot</th>
                                        <th>Sân</th>
                                        <th>Ngày check-in</th>
                                        <th>Giá tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Example row, replace with dynamic data */}
                                    <tr>
                                        <td>10:00 - 11:00</td>
                                        <td>Sân A</td>
                                        <td>01/07/2024</td>
                                        <td>200,000 VND</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-lg-4 info-customer">
                        <h4>Thanh toán</h4>
                        <div className="mb-1 row ">
                            <label htmlFor="" className="col-lg-6 col-form-label" style={{ fontSize: "18px" }}>
                                <i class="fa-solid fa-money-bill"></i> Tổng tiền:
                            </label>
                            <div className="col-lg-6 " style={{ display: "flex", alignItems: "center" }}>
                                <strong style={{ fontSize: "22px", color: "orangered", display: "flex", alignItems: "center" }}>75.000VNĐ</strong>
                            </div>
                        </div>
                        <div className="mb-1 row ">
                            <label htmlFor="" className="col-lg-6 col-form-label" style={{ fontSize: "17px" }}>
                                Thanh toán bằng
                            </label>
                            <div className="col-lg-6 pay mb-5" style={{ display: "flex", alignItems: "center" }}>
                                <input type="radio"></input>
                                <label className="d-flex ms-3" style={{ display: "flex", alignItems: "center" }}>
                                    <i class="fa-brands fa-paypal"></i>
                                    <p>paypal</p>
                                </label>
                            </div>
                            <button className="btn btn-primary m-0 p-2" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="button-function d-flex w-50 m-auto pb-4">
                <button className="btn btn-success py-2 w-50 m-auto">Trở về trang đặt sân</button>
            </div>
            <Footer />
        </div>
    );
};

export default DetailBooking;
