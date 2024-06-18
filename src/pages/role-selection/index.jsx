import React from "react";
import "./index.css";
import "../../App.css";

const RoleSelector = () => {
    const handleRoleSelection = (role) => {
        alert(`Selected ${role}`);
    };

    return (
        <div>
            <div className="title text-center m-5">
                <h1>
                    Chào mừng đã đến với <span>ForBadminton</span>
                </h1>
            </div>
            <div class="role-selector container">
                <div class="card" onclick="handleRoleSelection('Customer')">
                    <div class="card-inner">
                        <div class="card-front">
                            <div class="icon">&#128100;</div>
                            <h2>Khách hàng</h2>
                        </div>
                        <div class="card-back">
                            <i class="fa-solid fa-thumbtack"></i>
                            <h2>Mô tả</h2>
                            <p>Xem thông tin các sân cầu lông</p>
                            <p>Đặt sân trực tuyến</p>
                            <p>Xem lịch sử đặt sân</p>
                        </div>
                    </div>
                </div>
                <div class="card" onclick="handleRoleSelection('Court Owner')">
                    <div class="card-inner">
                        <div class="card-front">
                            <div class="icon">&#128104;&#8205;&#127979;</div>
                            <h2>Chủ sân</h2>
                        </div>
                        <div class="card-back">
                            <i class="fa-solid fa-thumbtack"></i>

                            <h2>Mô tả</h2>
                            <p>Quản lí các đơn đặt sân</p>
                            <p>Quản lí thông tin sân</p>
                            <p>Quản lí thông tin nhân viên</p>
                            <p>Xem thống kê</p>
                            <p>Xem feedback của khách hàng</p>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="title2 text-center m-5">
                <p>Chọn đúng vai trò bạn muốn để chúng tôi có thể mang lại cho bạn trải nghiệm tốt nhất.</p>
            </div>
        </div>
    );
};

export default RoleSelector;
