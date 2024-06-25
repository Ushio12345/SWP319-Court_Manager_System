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
                            <div className="col-lg-7 ">
                                <input type="text" readOnly className="form-control-plaintext" id="nameYard" defaultValue="24/06/2024 " />
                            </div>
                        </div>
                        <div className="mb-1 row ">
                            <label htmlFor="nameYard" className="col-lg-5 col-form-label">
                                Thời gian tạo đơn:
                            </label>
                            <div className="col-lg-7 ">
                                <input type="text" readOnly className="form-control-plaintext" id="nameYard" defaultValue="21:07" />
                            </div>
                        </div>
                        <div className="mb-1 row ">
                            <label htmlFor="nameYard" className="col-lg-5 col-form-label">
                                Tên cơ sở:
                            </label>
                            <div className="col-lg-7 ">
                                <input type="text" readOnly className="form-control-plaintext" id="nameYard" defaultValue="Sân cầu lông Phú Hữu" />
                            </div>
                        </div>
                        <div className="mb-1 row ">
                            <label htmlFor="nameYard" className="col-lg-5 col-form-label">
                                Địa chỉ:
                            </label>
                            <div className="col-lg-7 ">
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control-plaintext"
                                    id="nameYard"
                                    defaultValue="01, đường Phú Hữu, TP. Thủ Đức"
                                />
                            </div>
                        </div>
                        <div className="mb-1 row ">
                            <label htmlFor="" className="col-lg-5 col-form-label">
                                Tên sân:
                            </label>
                            <div className="col-lg-7 ">
                                <input type="text" readOnly className="form-control-plaintext" id="" defaultValue="Sân A" />
                            </div>
                        </div>
                        <div className="mb-1 row ">
                            <label htmlFor="" className="col-lg-5 col-form-label">
                                Dạng lịch:
                            </label>
                            <div className="col-lg-7 ">
                                <input type="text" readOnly className="form-control-plaintext" id="" defaultValue="Lịch đơn" />
                            </div>
                        </div>
                        <div className="mb-1 row ">
                            <label htmlFor="" className="col-lg-5 col-form-label">
                                Slot:
                            </label>
                            <div className="col-lg-7 ">
                                <input type="text" readOnly className="form-control-plaintext" id="" defaultValue="Slot 1: 7:30 - 8:30" />
                            </div>
                        </div>

                        <div className="mb-1 row ">
                            <label htmlFor="" className="col-lg-5 col-form-label" style={{ fontSize: "22px" }}>
                                <i class="fa-solid fa-money-bill"></i> Tổng tiền:
                            </label>
                            <div className="col-lg-7 " style={{ display: "flex", alignItems: "center" }}>
                                <strong style={{ fontSize: "22px", color: "orangered", display: "flex", alignItems: "center" }}>75.000VNĐ</strong>
                            </div>
                        </div>
                        <div className="mb-1 row ">
                            <label htmlFor="" className="col-lg-5 col-form-label" style={{ fontSize: "22px" }}>
                                Thanh toán bằng
                            </label>
                            <div className="col-lg-7 " style={{ display: "flex", alignItems: "center" }}>
                                <input type="radio"></input>
                                <label className="d-flex" style={{ display: "flex", alignItems: "center" }}>
                                    <i class="fa-brands fa-paypal"></i>
                                    <p>paypal</p>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 info-customer">
                        <h4>Thông tin khách hàng</h4>
                        <div className="mb-1 row ">
                            <label htmlFor="nameYard" className="col-lg-5 col-form-label">
                                Họ và tên:
                            </label>
                            <div className="col-lg-7 ">
                                <input type="text" readOnly className="form-control-plaintext" id="nameYard" defaultValue="Nguyễn Xuân Hợp" />
                            </div>
                        </div>

                        <div className="mb-1 row ">
                            <label htmlFor="nameYard" className="col-lg-5 col-form-label">
                                Số điện thoại:
                            </label>
                            <div className="col-lg-7 ">
                                <input type="text" readOnly className="form-control" id="nameYard" defaultValue="0773866692" />
                            </div>
                        </div>

                        <div className="mb-1 row ">
                            <label htmlFor="nameYard" className="col-lg-5 col-form-label">
                                Email:
                            </label>
                            <div className="col-lg-7 ">
                                <input type="email" className="form-control" id="nameYard" defaultValue="abc@gmail.com " />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="button-function d-flex w-50 m-auto pb-4">
                <button className="btn btn-success py-2">Trở về trang đặt sân</button>
                <button className="btn btn-primary py-2">Xác nhận</button>
            </div>
            <Footer />
        </div>
    );
};

export default DetailBooking;
