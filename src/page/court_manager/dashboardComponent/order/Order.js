import React, { Component } from "react";
import axiosInstance from "../../../../config/axiosConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faInbox } from "@fortawesome/free-solid-svg-icons";
import "./order.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { alert, showAlert, showConfirmPayment } from "../../../../utils/alertUtils";

export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courts: [],
            selectedCourt: "",
            bookingsOfCourts: [],
            bookingsOfSelectedCourt: [],
            currentTab: "showProcessingOrder",
            bookings: [],
            searchQuery: "",
            showModal: false,
            selectedBooking: null,
            currentPage: 1,
            slotsPerPage: 5,
        };
    }

    componentDidMount() {
        this.fetchCourts();
        this.fetchBookingsOfCourts();
    }

    fetchCourts = () => {
        axiosInstance
            .get("/court/courts-of-owner")
            .then((res) => {
                if (res.status === 200) {
                    const firstCourt = res.data[0];
                    this.setState({ courts: res.data, selectedCourt: firstCourt.courtId, selectedCourtName: firstCourt.courtName }, () => {
                        this.filterBookingsBySelectedCourt();
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    fetchBookingsOfCourts = () => {
        axiosInstance
            .get("/booking/bookings-of-courts")
            .then((res) => {
                if (res.status === 200) {
                    this.setState({ bookingsOfCourts: res.data }, () => {
                        this.filterBookingsBySelectedCourt();
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    handleCancelBooking = async (bookingId) => {
        try {
            showConfirmPayment("Thông báo", "Bạn có chắc chắn muốn hủy đơn hàng ?", "warning", "Chắc chắn rồi", "Trở lại", "center").then(
                async (result) => {
                    if (result.isConfirmed) {
                        const cancelResponse = await axiosInstance.post(`/booking/${bookingId}/cancel`);
                        if (cancelResponse.data.message === "Đã hủy đơn hàng thành công.") {
                            alert("success", "Thông báo", "Hủy đơn hàng thành công !", "center");
                            this.fetchBookingsOfCourts();
                        } else {
                            alert("error", "Thông báo", "Hủy đơn hàng không thành công !", "center");
                        }
                    }
                }
            );
        } catch (error) {
            console.error("Failed to cancel booking:", error);
        }
    };

    handleConfirmBooking = async (bookingId) => {
        try {
            const confirmResponse = await axiosInstance.post(`/booking/${bookingId}/confirm`);
            if (confirmResponse.data.message === "Xác nhận đơn hàng thành công") {
                showAlert("success", "Thông báo", "Xác nhận đơn hàng thành công !", "top-end");
                this.fetchBookingsOfCourts();
            } else {
                showAlert("error", "Thông báo", "Hủy đơn hàng không thành công !", "top-end");
            }
        } catch (error) {
            console.error("Failed to confirm booking:", error);
        }
    };

    setCurrentTab = (tab) => {
        this.setState({ currentTab: tab });
    };

    // Hàm để cập nhật giá trị tìm kiếm
    handleSearchQueryChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleCourtChange = (event) => {
        const courtId = event.target.value;
        const courtName = event.target.options[event.target.selectedIndex].text;
        this.setState(
            {
                selectedCourt: courtId,
                selectedCourtName: courtName,
            },
            () => {
                this.filterBookingsBySelectedCourt();
            }
        );
    };

    renderCourtOption = () => {
        return this.state.courts.map((court) => (
            <option key={court.courtId} value={court.courtId}>
                {court.courtName}
            </option>
        ));
    };

    filterBookingsBySelectedCourt = () => {
        const { bookingsOfCourts, selectedCourt } = this.state;
        const bookingsOfSelectedCourt = bookingsOfCourts[selectedCourt] || [];
        this.setState({ bookingsOfSelectedCourt });
    };

    filterBookings = (status) => {
        const { bookingsOfSelectedCourt, searchQuery } = this.state;
        return bookingsOfSelectedCourt
            .filter((booking) => booking.statusEnum === status)
            .filter((booking) => {
                const courtName = booking.courtName ? booking.courtName.toLowerCase() : "";
                const bookingId = booking.bookingId ? booking.bookingId.toString() : "";
                return courtName.includes(searchQuery.toLowerCase()) || bookingId.includes(searchQuery);
            });
    };

    handleShowModal = (booking) => {
        this.setState({ showModal: true, selectedBooking: booking });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false, selectedBooking: null });
    };

    getPrice(bookingType) {
        switch (bookingType) {
            case "Lịch đơn":
                return this.state.selectedBooking.court.priceList.singleBookingPrice.toLocaleString("vi-VN");
            case "Lịch cố định":
                return this.state.selectedBooking.court.priceList.fixedBookingPrice.toLocaleString("vi-VN");
            case "Lịch linh hoạt":
                return this.state.selectedBooking.court.priceList.flexibleBookingPrice.toLocaleString("vi-VN");
            default:
                return null;
        }
    }

    render() {
        const { currentTab, searchQuery, showModal, selectedBooking } = this.state;

        return (
            <div className="historyPage">
                <div className="orderPage-body">
                    <div className="select-court d-flex" style={{ alignItems: "center" }}>
                        <label className="me-3">Chọn cơ sở: </label>
                        <select className="" style={{ height: 40 }} onChange={this.handleCourtChange}>
                            {this.renderCourtOption()}
                        </select>
                    </div>
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
                    <div className="mb-3">
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
                            return (
                                <div
                                    key={tab}
                                    className={`tab-pane fade ${currentTab === tab ? "show active" : ""}`}
                                    id={tab}
                                    role="tabpanel"
                                    aria-labelledby={`${tab}-tab`}
                                >
                                    {filteredBookings.length > 0 ? (
                                        <table className="table table-hover table-borderless">
                                            <thead>
                                                <tr>
                                                    <th className="text-start">STT</th>
                                                    <th className="text-start">Mã đơn hàng</th>
                                                    <th className="text-start">Khách hàng</th>

                                                    <th className="text-start">Loại lịch</th>
                                                    <th className="text-start">Tổng giá (VND)</th>
                                                    <th className="text-start">Ngày đặt</th>
                                                    <th className="text-center">Thao tác</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredBookings
                                                    .sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate))
                                                    .map((booking, index) => (
                                                        <tr key={booking.bookingId}>
                                                            <td className="text-start">{index + 1}</td>
                                                            <td className="text-start">{booking.bookingId}</td>
                                                            <td className="text-start">
                                                                <p>{booking.customer.fullName}</p>
                                                                <p className="text-xs text-gray-600 dark:text-gray-400">{booking.customer.email}</p>
                                                            </td>
                                                            <td className="text-start">{booking.bookingType}</td>
                                                            <td className="text-start">{booking.totalPrice.toLocaleString("vi-VN")}</td>
                                                            <td className="text-start">{booking.bookingDate}</td>
                                                            <td className="d-flex btn-action">
                                                                <button
                                                                    className="btn btn-info mr-2 p-2"
                                                                    onClick={() => this.handleShowModal(booking)}
                                                                >
                                                                    Chi tiết
                                                                </button>
                                                                {booking.statusEnum === "Đang chờ xử lý" && (
                                                                    <>
                                                                        <button
                                                                            className="btn btn-success mr-2 p-2"
                                                                            onClick={() => this.handleConfirmBooking(booking.bookingId)}
                                                                        >
                                                                            Xác nhận
                                                                        </button>
                                                                        <button
                                                                            className="btn btn-danger p-2"
                                                                            onClick={() => this.handleCancelBooking(booking.bookingId)}
                                                                        >
                                                                            Hủy
                                                                        </button>
                                                                    </>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="no-bookings text-center">
                                            <FontAwesomeIcon icon={faInbox} size="3x" />
                                            <p>Chưa có đơn hàng</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        <Modal show={showModal} onHide={() => this.setState({ showModal: false })} centered size="lg">
                            <Modal.Header closeButton>
                                <Modal.Title>Chi tiết đơn</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedBooking && (
                                    <div className="order-detail ms-3">
                                        <p>
                                            <b>Mã đơn hàng:</b> {selectedBooking.bookingId}
                                        </p>
                                        <p>
                                            <b>Khách hàng:</b> {selectedBooking.customer.fullName}
                                        </p>
                                        <p>
                                            <b>Email:</b> {selectedBooking.customer.email}
                                        </p>
                                        <p>
                                            <b>Thời gian đặt đơn:</b> {selectedBooking.bookingDate}
                                        </p>
                                        <p className="booking-type">
                                            <b>Dạng lịch:</b> {selectedBooking.bookingType}
                                        </p>
                                        {selectedBooking.flexibleBooking && (
                                            <p>
                                                <b>Số giờ linh hoạt:</b>{" "}
                                                {selectedBooking.flexibleBooking.availableHours + selectedBooking.flexibleBooking.usedHours}
                                            </p>
                                        )}
                                        <p></p>
                                        <p>
                                            <b>Hình thức thanh toán: </b>
                                            {selectedBooking.totalPrice !== 0 ? (
                                                <>
                                                    <i className="fa-brands fa-paypal text-info"></i> <span> PayPal</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon icon={faClock} className="text-info" /> <span> Giờ linh hoạt</span>
                                                </>
                                            )}
                                        </p>
                                        <hr />
                                        {/* Additional details */}
                                        {selectedBooking.statusEnum && selectedBooking?.bookingDetails?.length > 0 && (
                                            <table className="table table-borderless">
                                                <thead>
                                                    <tr>
                                                        <th>Slot</th>
                                                        <th>Ngày check-in</th>
                                                        <th>Sân</th>
                                                        <th>{selectedBooking.totalPrice === 0 ? "Giờ" : "Giá (VND)"}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {selectedBooking.bookingDetails
                                                        .sort((a, b) => a.yardSchedule.slot.slotName.localeCompare(b.yardSchedule.slot.slotName))
                                                        .map((bookingDetail, index) => (
                                                            <tr key={index}>
                                                                <td>{bookingDetail.yardSchedule.slot.slotName}</td>
                                                                <td>{bookingDetail.date}</td>
                                                                <td>{bookingDetail.yardSchedule.yard.yardName}</td>
                                                                <td>
                                                                    {selectedBooking.totalPrice === 0
                                                                        ? `1 giờ`
                                                                        : this.getPrice(selectedBooking.bookingType)}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    {selectedBooking.totalPrice === 0 ? (
                                                        <tr>
                                                            <td>
                                                                <b>Giờ linh hoạt:</b>
                                                            </td>
                                                            <td colSpan="2"></td>
                                                            <td style={{ color: "green", fontWeight: "bold" }}>
                                                                {selectedBooking.totalPrice === 0
                                                                    ? `${selectedBooking.bookingDetails.length} giờ`
                                                                    : 0}
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        <tr>
                                                            <td>
                                                                <b>Tổng tiền:</b>
                                                            </td>
                                                            <td colSpan="2"></td>
                                                            <td style={{ color: "green", fontWeight: "bold" }}>
                                                                {selectedBooking.totalPrice.toLocaleString("vi-VN")}
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                )}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => this.setState({ showModal: false })}>
                                    Đóng
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}
