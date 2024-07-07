import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axiosInstance from "../../../../config/axiosConfig";
import { alert, showConfirmPayment } from "../../../../utils/alertUtils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCheckCircle, faTimesCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';

const OrderItem = ({ booking, onBookingCancel }) => {
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
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

    if (!booking.court) {
        return <div>Đang tải...</div>;
    }

    function getStatusTextColor(status) {
        switch (status) {
            case 'Đang chờ xử lý':
                return '#FFA500'; // Màu cam
            case 'Đang chờ check-in':
                return '#0000FF'; // Màu xanh dương
            case 'Đã hoàn thành':
                return '#008000'; // Màu xanh lá cây
            case 'Đã hủy':
                return '#FF0000'; // Màu đỏ
            default:
                return '#000'; // Màu mặc định
        }
    }

    function getIconForStatus(status) {
        switch (status) {
            case 'Đang chờ xử lý':
                return <FontAwesomeIcon icon={faSpinner} className="text-warning" />;
            case 'Đang chờ check-in':
                return <FontAwesomeIcon icon={faClock} className="text-info" />;
            case 'Đã hoàn thành':
                return <FontAwesomeIcon icon={faCheckCircle} className="text-success" />;
            case 'Đã hủy':
                return <FontAwesomeIcon icon={faTimesCircle} className="text-danger" />;
            default:
                return null;
        }
    }
    return (
        <div className="orderItemList">
            <div className="orderItem mt-4">
                <div className="orderItem-header">
                    <div className="nameCourt"><h5>{booking.court.courtName}</h5></div>
                    <div className="status d-flex">
                        <i>{getIconForStatus(booking.statusEnum)}</i>
                        <span style={{ color: getStatusTextColor(booking.statusEnum) }}>
                            {booking.statusEnum}
                        </span>
                    </div>

                </div>
                <div className="orderItem-body">
                    <div className="infor-court py-3">
                        <div className="img-court w-48">
                            <img src={booking.court.imageUrl} alt="court" />
                        </div>
                        <div className="order-detail ms-3">
                            <p><b>Mã đơn hàng:</b> {booking.bookingId}</p>
                            <p><b>Thời gian đặt đơn:</b> {booking.bookingDate}</p>
                            <p className="booking-type"><b>Dạng lịch:</b> {booking.bookingType}</p>
                            {booking.flexibleBooking &&
                                <p><b>Số giờ linh hoạt:</b> {booking.flexibleBooking.availableHours + booking.flexibleBooking.usedHours}</p>}
                            <p>
                                <b>Hình thức thanh toán:</b> <i className="fa-brands fa-paypal"></i>
                                <span> PayPal</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="orderItem-footer">
                    <div className="total-price">
                        <b>Tổng tiền:</b> <span>{booking.totalPrice.toLocaleString('vi-VN')} VND</span>
                    </div>
                </div>
                <div className="orderItem-btn w-50 m-auto">
                    {booking.statusEnum !== "Đã hủy" && booking.statusEnum !== "Đã hoàn thành" && (
                        <button className="btn" onClick={() => handleCancelBooking(booking.bookingId)}>Hủy đơn</button>
                    )}
                    {!booking.flexibleBooking &&
                        <button className="btn" onClick={() => setShowModal(true)}>
                            Chi tiết
                        </button>}
                </div>

                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Chi tiết đơn</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {booking.statusEnum && booking?.bookingDetails?.length > 0 && (
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th>Slot</th>
                                        <th>Ngày check-in</th>
                                        <th>Sân</th>
                                        <th>Trạng thái</th>
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
                                                <td style={{ color: getStatusTextColor(booking.statusEnum) }}>{bookingDetail.status}</td>
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
