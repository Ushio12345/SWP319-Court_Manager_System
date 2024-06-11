import React, { Component } from "react";

export default class Order extends Component {
    render() {
        return (
            <div>
                <h1 className="text-center">Thông tin đơn đặt hàng</h1>

                <ul className="nav nav-tabs mb-3 bg-light" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link active"
                            id="processingOrder"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-processingOrder"
                            type="button"
                            role="tab"
                            aria-controls="pills-processingOrder"
                            aria-selected="true"
                        >
                            Đang chờ xử lí
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="approvedOrder"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-approvedOrder"
                            type="button"
                            role="tab"
                            aria-controls="pills-approvedOrder"
                            aria-selected="false"
                        >
                            Đã duyệt
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="checkin"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-checkin"
                            type="button"
                            role="tab"
                            aria-controls="pills-checkin"
                            aria-selected="false"
                        >
                            Chờ Check in
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="canceledOrder"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-canceledOrder"
                            type="button"
                            role="tab"
                            aria-controls="pills-canceledOrder"
                            aria-selected="false"
                        >
                            Đã hủy
                        </button>
                    </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-processingOrder" role="tabpanel" aria-labelledby="processingOrder">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã đơn</th>
                                    <th>Slot</th>
                                    <th>Sân</th>
                                    <th>Dạng lịch</th>
                                    <th>Tổng tiền</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="tab-pane fade" id="pills-approvedOrder" role="tabpanel" aria-labelledby="approvedOrder"></div>
                    <div className="tab-pane fade" id="pills-checkin" role="tabpanel" aria-labelledby="checkin"></div>
                    <div className="tab-pane fade" id="pills-canceledOrder" role="tabpanel" aria-labelledby="canceledOrder"></div>
                </div>
            </div>
        );
    }
}
