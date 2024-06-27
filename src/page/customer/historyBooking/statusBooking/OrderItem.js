import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Rating from "react-rating-stars-component";

const OrderItem = ({ order }) => {
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleFeedbackChange = (event) => {
        setFeedback(event.target.value);
    };

    const handleSubmitFeedback = () => {
        // Handle the submission of the feedback and rating
        console.log("Rating:", rating);
        console.log("Feedback:", feedback);
        // Close the modal or perform further actions like submitting to backend
        setShowModal(false);
    };

    return (
        <div className="orderItemList">
            <div className="orderItem">
                <div className="orderItem-header">
                    <div className="nameCourt">CLB cầu lông Phú Hữu</div>
                    <div className="status d-flex">
                        <i className="fa-solid fa-stopwatch"></i> Chờ xác nhận
                    </div>
                </div>
                <div className="orderItem-body">
                    <div className="infor-court py-3">
                        <div className="img-court w-48">
                            <img
                                className=""
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgRFbFD3VDKW4AakR-qEkIAjLp7iSKtMEBig&s"
                                alt="court"
                            />
                        </div>
                        <div className="order-detail ms-3">
                            <p>Thời gian đặt đơn: 26/06/2024 - 16:52</p>
                            <h4>[Sân 1] - Slot 1: 7:30 - 8:30</h4>
                            <p className="booking-type">Dạng lịch: Lịch đơn</p>
                            <p>
                                Hình thức thanh toán: <i className="fa-brands fa-paypal"></i>
                                <span> PayPal</span>
                            </p>
                            <p>Mã check-in: AJ128</p>
                        </div>
                    </div>
                    <div className="price">75000 &#8363;</div>
                </div>
                <div className="orderItem-footer">
                    <div className="discount">
                        Giảm giá: <span>0%</span>
                    </div>
                    <div className="total-price">
                        Tổng tiền: <span>75000 &#8363;</span>
                    </div>
                </div>
                <div className="orderItem-btn w-50 m-auto">
                    <button className="btn">Hủy đơn</button>
                    <button className="btn" onClick={() => setShowModal(true)}>
                        Chi tiết đơn
                    </button>
                </div>

                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Chi tiết đơn</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Nội dung chi tiết đơn */}
                        <p>Chi tiết đơn đặt sân...</p>
                        {order.status === "completed" && (
                            <div className="feedback-section">
                                <h5>Đánh giá của bạn</h5>
                                <Rating count={5} value={rating} onChange={handleRatingChange} size={24} activeColor="#ffd700" />
                                <textarea
                                    className="feedback-input"
                                    placeholder="Nhập nội dung đánh giá của bạn"
                                    value={feedback}
                                    onChange={handleFeedbackChange}
                                />
                                <button className="btn btn-success m-0 p-2" onClick={handleSubmitFeedback}>
                                    Gửi đánh giá
                                </button>
                            </div>
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
