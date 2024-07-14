import React, { Component } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format, eachDayOfInterval, parse, differenceInHours } from "date-fns";
import { sl, vi } from "date-fns/locale";
import axiosInstance from "../../config/axiosConfig";
import { showAlert } from "../../utils/alertUtils";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "../playing-schedule/index.css";
import { Button, Modal } from "react-bootstrap";

// Register the Vietnamese locale with react-datepicker
registerLocale("vi", vi);

export default class PlayingSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courtOfStaff: null,
            startDate: new Date(),
            endDate: addDays(new Date(), 6),
            daysOfWeek: [],
            slots: [
                {
                    "slotId": "TL0000044",
                    "slotName": "Slot 1",
                    "startTime": "07:30",
                    "endTime": "08:00",
                    "userId": "U0000027"
                },
                {
                    "slotId": "TL0000045",
                    "slotName": "Slot 2",
                    "startTime": "08:00",
                    "endTime": "09:00",
                    "userId": "U0000027"
                },
                {
                    "slotId": "TL0000046",
                    "slotName": "Slot 3",
                    "startTime": "09:00",
                    "endTime": "10:00",
                    "userId": "U0000027"
                },
                {
                    "slotId": "TL0000047",
                    "slotName": "Slot 4",
                    "startTime": "10:00",
                    "endTime": "11:00",
                    "userId": "U0000027"
                },
                {
                    "slotId": "TL0000048",
                    "slotName": "Slot 5",
                    "startTime": "11:00",
                    "endTime": "12:00",
                    "userId": "U0000027"
                },
                {
                    "slotId": "TL0000049",
                    "slotName": "Slot 6",
                    "startTime": "12:00",
                    "endTime": "13:00",
                    "userId": "U0000027"
                },
                {
                    "slotId": "TL0000050",
                    "slotName": "Slot 7",
                    "startTime": "13:00",
                    "endTime": "14:00",
                    "userId": "U0000027"
                },
                {
                    "slotId": "TL0000051",
                    "slotName": "Slot 8",
                    "startTime": "14:00",
                    "endTime": "15:00",
                    "userId": "U0000027"
                },
                {
                    "slotId": "TL0000052",
                    "slotName": "Slot 9",
                    "startTime": "15:00",
                    "endTime": "16:00",
                    "userId": "U0000027"
                },
                {
                    "slotId": "TL0000053",
                    "slotName": "Slot 10",
                    "startTime": "16:00",
                    "endTime": "17:00",
                    "userId": "U0000027"
                },
                {
                    "slotId": "TL0000054",
                    "slotName": "Slot 11",
                    "startTime": "17:00",
                    "endTime": "18:00",
                    "userId": "U0000027"
                },
                {
                    "slotId": "TL0000055",
                    "slotName": "Slot 12",
                    "startTime": "18:00",
                    "endTime": "19:00",
                    "userId": "U0000027"
                },
                {
                    "slotId": "TL0000056",
                    "slotName": "Slot 13",
                    "startTime": "19:00",
                    "endTime": "20:00",
                    "userId": "U0000027"
                },
                {
                    "slotId": "TL0000057",
                    "slotName": "Slot 14",
                    "startTime": "20:00",
                    "endTime": "21:00",
                    "userId": "U0000027"
                },
                {
                    "slotId": "TL0000193",
                    "slotName": "Slot 15",
                    "startTime": "21:00",
                    "endTime": "22:00",
                    "userId": "U0000027"
                }
            ],
            waitingCheckInSlots: [],
            pendingSlots: [],
            completedSlots: [],
            cancelledSlots: [],
            selectedSlots: {},
            isLoggedIn: false,
            currentDate: new Date(),
            showModal: false,
            user: "",
            selectedSlotInfo: null,
            selectedCourtInfo: null,
            selectedFeedbackInfo: null,
            bookingDetails: null,
            isLoggedIn: false,
            user: {
                username: "",
                avatar: "",
                roles: [],
            },
            rating: 5,
            comment: "Good",
            isRated: false
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
                    roles: user.roles,
                },
            });
        }

        this.updateDaysOfWeek(this.state.startDate, this.state.endDate);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.startDate !== this.state.startDate || prevState.endDate !== this.state.endDate) {
            this.updateDaysOfWeek(this.state.startDate, this.state.endDate);
        }

        if (prevState.daysOfWeek !== this.state.daysOfWeek) {
            this.fetchStatusSlots('WAITING_FOR_CHECK_IN', 'waitingCheckInSlots');
            this.fetchStatusSlots('COMPLETED', 'completedSlots');
            this.fetchStatusSlots('CANCELLED', 'cancelledSlots');
        }
    }

    fetchStatusSlots = (status, list) => {

        const formattedDates = this.state.daysOfWeek.map((day) => day.split(" ")[0]);

        axiosInstance
            .post(`/booking/${status}/slots`, formattedDates)
            .then((response) => {
                this.setState({ [list]: response.data });
            })
            .catch((error) => {
                console.error("There was an error fetching the slots!", error);
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

    isWaitingCheckInSlot = (dayKey, slotId) => {
        const { waitingCheckInSlots } = this.state;

        const parsedDate = parse(dayKey.split(" ")[0], "dd/MM/yyyy", new Date());
        const formattedDayKey = format(parsedDate, "yyyy-MM-dd");

        if (!waitingCheckInSlots[formattedDayKey] || waitingCheckInSlots[formattedDayKey].length === 0) {
            return false;
        }

        return waitingCheckInSlots[formattedDayKey].some((checkInDto) => checkInDto.bookingDetails.yardSchedule.slot.slotId === slotId);
    };

    isCompletedSlot = (dayKey, slotId) => {
        const { completedSlots } = this.state;

        const parsedDate = parse(dayKey.split(" ")[0], "dd/MM/yyyy", new Date());
        const formattedDayKey = format(parsedDate, "yyyy-MM-dd");

        if (!completedSlots[formattedDayKey] || completedSlots[formattedDayKey].length === 0) {
            return false;
        }

        return completedSlots[formattedDayKey].some((checkInDto) => checkInDto.bookingDetails.yardSchedule.slot.slotId === slotId);
    };

    isCancelledSlot = (dayKey, slotId) => {
        const { cancelledSlots } = this.state;

        const parsedDate = parse(dayKey.split(" ")[0], "dd/MM/yyyy", new Date());
        const formattedDayKey = format(parsedDate, "yyyy-MM-dd");

        if (!cancelledSlots[formattedDayKey] || cancelledSlots[formattedDayKey].length === 0) {
            return false;
        }

        return cancelledSlots[formattedDayKey].some((checkInDto) => checkInDto.bookingDetails.yardSchedule.slot.slotId === slotId);
    };


    isPastTime(day, startTime, slot) {
        const currentTime = new Date();
        const [startHour, startMinute] = startTime.split(":").map(Number);
        const slotStartTime = new Date(currentTime);
        slotStartTime.setHours(startHour, startMinute, 0, 0);

        const { bookingDetailsList } = this.state;

        // Parse and format day to match the format used in bookingDetailsList
        const parsedDate = parse(day?.split(" ")[0], "dd/MM/yyyy", new Date());
        const formattedDayKey = format(parsedDate, "yyyy-MM-dd");

        // Check if there are any bookings for the formatted day
        if (!bookingDetailsList[formattedDayKey] || bookingDetailsList[formattedDayKey].length === 0) {
            return slotStartTime < currentTime;
        }

        // Find the matching bookingDetails based on slotId
        const matchedCheckIn = bookingDetailsList[formattedDayKey].find(checkInDto => checkInDto?.bookingDetails?.yardSchedule?.slot?.slotId === slot.slotId);
        if (!matchedCheckIn) {
            console.error('No matching checkInDto found for the given slot');
            return slotStartTime < currentTime;
        }

        // Get the status from the found bookingDetails
        const status = matchedCheckIn.bookingDetails.status;

        // Do not apply pastTime if the status is pending, waiting-check-in, or completed
        if (status === 'Đang chờ xử lý' || status === 'Đã hoàn thành' || status === 'Đã hủy') {
            return false;
        }

        // Otherwise, check if the slotStartTime is in the past relative to currentTime
        return slotStartTime < currentTime;
    }

    isToday(day) {
        const parsedDate = parse(day.split(" ")[0], "dd/MM/yyyy", new Date());
        const formattedDayKey = format(parsedDate, "yyyy-MM-dd");
        const today = new Date();
        const formattedToday = format(today, "yyyy-MM-dd");
        return formattedToday === formattedDayKey;
    }

    handleShowModal = (status, slot, day) => {
        const { waitingCheckInSlots, completedSlots, cancelledSlots } = this.state;

        const parsedDate = parse(day?.split(" ")[0], "dd/MM/yyyy", new Date());
        const formattedDayKey = format(parsedDate, "yyyy-MM-dd");

        let matchedplayingScheduleDto = null;

        // Duyệt qua danh sách tương ứng với trạng thái
        switch (status) {
            case "waiting-check-in":
                matchedplayingScheduleDto = waitingCheckInSlots[formattedDayKey]?.find((playingScheduleDto) => playingScheduleDto.bookingDetails.yardSchedule.slot.slotId === slot.slotId);
                break;
            case "completed":
                matchedplayingScheduleDto = completedSlots[formattedDayKey]?.find((playingScheduleDto) => playingScheduleDto.bookingDetails.yardSchedule.slot.slotId === slot.slotId);
                break;
            case "cancel":
                matchedplayingScheduleDto = cancelledSlots[formattedDayKey]?.find((playingScheduleDto) => playingScheduleDto.bookingDetails.yardSchedule.slot.slotId === slot.slotId);
                break;
            default:
                console.error('Unknown status:', status);
                return;
        }

        if (matchedplayingScheduleDto) {
            const court = matchedplayingScheduleDto.court;
            const bookingDetailsFound = matchedplayingScheduleDto.bookingDetails;
            const feedback = null;

            if (matchedplayingScheduleDto.feedback) {
                feedback = matchedplayingScheduleDto.feedback;
            }
            this.setState({ showModal: true, selectedCourtInfo: court, selectedSlotInfo: slot, bookingDetails: bookingDetailsFound, selectedFeedbackInfo: feedback });
        } else {
            console.error('No matching checkInDto found for the given slot');
        }
    };


    handleCloseModal = () => {
        this.setState({ showModal: false, selectedCustomer: null });
    };


    handleLogout = () => {
        localStorage.removeItem("user");

        this.setState({
            isLoggedIn: false,
            user: {
                username: "",
                avatar: "",
                roles: [],
            },
        });

        window.location.href = "/";
    };

    handleCancelCheckIn = async (detailId) => {
        try {
            const confirmResponse = await axiosInstance.post(`/booking-details/${detailId}/cancel`);
            if (confirmResponse.data.message === 'Hủy đơn thành công') {
                showAlert('success', 'Thông báo', 'Đã hủy đơn thành công !', 'top-end');
                this.handleCloseModal();
                this.fetchStatusSlots('WAITING_FOR_CHECK_IN', 'waitingCheckInSlots');
                this.fetchStatusSlots('COMPLETED', 'completedSlots');
                this.fetchStatusSlots('CANCELLED', 'cancelledSlots');
            } else {
                showAlert('error', 'Thông báo', 'Hủy đơn không thành công !', 'top-end')
            }
        } catch (error) {
            console.error('Failed to cancel', error);
        }
    }

    handleRatingClick = (rating) => {
        this.setState({ rating, isRated: true });
    };

    handleCommentChange = (event) => {
        this.setState({ comment: event.target.value });
    };

    handleSubmitRating = () => {
        // Logic to handle submission of rating and comment
        console.log(`Rating: ${this.state.rating}, Comment: ${this.state.comment}`);
    };

    handlePreviousWeek = () => {
        const { startDate, endDate } = this.state;
        const newStartDate = addDays(startDate, -7);
        const newEndDate = addDays(endDate, -7);

        this.setState({ startDate: newStartDate, endDate: newEndDate });
    };

    handleNextWeek = () => {
        const { startDate, endDate } = this.state;
        const newStartDate = addDays(startDate, 7);
        const newEndDate = addDays(endDate, 7);

        this.setState({ startDate: newStartDate, endDate: newEndDate });
    };


    render() {
        const { daysOfWeek, isLoggedIn, user } = this.state;

        return (
            <div className="playing-schedule-page">
                <Header isLoggedIn={isLoggedIn} user={user} handleLogout={this.handleLogout} />
                <section className="form-booking">
                    <div className="booking row">
                        <div className="col-lg-12">
                            <div className="">
                                <div className="week-navigation">
                                    {/* Nút để lùi về tuần trước */}
                                    <button className="navigation-button" onClick={this.handlePreviousWeek}>Tuần trước</button>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <div className="btn slot-time completed" style={{ width: '100px', height: '40px', alignContent: 'center' }}><b>Đã chơi</b></div>
                                        <div className="btn slot-time waiting-check-in" style={{ width: '100px', height: '40px', alignContent: 'center' }}><b>Chờ check-in</b></div>
                                        <div className="btn slot-time cancel" style={{ width: '100px', height: '40px', alignContent: 'center' }}><b>Đã hủy</b></div>
                                    </div>
                                    {/* Nút để next sang tuần sau */}
                                    <button className="navigation-button" onClick={this.handleNextWeek}>Tuần sau</button>
                                </div>
                                <form className="order row">
                                    <div className="select-slot p-3">
                                        <div className="tab-content" id="pills-tabContent">
                                            <div
                                                id="pills-lichdon"
                                                role="tabpanel"
                                                aria-labelledby="lichdon"
                                            >
                                                <div className="overflow-x-auto">
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
                                                            {this.state.slots.map((slot) => (
                                                                <tr key={slot.slotId}>
                                                                    <td>{slot.slotName}</td>
                                                                    {daysOfWeek.map((day, dayIndex) => {
                                                                        const isWaitingCheckIn = this.isWaitingCheckInSlot(day, slot.slotId);
                                                                        const isCompleted = this.isCompletedSlot(day, slot.slotId);
                                                                        const isCancelled = this.isCancelledSlot(day, slot.slotId);

                                                                        const status = isWaitingCheckIn ? "waiting-check-in" :
                                                                            isCompleted ? "completed" :
                                                                                isCancelled ? "cancel" : null;

                                                                        return (
                                                                            <td key={dayIndex} className="slot-times-column">
                                                                                <div
                                                                                    className={`slot-time ${isWaitingCheckIn ? "waiting-check-in" : ""}
                                                                                                          ${isCompleted ? "completed" : ""}
                                                                                                          ${isCancelled ? "cancel" : ""}`}
                                                                                    onClick={() => this.handleShowModal(status, slot, daysOfWeek[dayIndex])}
                                                                                >
                                                                                    {(isWaitingCheckIn || isCompleted || isCancelled) ? (
                                                                                        `${slot.startTime} - ${slot.endTime}`
                                                                                    ) : (
                                                                                        ""
                                                                                    )}
                                                                                </div>
                                                                            </td>
                                                                        );
                                                                    })}
                                                                </tr>
                                                            ))}
                                                        </tbody>

                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <Modal
                                    show={this.state.showModal}
                                    onHide={() => this.setState({ showModal: false })}
                                    centered
                                    dialogClassName="modal-card"
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Thông tin chi tiết</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="modal-body-ticket">


                                            <div className="checkin-info">
                                                <h4>{this.state.selectedCourtInfo?.courtName}</h4>
                                                <b>Ngày check-in: </b> {this.state.bookingDetails?.date} <br />
                                                <b>Sân: </b> {this.state.bookingDetails?.yardSchedule?.yard?.yardName} <br />
                                                <b>Slot: </b> {this.state.selectedSlotInfo?.slotName} <br />
                                                <b>Thời gian: </b> {this.state.selectedSlotInfo?.startTime} - {this.state.selectedSlotInfo?.endTime} <br />
                                            </div>
                                            <div className="court-info">
                                                <img src={this.state.selectedCourtInfo?.image} alt="Court" />
                                                <i className="fa-solid fa-location-dot" style={{ color: 'red' }}></i> <b>{this.state.selectedCourtInfo?.address}</b>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        {this.state.bookingDetails?.status === 'Đang chờ check-in' && (
                                            <Button variant="danger" onClick={() => this.handleCancelCheckIn(this.state.bookingDetails?.detailId)}>
                                                Hủy đơn
                                            </Button>
                                        )}
                                        <Button variant="secondary" onClick={() => this.setState({ showModal: false })}>
                                            Đóng
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>

        );
    }
}
