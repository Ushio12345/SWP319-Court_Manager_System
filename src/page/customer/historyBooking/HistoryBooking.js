import React, { Component } from "react";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import "./style.css";
import OrderItem from "./statusBooking/OrderItem";
import axiosInstance from "../../../config/axiosConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox } from "@fortawesome/free-solid-svg-icons";

export default class HistoryBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: "showProcessingOrder",
            bookings: [],
            isLoggedIn: false,
            user: {
                username: "",
                avatar: "",
                email: "",
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

        this.fetchBookings();
    }

    fetchBookings = () => {
        axiosInstance
            .get("/booking/bookings")
            .then(response => {
                this.setState({ bookings: response.data });
            })
            .catch(error => {
                console.error("There was an error fetching the bookings!", error);
            });
    }

    handleLogout = () => {
        localStorage.removeItem("user");

        this.setState({
            isLoggedIn: false,
            user: {
                username: "",
                avatar: "",
                email: "",
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

    filterBookings = (status) => {
        return this.state.bookings.filter(booking => booking.statusEnum === status);
    }

    render() {
        const { currentTab, isLoggedIn, user } = this.state;

        return (
            <div className="historyPage">
                <Header isLoggedIn={isLoggedIn} user={user} handleLogout={this.handleLogout} />
                <div className="historyPage-body w-75 m-auto">
                        <div>
                            <ul className="nav-status nav nav-pills nav-justified mb-3" id="pills-tab" role="tablist">
                            {["showProcessingOrder", "showCompleteOrder", "showCancelledOrder"].map((tab) => (
                                <li className="nav-item" role="presentation" key={tab}>
                                    <button
                                        className={`nav-link ${currentTab === tab ? "active" : ""}`}
                                        id={`${tab}-tab`}
                                        data-bs-toggle="pill"
                                        data-bs-target={`#${tab}`}
                                        type="button"
                                        role="tab"
                                        aria-controls={tab}
                                        aria-selected={currentTab === tab}
                                        onClick={() => this.setCurrentTab(tab)}
                                    >
                                        {tab === "showProcessingOrder" && "Đang chờ xử lý"}
                                        {tab === "showCompleteOrder" && "Đã hoàn thành"}
                                        {tab === "showCancelledOrder" && "Đã hủy"}
                                    </button>
                                </li>
                            ))}
                            </ul>
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" name="findOrder" id="findOrder" placeholder="Nhập sân cần tìm" />
                        </div>
                        <div className="tab-content" id="pills-tabContent">
                        {["showProcessingOrder", "showCompleteOrder", "showCancelledOrder"].map((tab) => {
                            const filteredBookings = this.filterBookings(
                                tab === "showProcessingOrder" ? "Đang chờ xử lý" :
                                tab === "showCompleteOrder" ? "Đã check-in" :
                                "Đã hủy"
                            );
                            return (
                                <div
                                    key={tab}
                                    className={`tab-pane fade ${currentTab === tab ? "show active" : ""}`}
                                    id={tab}
                                    role="tabpanel"
                                    aria-labelledby={`${tab}-tab`}
                                >
                                    {filteredBookings.length > 0 ? (
                                        filteredBookings.map((booking) => (
                                            <OrderItem key={booking.bookingId} booking={booking} onBookingCancel={this.fetchBookings} />
                                        ))
                                    ) : (
                                        <div className="no-bookings">
                                            <FontAwesomeIcon icon={faInbox} size="3x" />
                                            <p>Chưa có đơn hàng</p>
                            </div>
                                    )}
                        </div>
                            );
                        })}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
