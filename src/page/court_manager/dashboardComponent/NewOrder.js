import React from "react";

export default function NewOrder() {
    // Sample data
    const orders = [
        {
            orderId: "ORD001",
            facilityName: "Sân cầu lông Cao Lỗ",
            yardName: "Sân 1",
            timeSlot: "7:00 - 8:00",
            scheduleType: "Đơn",
            totalAmount: "100000",
            status: "Đã duyệt",
        },
        {
            orderId: "ORD002",
            facilityName: "Sân cầu lông Kỳ Hòa",
            yardName: "Sân 2",
            timeSlot: "9:00 - 10:00",
            scheduleType: "Cố định",
            totalAmount: "150000",
            status: "Chưa duyệt",
        },
        {
            orderId: "ORD003",
            facilityName: "Sân cầu lông Kỳ Hòa",
            yardName: "Sân 3",
            timeSlot: "11:00 - 12:00",
            scheduleType: "Linh hoạt",
            totalAmount: "120000",
            status: "Đã duyệt",
        },
    ];

    const getStatusColor = (status) => {
        if (status === "Đã duyệt") {
            return "bg-success";
        } else if (status === "Chưa duyệt") {
            return "bg-danger";
        }
        return "";
    };

    const getScheduleTypeColor = (scheduleType) => {
        switch (scheduleType) {
            case "Đơn":
                return "bg-info";
            case "Cố định":
                return "bg-warning";
            case "Linh hoạt":
                return "bg-primary";
            default:
                return "";
        }
    };

    return (
        <div className="bookingListItem">
            <table className="table">
                <thead className="table-light">
                    <tr>
                        <th className="text-center">Mã đơn</th>
                        <th>Tên cơ sở</th>
                        <th>Sân</th>
                        <th>Slot</th>
                        <th>Dạng lịch</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.orderId}>
                            <td className="text-center">{order.orderId}</td>
                            <td>{order.facilityName}</td>
                            <td className="text-center">{order.yardName}</td>
                            <td className="text-center">{order.timeSlot}</td>
                            <td>
                                <div className={getScheduleTypeColor(order.scheduleType) + " rounded-pill  text-nowrap text-center py-1"}>
                                    {order.scheduleType}
                                </div>
                            </td>
                            <td className="text-center">{order.totalAmount}</td>
                            <td>
                                <div className={getStatusColor(order.status) + " rounded-pill py-2 text-white text-center"}>{order.status}</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
