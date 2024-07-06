import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Rating from "react-rating-stars-component";
import axiosInstance from "../../../../config/axiosConfig";
import { alert, showConfirmPayment } from "../../../../utils/alertUtils";

const OrderItem = ({ booking, onBookingCancel }) => {
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [court, setCourt] = useState(null);

    useEffect(() => {
        if (booking?.bookingDetails?.length > 0) {
            setCourt(booking.court);   
        }
    }, [booking]);

    const handleCancelBooking = async (bookingId) => {
        try {
        
            showConfirmPayment('Thông báo', 'Bạn có chắc chắn muốn hủy đơn hàng ?', 'warning', 'Chắc chắn rồi', 'Trở lại', 'center')
                .then(async (result) => {
                    if (result.isConfirmed) {
                        const cancelResponse = await axiosInstance.post(`/booking/${bookingId}/cancel`);
                        if (cancelResponse.data.message === 'Đã hủy đơn hàng thành công.') {
                            alert('success', 'Thông báo', 'Hủy đơn hàng thành công !', 'center')
                            onBookingCancel();
                        } else {
                            alert('error', 'Thông báo', 'Hủy đơn hàng không thành công !', 'center')
                        }
                    } 
                })

        } catch (error) {
            console.error('Failed to cancel booking:', error);
        }
    };

    if (!court) {
        return <div>Đang tải...</div>; 
    }

    return (
        <div className="orderItemList">
            <div className="orderItem mt-4">
                <div className="orderItem-header">
                    <div className="nameCourt"><h5>{court.courtName}</h5></div>
                    <div className="status d-flex">
                        <i className="fa-solid fa-stopwatch"></i> {booking.statusEnum}
                    </div>
                </div>
                <div className="orderItem-body">
                    <div className="infor-court py-3">
                        <div className="img-court w-48">
                            <img src={court.imageUrl} alt="court" />
                        </div>
                        <div className="order-detail ms-3">
                            <p><b>Thời gian đặt đơn:</b> {booking.bookingDate}</p>
                            <p className="booking-type"><b>Dạng lịch:</b> {booking.bookingType}</p>
                            <p>
                                <b>Hình thức thanh toán:</b> <i className="fa-brands fa-paypal"></i>
                                <span> PayPal</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="orderItem-footer">
                    <div className="total-price">
                        <b>Tổng tiền:</b> <span>{booking.totalPrice} &#8363;</span>
                    </div>
                </div>
                <div className="orderItem-btn w-50 m-auto">
                    {booking.statusEnum !== "Đã hủy" && (
                        <button className="btn" onClick={() => handleCancelBooking(booking.bookingId)}>Hủy đơn</button>
                    )}
                    <button className="btn" onClick={() => setShowModal(true)}>
                        Chi tiết đơn
                    </button>
                </div>

                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Chi tiết đơn</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {booking.statusEnum && booking.bookingDetails.length > 0 && (
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th>Slot</th>
                                        <th>Ngày check-in</th>
                                        <th>Sân</th>
                                        <th>Giá tiền (VND)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {booking.bookingDetails
                                        .sort((a, b) => a.yardSchedule.slot.slotName.localeCompare(b.yardSchedule.slot.slotName))
                                        .map((bookingDetail, index) => (
                                            <tr key={index}>
                                                <td>{bookingDetail.yardSchedule.slot.slotName}</td>
                                                <td>{bookingDetail.date}</td>
                                                <td>{bookingDetail.yardSchedule.yard.yardName}</td>
                                                <td>{bookingDetail.yardSchedule.slot.price}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default OrderItem;
