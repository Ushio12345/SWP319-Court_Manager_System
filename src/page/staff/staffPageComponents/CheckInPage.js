import React, { Component } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format, eachDayOfInterval, parse, differenceInHours } from "date-fns";
import { vi } from "date-fns/locale";
import "../../customer/bookingPage/formBooking/slot.css";
import "../../../css/style.css";
import axiosInstance from "../../../config/axiosConfig";
import { Button, Modal } from "react-bootstrap";
import { showAlert } from "../../../utils/alertUtils";

// Register the Vietnamese locale with react-datepicker
registerLocale("vi", vi);

export default class CheckInPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courts: [],
            startDate: new Date(),
            endDate: addDays(new Date(), 6),
            daysOfWeek: [],
            selectedTab: "lichdon",
            slots: [],
            waitingCheckInSlots: [],
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
            flexibleBookings: [],
            availableHours: "",
            priceBoard: [],
            selectedSlotInfo: null,
            selectedCustomer: null,
            bookingDetails: null
        };
    }

    componentDidMount() {
        this.updateDaysOfWeek(this.state.startDate, this.state.endDate);
        this.fetchCourts();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.startDate !== this.state.startDate || prevState.endDate !== this.state.endDate) {
            this.updateDaysOfWeek(this.state.startDate, this.state.endDate);
        }

        if (prevState.selectedYard !== this.state.selectedYard) {
            this.fetchSlots();
            this.fetchWaitingCheckInSlots();
        }
    }

    fetchCourts = () => {
        axiosInstance
            .get("/court/courts-of-staff")
            .then((res) => {
                if (res.status === 200) {
                    const firstCourt = res.data[0];
                    const firstYardId = firstCourt?.yards?.[0]?.yardId || "";
                    this.setState(
                        {
                            courts: res.data,
                            selectedCourt: firstCourt.courtId,
                            selectedCourtName: firstCourt.courtName,
                            court: firstCourt,
                            selectedYard: firstYardId
                        },
                        () => {
                            if (firstYardId) {
                                this.fetchSlots();
                            }
                        }
                    );
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    fetchSlots = () => {
        if (!this.state.selectedYard) {
            this.setState({ slots: [] }); // Clear slots if no yard is selected
            return;
        }

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

    fetchWaitingCheckInSlots = () => {
        const formattedDates = this.state.daysOfWeek.map((day) => day.split(" ")[0]);

        axiosInstance
            .post(`/booking-details/waiting-check-in-slots/${this.state.selectedYard}`, formattedDates)
            .then((response) => {
                this.setState({ waitingCheckInSlots: response.data });
            })
            .catch((error) => {
                console.error("There was an error fetching the waiting check in slots!", error);
            });
    };

    fetchBookedSlots = () => {
        const formattedDates = this.state.daysOfWeek.map((day) => day.split(" ")[0]);

        console.log("Fetching booked slots for dates:", formattedDates); // Log dates

        axiosInstance
            .post(`/booking-details/booked-slots/${this.state.selectedYard}`, formattedDates)
            .then((response) => {
                this.setState({ bookedSlots: response.data });
            })
            .catch((error) => {
                console.error("There was an error fetching the booked slots!", error);
            });
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
        const courtSelected = this.state.courts.find(court => court.courtId === courtId);
        const firstYardId = courtSelected?.yards?.[0]?.yardId || "";

        this.setState({
            selectedCourt: courtId,
            selectedCourtName: courtName,
            court: courtSelected,
            selectedYard: firstYardId,
            slots: [],
        }, () => {
            if (firstYardId) {
                this.fetchSlots();
            }
        });
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
    renderCourtOption = () => {
        return this.state.courts.map((court) => (
            <option key={court.courtId} value={court.courtId}>
                {court.courtName}
            </option>
        ));
    };

    handleYardChange = (event) => {
        this.setState({ selectedYard: event.target.value });
    };

    isWaitingCheckInSlot = (dayKey, slotId) => {
        const { waitingCheckInSlots } = this.state;

        const parsedDate = parse(dayKey.split(" ")[0], "dd/MM/yyyy", new Date());
        const formattedDayKey = format(parsedDate, "yyyy-MM-dd");

        if (!waitingCheckInSlots[formattedDayKey] || waitingCheckInSlots[formattedDayKey].length === 0) {
            return false;
        }

        return waitingCheckInSlots[formattedDayKey].some((checkInDto) => checkInDto.bookingDetails.yardSchedule.slot.slotId === slotId);
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

    isPastTime(startTime) {
        const currentTime = new Date();
        const [startHour, startMinute] = startTime.split(":").map(Number);
        const slotStartTime = new Date(currentTime);
        slotStartTime.setHours(startHour, startMinute, 0, 0);

        return slotStartTime < currentTime;
    }

    isToday(day) {
        const parsedDate = parse(day.split(" ")[0], "dd/MM/yyyy", new Date());
        const formattedDayKey = format(parsedDate, "yyyy-MM-dd");
        const today = new Date();
        const formattedToday = format(today, "yyyy-MM-dd");
        return formattedToday === formattedDayKey;
    }

    handleSlotSelection = (slotId, dayIndex) => {
        const { slots, daysOfWeek } = this.state;
        const selectedSlot = slots.find((slot) => slot.slotId === slotId);
        const selectedDay = daysOfWeek[dayIndex];

        // You can fetch player info or other relevant details based on slotId and dayIndex
        // For now, store slot info in state and show modal
        this.setState({
            selectedSlotInfo: {
                slotId: slotId,
                day: selectedDay,
                slotName: selectedSlot.slotName,
                startTime: selectedSlot.startTime,
                endTime: selectedSlot.endTime,
                // Add more fields as needed
            },
            showModal: true,
        });
    };

    handleShowModal = (slot, day) => {
        const { waitingCheckInSlots } = this.state;

        const parsedDate = parse(day.split(" ")[0], "dd/MM/yyyy", new Date());
        const formattedDayKey = format(parsedDate, "yyyy-MM-dd");

        if (!waitingCheckInSlots[formattedDayKey] || waitingCheckInSlots[formattedDayKey].length === 0) {
            return;
        }

        const matchedCheckIn = waitingCheckInSlots[formattedDayKey]?.find((checkInDto) => checkInDto?.bookingDetails?.yardSchedule?.slot?.slotId === slot.slotId);

        if (matchedCheckIn) {
            const customer = matchedCheckIn.customer;
            const bookingDetailsFound = matchedCheckIn.bookingDetails;
            this.setState({ showModal: true, selectedCustomer: customer, selectedSlotInfo: slot, bookingDetails: bookingDetailsFound });
        } else {
            console.error('No matching checkInDto found for the given slot');
        }
    };

    handleCloseModal = () => {
        this.setState({ showModal: false, selectedCustomer: null });
    };

    handleCheckIn = async (detailId) => {
        try {
            const confirmResponse = await axiosInstance.post(`/booking-details/${detailId}/check-in`);
            if (confirmResponse.data.message === 'Check-in thành công') {
                showAlert('success', 'Thông báo', 'Check-in thành công !', 'top-end');
                this.handleCloseModal();
                this.fetchWaitingCheckInSlots(); // Fetch waiting check-in slots again
                this.fetchSlots(); // Fetch all slots again
            } else {
                showAlert('error', 'Thông báo', 'Check-in không thành công !', 'top-end')
            }
        } catch (error) {
            console.error('Failed to check-in', error);
        }
    };

    render() {
        const { court } = this.props;
        const { startDate, endDate, daysOfWeek, selectedTab, selectedSlots, errorMessage, slots } = this.state;
        const selectedSlotDetails = Object.entries(selectedSlots).flatMap(([day, slotIds]) =>
            slotIds.map((slotId) => {
                const slot = slots.find((s) => s.slotId === slotId); // Tìm slot theo slotId
                return `${slot ? slot.slotName : "Unknown Slot"}`; // Kiểm tra nếu slot tồn tại
            })
        );

        return (
            <div className="">
                <form className="order row">
                    {console.log(this.state.selectedSlotInfo)}
                    <div className="select-slot p-3">
                        <div className="orderPage-body">
                            <div className="select-court d-flex" style={{ alignItems: "center" }}>
                                <label className="me-3">Chọn cơ sở: </label>
                                <select className="" style={{ height: 40 }} onChange={this.handleCourtChange}>
                                    {this.renderCourtOption()}
                                </select>
                            </div>
                            <select
                                className="form-select my-3"
                                aria-label="Default select example"
                                value={this.state.selectedYard}
                                onChange={this.handleYardChange}
                            >
                                <option value="">Chọn sân</option>
                                {this.state.court?.yards
                                    ?.slice() // Create a shallow copy to avoid mutating the original array
                                    .sort((a, b) => a.yardName.localeCompare(b.yardName)) // Sort by yardName in ascending order
                                    .map((yard, index) => (
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
                                                {daysOfWeek?.map((day, index) => (
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
                                                                className={`slot-time ${selectedSlots[daysOfWeek[dayIndex]]?.includes(slot.slotId) ? "selected" : ""
                                                                    } ${this.isWaitingCheckInSlot(daysOfWeek[dayIndex], slot.slotId) ? "waiting-checkIn" : "normal"} ${this.isToday(daysOfWeek[dayIndex]) && this.isPastTime(slot.startTime)
                                                                        ? "pastTime"
                                                                        : ""
                                                                    }`}
                                                                onClick={
                                                                    this.isWaitingCheckInSlot(daysOfWeek[dayIndex], slot.slotId) &&
                                                                        !(this.isToday(daysOfWeek[dayIndex]) && this.isPastTime(slot.startTime))
                                                                        ? () => this.handleShowModal(slot, daysOfWeek[dayIndex])
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
                            </div>
                        </div>
                    </div>
                </form>
                <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Thông tin check-in</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <b>Khách hàng: </b> {this.state.selectedCustomer?.fullName} <br />
                        <b>Email: </b> {this.state.selectedCustomer?.email} <br />
                        <b>Ngày check-in: </b> {this.state.bookingDetails?.date} <br />
                        <b>Sân: </b> {this.state.bookingDetails?.yardSchedule?.yard?.yardName} <br />
                        <b>Slot: </b> {this.state.selectedSlotInfo?.slotName}<br />
                        <b>Thời gian: </b> {this.state.selectedSlotInfo?.startTime} - {this.state.selectedSlotInfo?.endTime} <br />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ showModal: false })}>
                            Đóng
                        </Button>
                        <Button variant="primary" onClick={() => this.handleCheckIn(this.state.bookingDetails?.detailId)}>
                            Check-in
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
