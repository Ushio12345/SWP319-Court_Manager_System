import React from "react";
import "./manager.css";
import NewUserItem from "./dashboardComponent/NewUserItem";
import HotTime from "./dashboardComponent/HotTime";
import CourtItem from "./dashboardComponent/CourtItem";
import NewOrder from "./dashboardComponent/NewOrder";

export default function Dashboard() {
    const newUsers = [
        {
            name: "Hoàng Mạnh Dũng",
            email: "dunghoangne@gmail.com",
            avatarUrl: "https://i.pravatar.cc/150?img=4",
            role: "Khách",
        },
        {
            name: "Lê Ngọc Ánh",
            email: "anhngocLe@gmail.com",
            avatarUrl: "https://i.pravatar.cc/150?img=5",
            role: "Khách",
        },
        {
            name: "Nguyễn Văn Bách",
            email: "nguyenbach123@gmail.com",
            avatarUrl: "https://i.pravatar.cc/150?img=10",
            role: "Chủ sân",
        },
        {
            name: "Phạm Thị Lan",
            email: "lanpham@gmail.com",
            avatarUrl: "https://i.pravatar.cc/150?img=12",
            role: "Khách",
        },
        {
            name: "Trần Văn Tân",
            email: "tantran@gmail.com",
            avatarUrl: "https://i.pravatar.cc/150?img=15",
            role: "Khách",
        },
        {
            name: "Nguyễn Thị Hồng",
            email: "hongnguyen@gmail.com",
            avatarUrl: "https://i.pravatar.cc/150?img=20",
            role: "Khách",
        },
    ];

    const filteredUsers = newUsers.filter((user) => user.role === "Khách").slice(0, 5);

    return (
        <div className="dashboard_manager">
            <div className="dash-num grid grid-cols-4 md:grid-cols-4 sm:grid-cols-2 gap-4">
                <div className="dash-num-item">
                    <div className="dash-num-item-left">
                        <h4>50</h4>
                        <p>Lượt truy cập mỗi ngày</p>
                    </div>
                    <div className="dash-num-item-icon">
                        <i className="fa-regular fa-eye" />
                    </div>
                </div>
                <div className="dash-num-item">
                    <div className="dash-num-item-left">
                        <h4>3</h4>
                        <p>Số cơ sở</p>
                    </div>
                    <div className="dash-num-item-icon">
                        <i className="fa-solid fa-house" />
                    </div>
                </div>
                <div className="dash-num-item">
                    <div className="dash-num-item-left">
                        <h4>6</h4>
                        <p>Đơn / ngày</p>
                    </div>
                    <div className="dash-num-item-icon">
                        <i className="fa-solid fa-file-invoice" />
                    </div>
                </div>
                <div className="dash-num-item">
                    <div className="dash-num-item-left">
                        <h4>2000000</h4>
                        <p>Doanh thu / ngày</p>
                    </div>
                    <div className="dash-num-item-icon" style={{ color: "black" }}>
                        <i className="fa-solid fa-money-bill" />
                    </div>
                </div>
            </div>

            <div className="grid grid-rows-4 grid-flow-col gap-4 my-4">
                <div className="newUser newCus row-span-4">
                    <div className="newUser-title">Danh sách khách hàng mới</div>
                    {filteredUsers.map((user) => (
                        <NewUserItem key={user.email} newUser={user} />
                    ))}
                </div>

                <div className="hotTime col-span-2 row-span-2 bg-white ">
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <th className="text-start">Tên slot - Thời gian</th>
                                <th>Số lượt đặt</th>
                            </tr>
                        </thead>
                        <tbody>
                            <HotTime />
                        </tbody>
                    </table>
                </div>
                <div className="courtOfManager row-span-2 col-span-2">
                    <div className="newUser-title">Danh sách sân hiện có</div>
                    <CourtItem />
                </div>
            </div>

            <div className="bookingList">
                <div className="newUser-title">Danh sách đơn đặt mới</div>
                <NewOrder />
            </div>
        </div>
    );
}
