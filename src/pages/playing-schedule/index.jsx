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
import "../../css/style.css";
import "../../page/staff/staff.css";

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
            bookingDetails: [],
            bookingDetailsList: [],
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
            facilities: [],
            isLoggedIn: false,
            user: {
                username: "",
                avatar: "",
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
                    roles: user.roles,
                },
            });
        }

        this.updateDaysOfWeek(this.state.startDate, this.state.endDate);
        this.fetchCourts();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.startDate !== this.state.startDate || prevState.endDate !== this.state.endDate) {
            this.updateDaysOfWeek(this.state.startDate, this.state.endDate);
        }

        if (prevState.selectedYard !== this.state.selectedYard) {
            this.fetchSlots();
            this.fetchBookingDetails();
            this.fetchStatusSlots('PENDING', 'pendingSlots');
            this.fetchStatusSlots('WAITING_FOR_CHECK_IN', 'waitingCheckInSlots');
            this.fetchStatusSlots('COMPLETED', 'completedSlots');
            this.fetchStatusSlots('CANCELLED', 'cancelledSlots');
        }
    }

    fetchCourts = () => {
        axiosInstance
            .get("/court/court-of-staff")
            .then((res) => {
                if (res.status === 200) {
                    const courtOfStaff = res.data;
                    const firstYardId = courtOfStaff?.yards?.[0]?.yardId || "";
                    this.setState(
                        {
                            courtOfStaff: res.data,
                            selectedYard: firstYardId,
                        },
                        () => {
                            if (firstYardId) {
                                this.fetchSlots();
                            }

                            if (courtOfStaff) {
                                this.fetchFacilities();
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

    fetchFacilities = () => {
        axiosInstance.get(`court/facilities-of-court/${this.state.courtOfStaff.courtId}`)
            .then(response => {
                this.setState({ facilities: response.data });
            })
            .catch(error => {
                console.error("There was an error fetching the facilities!", error);
            });
    }

    fetchStatusSlots = (status, list) => {
        const formattedDates = this.state.daysOfWeek.map((day) => day.split(" ")[0]);

        axiosInstance
            .post(`/booking-details/${status}/slots/${this.state.selectedYard}`, formattedDates)
            .then((response) => {
                this.setState({ [list]: response.data });
            })
            .catch((error) => {
                console.error("There was an error fetching the booked slots!", error);
            });
    };

    fetchBookingDetails = () => {
        const formattedDates = this.state.daysOfWeek.map((day) => day.split(" ")[0]);

        axiosInstance
            .post(`/booking-details/${this.state.selectedYard}`, formattedDates)
            .then((response) => {
                this.setState({ bookingDetailsList: response.data });
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

    isCompletedSlot = (dayKey, slotId) => {
        const { completedSlots } = this.state;

        const parsedDate = parse(dayKey.split(" ")[0], "dd/MM/yyyy", new Date());
        const formattedDayKey = format(parsedDate, "yyyy-MM-dd");

        if (!completedSlots[formattedDayKey] || completedSlots[formattedDayKey].length === 0) {
            return false;
        }

        return completedSlots[formattedDayKey].some((checkInDto) => checkInDto.bookingDetails.yardSchedule.slot.slotId === slotId);
    };

    isPendingSlot = (dayKey, slotId) => {
        const { pendingSlots } = this.state;

        const parsedDate = parse(dayKey.split(" ")[0], "dd/MM/yyyy", new Date());
        const formattedDayKey = format(parsedDate, "yyyy-MM-dd");

        if (!pendingSlots[formattedDayKey] || pendingSlots[formattedDayKey].length === 0) {
            return false;
        }

        return pendingSlots[formattedDayKey].some((checkInDto) => checkInDto.bookingDetails.yardSchedule.slot.slotId === slotId);
    };

    isCancelledSLot = (dayKey, slotId) => {
        const { cancelledSlots } = this.state;

        const parsedDate = parse(dayKey.split(" ")[0], "dd/MM/yyyy", new Date());
        const formattedDayKey = format(parsedDate, "yyyy-MM-dd");

        if (!cancelledSlots[formattedDayKey] || cancelledSlots[formattedDayKey].length === 0) {
            return false;
        }

        return cancelledSlots[formattedDayKey].some((checkInDto) => checkInDto.bookingDetails.yardSchedule.slot.slotId === slotId);
    };

    getStatusClass = (dayKey, slotId) => {
        const { bookingDetails } = this.state;

        const parsedDate = parse(dayKey.split(" ")[0], "dd/MM/yyyy", new Date());
        const formattedDayKey = format(parsedDate, "yyyy-MM-dd");

        if (!bookingDetails[formattedDayKey] || bookingDetails[formattedDayKey].length === 0) {
            return false;
        }


        // Tìm bookingDetails có slotId trùng khớp
        const checkInDto = bookingDetails[formattedDayKey]?.find(
            (checkInDto) => checkInDto.bookingDetails.yardSchedule.slot.slotId === slotId
        );

        console.log("CheckInDto: ", checkInDto)

        if (!checkInDto) {
            return null;
        }

        const bookingDetail = checkInDto.bookingDetails.find(
            (detail) => detail.yardSchedule.slot.slotId === slotId
        );

        if (!bookingDetail) {
            return null; // Return null if no bookingDetail matches the slotId
        }

        // Kiểm tra trạng thái của bookingDetail
        switch (bookingDetail.status) {
            case 'Đang chờ xử lý':
                return 'pending';
            case 'Đang chờ check-in':
                return 'waiting-check-in';
            case 'Đã hoàn thành':
                return 'completed';
            default:
                return null; // Trả về null hoặc giá trị thích hợp khác nếu trạng thái không khớp
        }

    }

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
        const { bookingDetailsList } = this.state;

        const parsedDate = parse(day?.split(" ")[0], "dd/MM/yyyy", new Date());
        const formattedDayKey = format(parsedDate, "yyyy-MM-dd");

        if (!bookingDetailsList[formattedDayKey] || bookingDetailsList[formattedDayKey].length === 0) {
            return;
        }

        const matchedCheckIn = bookingDetailsList[formattedDayKey]?.find((checkInDto) => checkInDto?.bookingDetails?.yardSchedule?.slot?.slotId === slot.slotId);

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
                this.fetchSlots();
                this.fetchBookingDetails();
                this.fetchStatusSlots('PENDING', 'pendingSlots');
                this.fetchStatusSlots('WAITING_FOR_CHECK_IN', 'waitingCheckInSlots');
                this.fetchStatusSlots('COMPLETED', 'completedSlots');
                this.fetchStatusSlots('CANCELLED', 'cancelledSlots');
            } else {
                showAlert('error', 'Thông báo', 'Check-in không thành công !', 'top-end')
            }
        } catch (error) {
            console.error('Failed to check-in', error);
        }
    };

    handleCancelCheckIn = async (detailId) => {
        try {
            const confirmResponse = await axiosInstance.post(`/booking-details/${detailId}/cancel`);
            if (confirmResponse.data.message === 'Hủy đơn thành công') {
                showAlert('success', 'Thông báo', 'Đã hủy đơn thành công !', 'top-end');
                this.handleCloseModal();
                this.fetchSlots();
                this.fetchBookingDetails();
                this.fetchStatusSlots('PENDING', 'pendingSlots');
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

    render() {
        const { daysOfWeek, isLoggedIn, user } = this.state;

        return (
            <div className="GuestPage">
                <section className="header">
                    <Header isLoggedIn={isLoggedIn} user={user} handleLogout={this.handleLogout} />
                </section>
                <div>
                    
                    <div className="checkin-form">
                        <form className="order row">
                            <div className="select-slot p-3">
                                <div className="orderPage-body">
                                    <div className="tab-content" id="pills-tabContent">                                      
                                        <div>
                                            <div className="overflow-x-auto tableCheckIn">
                                                <table className="table table-borderless">
                                                    <thead>
                                                        <tr>
                                                            <th className="">Slot</th>
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
                                                                            className="slot-time"
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
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
