import React from "react";
import NewUserItem from "./dashboardComponent/NewUserItem";
import NewCourtItem from "./dashboardComponent/NewCourtItem";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
    const data = {
        labels: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"],
        datasets: [
            {
                label: "Lượt truy cập",
                data: [12, 19, 3, 5, 2, 3, 7],
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
                pointBorderColor: "#fff",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Biểu đồ lượt truy cập hàng tuần",
            },
        },
    };

    return (
        <div className="admin-db container py-5">
            <div className="admin-tk grid grid-cols-4 sm:grid-cols-4 gap-4">
                <div className="tk-item">
                    <div className="tk-icon">
                        <i className="fa-regular fa-eye"></i>
                    </div>
                    <div className="tk-number">
                        <h4>20</h4>
                        <p>Lượt truy cập</p>
                    </div>
                </div>
                <div className="tk-item">
                    <div className="tk-icon">
                        <i className="fa-regular fa-eye"></i>
                    </div>
                    <div className="tk-number">
                        <h4>50</h4>
                        <p>Tổng số cơ sở</p>
                    </div>
                </div>
                <div className="tk-item">
                    <div className="tk-icon">
                        <i className="fa-regular fa-eye"></i>
                    </div>
                    <div className="tk-number">
                        <h4>12</h4>
                        <p>Đối tác hiện tại </p>
                    </div>
                </div>
                <div className="tk-item">
                    <div className="tk-icon">
                        <i className="fa-regular fa-eye"></i>
                    </div>
                    <div className="tk-number">
                        <h4>150</h4>
                        <p>Khách hàng </p>
                    </div>
                </div>
            </div>

            <div className="listItem grid grid-cols-2 md:grid-cols-2 gap-4 my-4">
                <div>
                    <h4>Danh sách tài khoản mới</h4>
                    <NewUserItem />
                </div>
                <div>
                    <h4>Danh sách sân cầu lông mới</h4>
                    <NewCourtItem />
                </div>
            </div>
            {/* Biểu đồ lượt truy cập */}
            <div className="chart-container my-4 bg-white">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}
