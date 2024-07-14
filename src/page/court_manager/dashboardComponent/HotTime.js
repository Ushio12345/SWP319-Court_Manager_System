import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class HotTime extends Component {
    render() {
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
            <div className="overscroll-x-auto">
                <div className="chart-container" style={{ width: "100%", height: "300px" }}>
                    <Line data={data} options={options} />
                </div>
            </div>
        );
    }
}

export default HotTime;
