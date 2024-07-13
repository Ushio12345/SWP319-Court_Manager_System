import React, { useEffect, useState } from "react";
import axiosInstance from "../../../config/axiosConfig";
import { showAlert } from "../../../utils/alertUtils";
import { handleTokenError } from "../../../utils/tokenErrorHandle";

const NewOrder = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        axiosInstance
            .get("/booking/bookings-of-courts")
            .then((res) => {
                if (res.status === 200) {
                    console.log("Data from API:", res.data);
                    setOrders(res.data);
                } else {
                    showAlert("error", "Lỗi !", "Không lấy được dữ liệu", "top-end");
                    console.error("Response không thành công:", res.status);
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 401 && error.response.data.message === "Token không hợp lệ hoặc đã hết hạn.") {
                    handleTokenError();
                }
                console.error("Lỗi fetch orders:", error);
            });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Đang chờ check-in":
                return "bg-warning";
            case "Đã hủy":
                return "bg-danger";
            case "Đã hoàn thành":
                return "bg-success";
            case "Đang chờ xử lý":
                return "bg-primary";

            default:
                return "";
        }
    };

    const getBookingDetails = (details) => {
        return details.map((detail) => (
            <tr key={detail.detailId}>
                <td>{detail.date}</td>
                <td>{detail.yardSchedule.slot.slotName}</td>
                <td>{detail.status}</td>
                <td>{detail.price}</td>
            </tr>
        ));
    };

    return (
        <div className="bookingListItem">
            <div className="overflow-x-auto">
                <table className="table">
                    <thead className="table-light">
                        <tr>
                            <th>Mã đơn</th>
                            <th>Khách hàng</th>
                            <th>Loại đặt sân</th>
                            <th>Ngày đặt</th>
                            <th>Trạng thái</th>
                            <th>Tổng tiền</th>
                            <th>Sân</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(orders).map((courtId) =>
                            orders[courtId].map((order) => (
                                <tr key={order.bookingId}>
                                    <td>{order.bookingId}</td>
                                    <td>{order.customer.fullName}</td>
                                    <td>{order.bookingType}</td>
                                    <td>{order.bookingDate}</td>
                                    <td>
                                        <div className={"rounded-pill py-1 text-center " + getStatusColor(order.statusEnum)}>{order.statusEnum}</div>
                                    </td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.court.courtName}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NewOrder;
