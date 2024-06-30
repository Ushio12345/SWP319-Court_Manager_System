import React, { Component } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format, eachDayOfInterval } from "date-fns";
import { vi } from "date-fns/locale";
import axiosInstance from "../../../../config/axiosConfig";

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
        };
    }

    componentDidMount() {
        this.updateDaysOfWeek(this.state.startDate, this.state.endDate);

        if (this.props.court && this.props.court.yards && this.props.court.yards.length > 0) {
            this.setState({ selectedYard: this.props.court.yards[0].yardId });
        } else {
            this.fetchSlots();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.startDate !== this.state.startDate || prevState.endDate !== this.state.endDate) {
            this.updateDaysOfWeek(this.state.startDate, this.state.endDate);
        }

        if (prevState.selectedYard !== this.state.selectedYard) {
            this.fetchSlots();
            this.fetchBookedSlots();
        }
    }

    fetchSlots = () => {
        axiosInstance
            .get(`/yard-schedule/getAllByYardId/${this.state.selectedYard}`)
            .then((response) => {
                this.setState({ slots: response.data });
            })
            .catch((error) => {
                console.error("There was an error fetching the slots!", error);
            });
    };

    fetchBookedSlots = () => {
        const formattedDates = this.state.daysOfWeek.map((day) => day.split(" ")[0]);

        axiosInstance
            .post(`/booking-details/booked-slots/${this.state.selectedYard}`, formattedDates)
            .then((response) => {
                this.setState({ bookedSlots: response.data });
            })
            .catch((error) => {
                console.error("There was an error fetching the slots!", error);
            });
    }

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

        if (selectedTab === "lichdon") {
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
        } else if (selectedTab === "codinh" || selectedTab === "linhhoat") {
            newSelectedSlots[dayKey] = [slot];
            this.setState({
                selectedSlots: newSelectedSlots,
                selectedDay: dayIndex,
                errorMessage: "",
            });
        }
    };

    handleButtonClick = () => {
        window.location.href = "/detailBooking";
    };

    handleYardChange = (event) => {
        this.setState({ selectedYard: event.target.value });
    };

    isSlotBooked = (dayKey, slotId) => {
        const { bookedSlots } = this.state;
        const formattedDayKey = dayKey.split(" ")[0]; 

        if (!bookedSlots[formattedDayKey] || bookedSlots[formattedDayKey].length === 0) {
            return false;
        }

        return bookedSlots[formattedDayKey].some((slot) => slot.slotId === slotId);
    };
    
    

    render() {
        const { court } = this.props;
        const { startDate, endDate, daysOfWeek, selectedTab, selectedSlots, errorMessage } = this.state;

        const slotTimes = {
            "Slot 1": "7:30 - 8:30",
            "Slot 2": "8:30 - 9:30",
            "Slot 3": "9:30 - 10:30",
            "Slot 4": "10:30 - 11:30",
        };

        const selectedSlotDetails = Object.entries(selectedSlots).flatMap(([day, slots]) =>
            slots.map((slot) => `${day} - ${slot}: ${slotTimes[slot]}`)
        );

        return (
            <div className="">
                <form className="order">
                    <div className="select-slot p-3">
                        <div className="date-picker-container mb-3">
                            <label>Từ ngày: </label>
                            <DatePicker
                                selected={startDate}
                                onChange={this.handleStartDateChange}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                dateFormat="dd/MM/yyyy"
                                locale="vi"
                                className="p-2 me-4"
                            />
                            <label>Đến ngày: </label>
                            <DatePicker
                                selected={endDate}
                                onChange={this.handleEndDateChange}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                dateFormat="dd/MM/yyyy"
                                locale="vi"
                                className="p-2 me-4"
                            />
                        </div>

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
                            <div className="schedual"></div>
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
                                                        <div
                                                            className={`slot-time ${
                                                                selectedSlots[daysOfWeek[dayIndex]]?.includes(slot.slotId) ? "selected" : ""
                                                            } ${this.isSlotBooked(daysOfWeek[dayIndex], slot.slotId) ? "booked" : ""}`}
                                                            onClick={() => this.handleSlotSelection(slot.slotId, dayIndex)}
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
                                    <tbody>
                                        {Object.keys(slotTimes).map((slot, slotIndex) => (
                                            <tr key={slotIndex}>
                                                <td>{slot}</td>
                                                {daysOfWeek.map((_, dayIndex) => (
                                                    <td key={dayIndex} className="slot-times-column">
                                                        <div
                                                            className={`slot-time ${
                                                                selectedSlots[this.state.daysOfWeek[dayIndex]]?.includes(slot) ? "selected" : ""
                                                            }`}
                                                            onClick={() => this.handleSlotSelection(slot, dayIndex)}
                                                        >
                                                            {slotTimes[slot]}
                                                        </div>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div
                                className={`tab-pane fade ${selectedTab === "linhhoat" ? "show active" : ""}`}
                                id="pills-linhhoat"
                                role="tabpanel"
                                aria-labelledby="linhhoat-tabs"
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
                                        {Object.keys(slotTimes).map((slot, slotIndex) => (
                                            <tr key={slotIndex}>
                                                <td>{slot}</td>
                                                {daysOfWeek.map((_, dayIndex) => (
                                                    <td key={dayIndex} className="slot-times-column">
                                                        <div
                                                            className={`slot-time ${
                                                                selectedSlots[this.state.daysOfWeek[dayIndex]]?.includes(slot) ? "selected" : ""
                                                            }`}
                                                            onClick={() => this.handleSlotSelection(slot, dayIndex)}
                                                        >
                                                            {slotTimes[slot]}
                                                        </div>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {errorMessage && (
                                <div className="alert alert-danger" role="alert">
                                    {errorMessage}
                                </div>
                            )}
                            <div>
                                Bạn đã chọn : {selectedTab === "lichdon" ? "Lịch đơn" : selectedTab === "codinh" ? "Lịch cố định" : "Lịch linh hoạt"}{" "}
                                - Slot: {selectedSlotDetails.join(", ")}
                            </div>
                            <div className="w-25 m-auto">
                                <button onClick={this.handleButtonClick} className="btn btn-primary">
                                    Đặt sân ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
