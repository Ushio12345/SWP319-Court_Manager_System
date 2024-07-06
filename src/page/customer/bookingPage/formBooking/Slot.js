import React, { Component } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format, eachDayOfInterval, parse, differenceInHours } from "date-fns";
import { vi } from "date-fns/locale";
import axiosInstance from "../../../../config/axiosConfig";
import { Modal, Button } from 'react-bootstrap';
import NapGio from "./NapGio";
import { showConfirmPayment } from "../../../../utils/alertUtils";


// Register the Vietnamese locale with react-datepicker
registerLocale("vi", vi);

export default class Slot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: addDays(new Date(), 6),
            daysOfWeek: [],
            selectedTab: "lichdon",
            slots: [],
            bookedSlots: [],
            selectedSlots: {},
            selectedDay: null,
            selectedYard: "",
            errorMessage: "",
            bookingDetailsList: [],
            isLoggedIn: false,
            currentDate: new Date(),
            showModal: false,
            hoursToLoad: 0,
            user: "",
            priceList: this.props.court.priceList,
            courtId: this.props.court.courtId,
            flexibleBookings: [],
            availableHours: ""
        };
    }

    componentDidMount() {
        this.updateDaysOfWeek(this.state.startDate, this.state.endDate);

        if (this.props.court && this.props.court.yards && this.props.court.yards.length > 0) {
            this.setState({ selectedYard: this.props.court.yards[0].yardId });
        } else {
            this.fetchSlots();
        } const user = JSON.parse(localStorage.getItem("user"));

        this.checkUserLoginStatus();
        this.fetchFlexibleBookings();
    }

    checkUserLoginStatus() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            this.setState({ isLoggedIn: true, user: user });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.startDate !== this.state.startDate || prevState.endDate !== this.state.endDate) {
            console.log("Date range changed:", this.state.startDate, this.state.endDate);
            this.updateDaysOfWeek(this.state.startDate, this.state.endDate);
        }

        if (prevState.selectedYard !== this.state.selectedYard) {
            console.log("Selected yard changed:", this.state.selectedYard);
            this.fetchSlots();
            this.fetchBookedSlots();
        }
    }

    fetchSlots = () => {
        axiosInstance
            .get(`/yard-schedule/getAllByYardId/${this.state.selectedYard}`)
            .then((response) => {
                console.log("Slots data received:", response.data);
                this.setState({ slots: response.data });
            })
            .catch((error) => {
                console.error("There was an error fetching the slots!", error);
            });
    };

    fetchFlexibleBookings = () => {
        axiosInstance
            .get(`/booking/flexible-bookings`)
            .then((response) => {
                this.setState({ flexibleBookings: response.data });
            })
            .catch((error) => {
                console.error("There was an error fetching the flexible bookings !", error);
            });
    };

    fetchBookedSlots = () => {
        const formattedDates = this.state.daysOfWeek.map((day) => day.split(" ")[0]);

        console.log("Fetching booked slots for dates:", formattedDates); // Log dates

        axiosInstance
            .post(`/booking-details/booked-slots/${this.state.selectedYard}`, formattedDates)
            .then((response) => {
                console.log("Booked slots data received:", response.data); // Log response data
                this.setState({ bookedSlots: response.data });
            })
            .catch((error) => {
                console.error("There was an error fetching the booked slots!", error);
            });
    };

    isSlotBooked = (dayKey, slotId) => {
        const { bookedSlots } = this.state;
        const formattedDayKey = dayKey.split(" ")[0];

        console.log("Daykey data received:", formattedDayKey);

        if (!bookedSlots[formattedDayKey] || bookedSlots[formattedDayKey].length === 0) {
            return false;
        }

        return bookedSlots[formattedDayKey].some((slot) => slot.slotId === slotId);
    };

    getAvailableHours = () => {
        const { flexibleBookings } = this.state;

        if (!flexibleBookings || flexibleBookings.length === 0) {
            return 0;
        }

        let totalAvailableHours = 0;

        flexibleBookings.forEach(booking => {
            totalAvailableHours += booking.availableHours;
        });

        return totalAvailableHours;
    }

    handlePopupToggle = () => {
        this.setState({ showModal: !this.state.showModal });
    };

    handleHoursChange = (event) => {
        this.setState({ hoursToLoad: event.target.value });
    };

    updateDaysOfWeek = (start, end) => {
        const days = eachDayOfInterval({ start, end }).map((date) => format(date, "dd/MM/yyyy EEEE", { locale: vi }));
        this.setState({ daysOfWeek: days });
    };

    handleStartDateChange = (date) => {
        this.setState({ startDate: date });
    };

    handleEndDateChange = (date) => {
        this.setState({ endDate: date });
    };

    handleTabChange = (tab) => {
        this.setState({ selectedTab: tab, selectedSlots: {}, selectedDay: null, errorMessage: "" });
    };

    handleSlotSelection = (slot, dayIndex) => {
        const { selectedTab, selectedSlots, selectedDay, bookingDetailsList, slots, selectedYard } = this.state;
        const dayKey = this.state.daysOfWeek[dayIndex];
        const newSelectedSlots = { ...selectedSlots };

        if (!newSelectedSlots[dayKey]) {
            newSelectedSlots[dayKey] = [];
        }

        if (selectedTab === "lichdon" || selectedTab === "linhhoat") {
            if (selectedDay !== null && selectedDay !== dayIndex && !newSelectedSlots[dayKey].includes(slot)) {
                this.setState({ errorMessage: "Bạn chỉ có thể chọn nhiều slot trong cùng một ngày." });
                return;
            }

            if (newSelectedSlots[dayKey].includes(slot)) {
                newSelectedSlots[dayKey] = newSelectedSlots[dayKey].filter((s) => s !== slot);
                if (newSelectedSlots[dayKey].length === 0) {
                    delete newSelectedSlots[dayKey];
                }
                const updatedBookingDetailsList = bookingDetailsList.filter(
                    (detail) => !(detail.slotId === slot && detail.date === dayKey.split(" ")[0])
                );
                this.setState({ bookingDetailsList: updatedBookingDetailsList });
            } else {
                newSelectedSlots[dayKey].push(slot);
                const slotDetail = slots.find((s) => s.slotId === slot);

                const formattedDate = dayKey.split(" ")[0];
                const newBookingDetail = {
                    date: formattedDate,
                    yardId: selectedYard,
                    slotId: slotDetail.slotId,
                };
                this.setState((prevState) => ({
                    bookingDetailsList: [...prevState.bookingDetailsList, newBookingDetail],
                }));
            }

            this.setState(
                {
                    selectedSlots: newSelectedSlots,
                    selectedDay: Object.keys(newSelectedSlots).length > 0 ? dayIndex : null,
                    errorMessage: "",
                },
                () => {
                    console.log(this.state.bookingDetailsList);
                }
            );
        } else if (selectedTab === "codinh") {
            newSelectedSlots[dayKey] = [slot];
            this.setState({
                selectedSlots: newSelectedSlots,
                selectedDay: dayIndex,
                errorMessage: "",
            });
        }
    };

    handleButtonClick = (event) => {
        event.preventDefault();

        if (!this.state.isLoggedIn) {
            window.location.href = "/login";
            return;
        }

        if (this.state.bookingDetailsList.length === 0) {
            this.setState({ errorMessage: "Hãy chọn slot bạn muốn chơi" });
            return;
        }

        let url = '';
        let data = {};
        const { selectedTab, bookingDetailsList } = this.state;
        const courtId = this.props.court.courtId;

        const totalRequiredHours = bookingDetailsList.reduce((total, bookingDetailsRequest) => {
            const slot = this.state.slots.find(s => s.slotId === bookingDetailsRequest.slotId);
            const startTime = parse(slot.startTime, 'HH:mm', new Date());
            const endTime = parse(slot.endTime, 'HH:mm', new Date());
            const duration = differenceInHours(endTime, startTime);
            return total + duration;
        }, 0);

        switch (selectedTab) {
            case 'linhhoat':
                url = `/booking/${courtId}/flexible`;
                data = bookingDetailsList;
                if (totalRequiredHours > this.getAvailableHours()) {
                    this.setState({ errorMessage: "Không đủ giờ linh hoạt để đặt." });
                    return;
                }
                break;
            case 'lichdon':
                url = `/booking/${courtId}/single-day`;
                data = bookingDetailsList;
                break;
            case 'codinh':
                url = `/booking/${courtId}/fixed`;
                // data = fixedData;  // Adjust this to match the data structure for fixed bookings
                break;
            default:
                console.error("Invalid selectedTab value!");
                return;
        }

        if (selectedTab === "linhhoat") {
            axiosInstance
            .post(url, data)
            .then((response) => {
                if (response.status === 200) {
                    showConfirmPayment('Thông báo', 'Thanh toán và đặt lịch thành công !', 'success', 'Xem trạng thái đơn hàng', 'Trở về trang chủ', 'center')
                    .then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/historyOrder";
                        } else if (result.dismiss) {
                            window.location.href = "/";
                        }
                    });
                }
            })
            .catch((error) => {
                console.error("There was an error when booking !", error);
            });
        } else {
            axiosInstance
            .post(url, data)
            .then((response) => {
                localStorage.setItem("booking", JSON.stringify(response.data));
                window.location.href = "/detailBooking";
            })
            .catch((error) => {
                console.error("There was an error when booking !", error);
            });
        }   
    };


    handleYardChange = (event) => {
        this.setState({ selectedYard: event.target.value });
    };

    isSlotBooked = (dayKey, slotId) => {
        const { bookedSlots } = this.state;

        const parsedDate = parse(dayKey.split(" ")[0], "dd/MM/yyyy", new Date());
        const formattedDayKey = format(parsedDate, "yyyy-MM-dd");

        if (!bookedSlots[formattedDayKey] || bookedSlots[formattedDayKey].length === 0) {
            return false;
        }

        return bookedSlots[formattedDayKey].some((slot) => slot.slotId === slotId);
    };



    render() {
        const { court } = this.props;
        const { startDate, endDate, daysOfWeek, selectedTab, selectedSlots, errorMessage, slots } = this.state;

        const selectedSlotDetails = Object.entries(selectedSlots).flatMap(([day, slotIds]) =>
            slotIds.map((slotId) => {
                const slot = slots.find(s => s.slotId === slotId); // Tìm slot theo slotId
                return `${slot ? slot.slotName : 'Unknown Slot'}`; // Kiểm tra nếu slot tồn tại
            })
        );

        return (
            <div className="">
                <form className="order">
                    <div className="select-slot p-3">
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link ${selectedTab === "lichdon" ? "active" : ""}`}
                                    id="lichdon"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-lichdon"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-lichdon"
                                    aria-selected={selectedTab === "lichdon"}
                                    onClick={() => this.handleTabChange("lichdon")}
                                >
                                    Lịch đơn
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link ${selectedTab === "codinh" ? "active" : ""}`}
                                    id="lichCoDinh-tabs"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-codinh"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-codinh"
                                    aria-selected={selectedTab === "codinh"}
                                    onClick={() => this.handleTabChange("codinh")}
                                >
                                    Lịch cố định
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link ${selectedTab === "linhhoat" ? "active" : ""}`}
                                    id="linhhoat-tabs"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-linhhoat"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-linhhoat"
                                    aria-selected={selectedTab === "linhhoat"}
                                    onClick={() => this.handleTabChange("linhhoat")}
                                >
                                    Lịch linh hoạt
                                </button>
                            </li>
                        </ul>
                        {selectedTab === "linhhoat" && <h3>Số giờ linh hoạt hiện có: {this.getAvailableHours()} giờ</h3>}
                        
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            value={this.state.selectedYard}
                            onChange={this.handleYardChange}
                        >
                            <option value="">Chọn sân</option>
                            {court?.yards?.map((yard, index) => (
                                <option key={index} value={yard.yardId}>
                                    {yard.yardName}
                                </option>
                            ))}
                        </select>
                        <div className="tab-content" id="pills-tabContent">
                            <div
                                className={`tab-pane fade ${selectedTab === "lichdon" ? "show active" : ""}`}
                                id="pills-lichdon"
                                role="tabpanel"
                                aria-labelledby="lichdon"
                            >
                                <table className="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th>Slot</th>
                                            {daysOfWeek.map((day, index) => (
                                                <th key={index}>{day}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.slots.map((slot, slotIndex) => (
                                            <tr key={slot.slotId}>
                                                <td>{slot.slotName}</td>
                                                {daysOfWeek.map((_, dayIndex) => (

                                                    <td key={dayIndex} className="slot-times-column">
                                                        {console.log(this.state.bookedSlots[0])}
                                                        <div
                                                            className={`slot-time ${selectedSlots[daysOfWeek[dayIndex]]?.includes(slot.slotId) ? "selected" : ""
                                                                } ${this.isSlotBooked(daysOfWeek[dayIndex], slot.slotId) ? "booked" : ""}`}
                                                            onClick={
                                                                !this.isSlotBooked(daysOfWeek[dayIndex], slot.slotId)
                                                                    ? () => this.handleSlotSelection(slot.slotId, dayIndex)
                                                                    : null
                                                            }
                                                        >
                                                            {`${slot.startTime} - ${slot.endTime}`}
                                                        </div>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div
                                className={`tab-pane fade ${selectedTab === "codinh" ? "show active" : ""}`}
                                id="pills-codinh"
                                role="tabpanel"
                                aria-labelledby="lichCoDinh-tabs"
                            >
                                <table className="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th>Slot</th>
                                            {daysOfWeek.map((day, index) => (
                                                <th key={index}>{day}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    {/* <tbody>
                                        {Object.keys(slotTimes).map((slot, slotIndex) => (
                                            <tr key={slotIndex}>
                                                <td>{slot}</td>
                                                {daysOfWeek.map((_, dayIndex) => (
                                                    <td key={dayIndex} className="slot-times-column">
                                                        <div
                                                            className={`slot-time ${selectedSlots[this.state.daysOfWeek[dayIndex]]?.includes(slot) ? "selected" : ""
                                                                }`}
                                                            onClick={() => this.handleSlotSelection(slot, dayIndex)}
                                                        >
                                                            {slotTimes[slot]}
                                                        </div>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody> */}
                                </table>
                            </div>

                            <div
                                className={`tab-pane fade ${selectedTab === "linhhoat" ? "show active" : ""}`}
                                id="pills-linhhoat"
                                role="tabpanel"
                                aria-labelledby="linhhoat-tabs"
                            >
                                <div style={{ display: 'flex' }}>
                                    <div style={{ flex: 7 }}>
                                        <table className="table table-borderless">
                                            <thead>
                                                <tr>
                                                    <th>Slot</th>
                                                    {daysOfWeek.map((day, index) => (
                                                        <th key={index}>{day}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.slots.map((slot, slotIndex) => (
                                                    <tr key={slot.slotId}>
                                                        <td>{slot.slotName}</td>
                                                        {daysOfWeek.map((_, dayIndex) => (
                                                            <td key={dayIndex} className="slot-times-column">
                                                                <div
                                                                    className={`slot-time ${this.state.selectedSlots[daysOfWeek[dayIndex]]?.includes(slot.slotId) ? "selected" : ""} ${this.isSlotBooked(daysOfWeek[dayIndex], slot.slotId) ? "booked" : ""}`}
                                                                    onClick={
                                                                        !this.isSlotBooked(daysOfWeek[dayIndex], slot.slotId)
                                                                            ? () => this.handleSlotSelection(slot.slotId, dayIndex)
                                                                            : null
                                                                    }
                                                                >
                                                                    {`${slot.startTime} - ${slot.endTime}`}
                                                                </div>
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div style={{ flex: 3 }}>
                                        {this.state.priceList && <NapGio priceList={this.state.priceList} courtId={this.state.courtId} />}
                                    </div>
                                </div>
                            </div>

                            {errorMessage && (
                                <div className="alert alert-danger" role="alert">
                                    {errorMessage}
                                </div>
                            )}                      
                                <>
                                    <div>
                                        Bạn đã chọn : {selectedSlotDetails.join(", ")}
                                    </div>

                                    <div className="w-25 m-auto">
                                        <button onClick={this.handleButtonClick} className="btn btn-primary">
                                            Đặt sân ngay
                                        </button>
                                    </div>
                                </>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
