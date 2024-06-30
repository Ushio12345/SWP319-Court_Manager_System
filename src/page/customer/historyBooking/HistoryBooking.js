import React, { Component } from "react";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import "./style.css";
import OrderItem from "./statusBooking/OrderItem";

export default class HistoryBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: "showAllOrder",
            orders: [
                {
                    id: 1,
                    nameCourt: "CLB cầu lông Phú Hữu",
                    status: "processing",
                    time: "26/06/2024 - 16:52",
                    slot: "[Sân 1] - Slot 1: 7:30 - 8:30",
                    bookingType: "Lịch đơn",
                    payment: "PayPal",
                    checkinCode: "AJ128",
                    price: 75000,
                    discount: 0,
                    totalPrice: 75000,
                },
                {
                    id: 2,
                    nameCourt: "CLB cầu lông Phú Hữu",
                    status: "approved",
                    time: "26/06/2024 - 16:52",
                    slot: "[Sân 2] - Slot 1: 8:30 - 9:30",
                    bookingType: "Lịch cố định",
                    startTime: "8:30",
                    endTime: "9:30",
                    payment: "PayPal",
                    checkinCode: "AJ129",
                    price: 85000,
                    discount: 10,
                    totalPrice: 76500,
                },
                {
                    id: 3,
                    nameCourt: "CLB cầu lông Phú Hữu",
                    status: "completed",
                    time: "26/06/2024 - 16:52",
                    slot: "[Sân 3] - Slot 1: 9:30 - 10:30",
                    bookingType: "Lịch đơn",
                    payment: "PayPal",
                    checkinCode: "AJ130",
                    price: 65000,
                    discount: 5,
                    totalPrice: 61750,
                },
                {
                    id: 4,
                    nameCourt: "CLB cầu lông Phú Hữu",
                    status: "cancelled",
                    time: "26/06/2024 - 16:52",
                    slot: "[Sân 4] - Slot 1: 10:30 - 11:30",
                    bookingType: "Lịch linh hoạt",
                    currentHours: 10,
                    bookedHours: 1,
                    payment: "PayPal",
                    checkinCode: "AJ131",
                    discount: 0,
                },
            ],
            isLoggedIn: false,
            user: {
                username: "",
                avatar: "",
                email: "",
                password: "",
                phone: "",
                balance: 0,
                roles: [],
            },
        };
    }
    componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            this.setState({
                isLoggedIn: true,
                user: {
                    username: user.fullName,
                    avatar: user.imageUrl,
                    email: user.email,
                    phone: user.phone,
                    balance: user.balance,
                    roles: user.roles,
                },
            });
        }
    }

    handleLogout = () => {
        localStorage.removeItem("user");

        this.setState({
            isLoggedIn: false,
            user: {
                username: "",
                avatar: "",
                email: "",
                password: "",
                phone: "",
                balance: 0,
                roles: [],
            },
        });

        window.location.href = "/";
    };
    setCurrentTab = (tab) => {
        this.setState({ currentTab: tab });
    };

    filterOrders = (status) => {
        const { orders } = this.state;
        if (status === "showAllOrder") {
            return orders;
        }
        const statusMap = {
            showProcessingOrder: "processing",
            showApprovedOrder: "approved",
            showCompleteOrder: "completed",
            showCancelledOrder: "cancelled",
        };
        return orders.filter((order) => order.status === statusMap[status]);
    };

    render() {
        const { currentTab } = this.state;
        const filteredOrders = this.filterOrders(currentTab);
        const { isLoggedIn, user, errors } = this.state;

        return (
            <div className="historyPage">
                <Header isLoggedIn={isLoggedIn} user={user} handleLogout={this.handleLogout} />
                <div className="historyPage-body w-75 m-auto">
                    <div className="">
                        <div>
                            <ul className="nav-status nav nav-pills nav-justified mb-3" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link ${currentTab === "showAllOrder" ? "active" : ""}`}
                                        id="showAllOrder-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#showAllOrder"
                                        type="button"
                                        role="tab"
                                        aria-controls="showAllOrder"
                                        aria-selected={currentTab === "showAllOrder"}
                                        onClick={() => this.setCurrentTab("showAllOrder")}
                                    >
                                        Tất cả
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link ${currentTab === "showProcessingOrder" ? "active" : ""}`}
                                        id="showProcessingOrder-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#showProcessingOrder"
                                        type="button"
                                        role="tab"
                                        aria-controls="showProcessingOrder"
                                        aria-selected={currentTab === "showProcessingOrder"}
                                        onClick={() => this.setCurrentTab("showProcessingOrder")}
                                    >
                                        Đang chờ duyệt
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link ${currentTab === "showApprovedOrder" ? "active" : ""}`}
                                        id="showApprovedOrder-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#showApprovedOrder"
                                        type="button"
                                        role="tab"
                                        aria-controls="showApprovedOrder"
                                        aria-selected={currentTab === "showApprovedOrder"}
                                        onClick={() => this.setCurrentTab("showApprovedOrder")}
                                    >
                                        Đã duyệt / Chờ Check-in
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link ${currentTab === "showCompleteOrder" ? "active" : ""}`}
                                        id="showCompleteOrder-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#showCompleteOrder"
                                        type="button"
                                        role="tab"
                                        aria-controls="showCompleteOrder"
                                        aria-selected={currentTab === "showCompleteOrder"}
                                        onClick={() => this.setCurrentTab("showCompleteOrder")}
                                    >
                                        Đã hoàn thành
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link ${currentTab === "showCancelledOrder" ? "active" : ""}`}
                                        id="showCancelledOrder-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#showCancelledOrder"
                                        type="button"
                                        role="tab"
                                        aria-controls="showCancelledOrder"
                                        aria-selected={currentTab === "showCancelledOrder"}
                                        onClick={() => this.setCurrentTab("showCancelledOrder")}
                                    >
                                        Đã hủy
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" name="findOrder" id="findOrder" placeholder="Nhập sân cần tìm" />
                        </div>

                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="showAllOrder" role="tabpanel" aria-labelledby="showAllOrder-tab">
                                {filteredOrders.map((order) => (
                                    <OrderItem key={order.id} order={order} />
                                ))}
                            </div>
                            <div className="tab-pane fade" id="showProcessingOrder" role="tabpanel" aria-labelledby="showProcessingOrder-tab">
                                {filteredOrders.map((order) => (
                                    <OrderItem key={order.id} order={order} />
                                ))}
                            </div>
                            <div className="tab-pane fade" id="showApprovedOrder" role="tabpanel" aria-labelledby="showApprovedOrder-tab">
                                {filteredOrders.map((order) => (
                                    <OrderItem key={order.id} order={order} />
                                ))}
                            </div>
                            <div className="tab-pane fade" id="showCompleteOrder" role="tabpanel" aria-labelledby="showCompleteOrder-tab">
                                {filteredOrders.map((order) => (
                                    <OrderItem key={order.id} order={order} />
                                ))}
                            </div>
                            <div className="tab-pane fade" id="showCancelledOrder" role="tabpanel" aria-labelledby="showCancelledOrder-tab">
                                {filteredOrders.map((order) => (
                                    <OrderItem key={order.id} order={order} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
