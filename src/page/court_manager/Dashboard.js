import React from "react";
import "./manager.css";
import NewUserItem from "./dashboardComponent/NewUserItem";
import HotTime from "./dashboardComponent/HotTime";
import CourtItem from "./dashboardComponent/CourtItem";
import NewOrder from "./dashboardComponent/NewOrder";

export default function Dashboard() {
    return (
        <div className="dashboard_manager">
            <div className="dash-num grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4">
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

            <div className="grid grid-rows-4 sm:grid-rows-3 grid-flow-col gap-4 my-4">
                <div className="newUser newCus md:row-span-4 sm:col-span-4">
                    <div className="newUser-title">Danh sách khách hàng mới</div>
                    <NewUserItem />
                </div>

                <div className="hotTime md:col-span-2 sm:col-span-4 sm:row-span-1 md:row-span-2 bg-white ">
                    <HotTime />
                </div>
                <div className="courtOfManager md:row-span-2 sm:row-span-1  sm:col-span-4 md:col-span-2">
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
