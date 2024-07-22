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
            searchQuery: "",
            isLoggedIn: false,
            user: {
                username: "",
                avatar: "",
                email: "",
                phone: "",
                balance: 0,
                roles: [],
            },
            currPage: 1,
            itemOrderPerPage: 3,
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
            .then((response) => {
                this.setState({ bookings: response.data });
            })
            .catch((error) => {
                console.error("There was an error fetching the bookings!", error);
            });
    };

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
        this.setState({ currentTab: tab, currPage: 1 }); // reset currPage when changing tab
    };

    handleSearchQueryChange = (event) => {
        this.setState({ searchQuery: event.target.value, currPage: 1 }); // reset currPage when searching
    };

    filterBookings = (status) => {
        const { bookings, searchQuery } = this.state;
        return bookings
            .filter((booking) => booking.statusEnum === status)
            .filter((booking) => {
                const courtName = booking.courtName ? booking.courtName.toLowerCase() : "";
                const bookingId = booking.bookingId ? booking.bookingId.toString() : "";
                return courtName.includes(searchQuery.toLowerCase()) || bookingId.includes(searchQuery);
            });
    };

    handlePageChange = (page) => {
        this.setState({ currPage: page });
    };

    renderPagination = (filteredBookings) => {
        const { currPage, itemOrderPerPage } = this.state;
        const pageNumber = [];

        for (let i = 1; i <= Math.ceil(filteredBookings.length / itemOrderPerPage); i++) {
            pageNumber.push(i);
        }

        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-link" href="#" aria-label="Previous" onClick={() => this.handlePageChange(Math.max(currPage - 1, 1))}>
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </button>
                    </li>
                    {pageNumber.map((number) => (
                        <button key={number} className={`page-item ${currPage === number ? "active" : ""}`}>
                            <button onClick={() => this.handlePageChange(number)} className="page-link" href="#">
                                {number}
                            </button>
                        </button>
                    ))}
                    <li className="page-item">
                        <button
                            className="page-link"
                            href="#"
                            aria-label="Next"
                            onClick={() => this.handlePageChange(Math.min(currPage + 1, pageNumber.length))}
                        >
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </button>
                    </li>
                </ul>
            </nav>
        );
    };
    render() {
        const { currentTab, isLoggedIn, user, searchQuery, currPage, itemOrderPerPage } = this.state;

        return (
            <div className="historyPage">
                <Header isLoggedIn={isLoggedIn} user={user} handleLogout={this.handleLogout} />
                <div className="historyPage-body w-75 m-auto">
                    <div>
                        <ul className="nav-status nav nav-pills nav-justified mb-3" id="pills-tab" role="tablist">
                            {["showProcessingOrder", "showCheckInOrder", "showCompleteOrder", "showCancelledOrder"].map((tab) => (
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
                                        {tab === "showCheckInOrder" && "Đang chờ check-in"}
                                        {tab === "showCompleteOrder" && "Đã hoàn thành"}
                                        {tab === "showCancelledOrder" && "Đã hủy"}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="findOrder mb-3">
                        <input
                            type="text"
                            className="form-control"
                            name="findOrder"
                            id="findOrder"
                            placeholder="Bạn có thể tìm kiếm theo tên sân hoặc mã đơn hàng"
                            value={searchQuery}
                            onChange={this.handleSearchQueryChange}
                        />
                    </div>
                    <div className="tab-content" id="pills-tabContent">
                        {["showProcessingOrder", "showCheckInOrder", "showCompleteOrder", "showCancelledOrder"].map((tab) => {
                            const filteredBookings = this.filterBookings(
                                tab === "showProcessingOrder"
                                    ? "Đang chờ xử lý"
                                    : tab === "showCheckInOrder"
                                        ? "Đang chờ check-in"
                                        : tab === "showCompleteOrder"
                                            ? "Đã hoàn thành"
                                            : "Đã hủy"
                            );
                            const indexOfLastOrder = currPage * itemOrderPerPage;
                            const indexOfFirstOrder = indexOfLastOrder - itemOrderPerPage;
                            const currentOrders = filteredBookings.slice(indexOfFirstOrder, indexOfLastOrder);

                            return (
                                <div
                                    key={tab}
                                    className={`tab-pane fade ${currentTab === tab ? "show active" : ""}`}
                                    id={tab}
                                    role="tabpanel"
                                    aria-labelledby={`${tab}-tab`}
                                >
                                    {currentOrders.length > 0 ? (
                                        currentOrders
                                            .sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate))
                                            .map((booking) => {
                                                return <OrderItem key={booking.bookingId} booking={booking} onBookingCancel={this.fetchBookings} />;
                                            })
                                    ) : (
                                        <div className="no-bookings">
                                            <FontAwesomeIcon icon={faInbox} size="3x" />
                                            <p>Chưa có đơn hàng</p>
                                        </div>
                                    )}
                                    {filteredBookings.length > 0 && <div className="mt-4">{this.renderPagination(filteredBookings)}</div>}
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