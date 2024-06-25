import React from "react";

const CardYard = ({ court }) => {
    const renderStars = (rate) => {
        const totalStars = 5; // Tổng số ngôi sao
        const stars = [];
        for (let i = 1; i <= totalStars; i++) {
            if (i <= rate) {
                stars.push(<span key={i} className="fa fa-star checked" style={{ color: "#ffc107" }}></span>);
            } else {
                stars.push(<span key={i} className="fa fa-star" style={{ color: "#000000" }}></span>);
            }
        }
        return stars;
    };

    // Kiểm tra xem court có tồn tại và có thuộc tính imageUrl không
    if (!court || !court.imageUrl) {
        return null; // Trả về null nếu không có dữ liệu hợp lệ
    }

        return (
                <div className="card-yard">
                    <div className="card-yard-img">
                {court.imageUrl && <img src={court.imageUrl} alt="Ảnh Sân" />} {/* Kiểm tra imageUrl trước khi sử dụng */}
                    </div>
                    <div className="card-yard-content">
                <p>Tên sân: {court.courtName}</p>
                <p>Địa chỉ: {court.address}</p>
                <p>Giờ mở cửa: {court.openTime} - {court.closeTime}</p>
                <p>Đánh giá: {renderStars(court.rate)}</p>
                <a href="#">Đặt Ngay</a>
            </div>
            </div>
        );
};

export default CardYard;
