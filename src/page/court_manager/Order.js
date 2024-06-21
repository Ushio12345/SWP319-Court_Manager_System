import axios from "axios";
import React, { Component } from "react";

export default class Order extends Component {
    state = {
        Orders: [],
        newOrder: {
            booking_id: "",
            user_id: "",
            booking_type: "",
            booking_date: "",
            discount: "",
            total_price: "",
            status: "",
        },
        isDetailView: false,
        showAlert: false,
        alertMessage: "",
        alertType: "",
    };

    componentDidMount() {
        this.fetchOrders();
    }

    fetchOrders = () => {
        axios
            .get("http://localhost:3001/order")
            .then((res) => {
                this.setState({ Orders: res.data });
            })
            .catch((err) => {
                alert("Không thể lấy dữ liệu từ API");
            });
    };

    handleInputChange = (event) => {
        const { name, value, files } = event.target;
        if (files && files.length > 0) {
            this.setState((prevState) => ({
                newOrder: {
                    ...prevState.newOrder,
                    [name]: files[0],
                },
            }));
        } else {
            this.setState((prevState) => ({
                newOrder: {
                    ...prevState.newOrder,
                    [name]: value,
                },
            }));
        }
    };

    handleDeleteCourt = (booking_id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa đơn đặt này?")) {
            axios
                .delete(`http://localhost:3001/order/${booking_id}`)
                .then(() => {
                    this.fetchOrders();
                    this.setState({
                        showAlert: true,
                        alertMessage: "Xóa đơn hàng thành công!",
                        alertType: "success",
                    });
                })
                .catch((error) => {
                    alert("Có lỗi khi xóa đơn!", error);
                });
        }
    };

    handleUpdateOrder = () => {
        const { booking_id, ...updatedOrder } = this.state.newOrder;
        axios
            .put(`http://localhost:3001/order/${booking_id}`, updatedOrder)
            .then(() => {
                this.fetchOrders();
                this.setState({
                    newOrder: {
                        ...updatedOrder,
                    },
                    showAlert: true,
                    alertMessage: "Cập nhật đơn đặt thành công!",
                    alertType: "success",
                });
            })
            .catch((error) => {
                alert("Có lỗi khi cập nhật đơn đặt!", error);
            });
    };

    render() {
        return (
            <div>
                {/* Modal Thông Báo */}
                {this.state.showAlert && (
                    <div className={`alert alert-${this.state.alertType} alert-dismissible fade show`} role="alert">
                        {this.state.alertMessage}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )}

                {/* Modal Chi Tiết */}
                <div className="modal fade" id="detailModal" tabIndex="-1" aria-labelledby="detailModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="detailModalLabel">
                                    Chi tiết đơn đặt
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <p>
                                            <strong>Mã đơn:</strong> {this.state.newOrder.booking_id}
                                        </p>

                                        <p>
                                            <strong>Mã khách đặt:</strong> {this.state.newOrder.user_id}
                                        </p>

                                        <p>
                                            <strong>Loại đơn:</strong> {this.state.newOrder.booking_type}
                                        </p>

                                        <p>
                                            <strong>Ngày đặt:</strong> {this.state.newOrder.booking_date}
                                        </p>

                                        <p>
                                            <strong>Tổng giá:</strong> {this.state.newOrder.total_price}
                                        </p>

                                        <p>
                                            <strong>Tình trạng:</strong> {this.state.newOrder.status}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Kết thúc Modal Chi Tiết */}

                <h1 className="text-center">Thông tin quản lí đơn đặt</h1>

                <div className="row">
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập từ khóa"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">
                                    <i className="fa fa-search" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="clear-fix" />
                <div className="tblCoSo" id="tblCoSo">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã đơn</th>
                                <th className="text-start">Mã khách</th>
                                <th className="text-start">Loại đơn</th>
                                <th>Discount</th>
                                <th>Tổng giá</th>
                                <th>Tình trạng</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.Orders.map((order, index) => (
                                <tr key={order.booking_id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{order.booking_id}</td>
                                    <td className="text-start">{order.user_id}</td>
                                    <td className="text-start">{order.booking_type}</td>
                                    <td className="text-center">{order.discount}</td>
                                    <td className="text-center">{order.total_price}</td>
                                    <td className="text-center">{order.status}</td>
                                    <td className="d-flex">
                                        <button
                                            className="btn btn-info mr-2"
                                            data-bs-toggle="modal"
                                            data-bs-target="#detailModal"
                                            onClick={() => this.setState({ newOrder: order, isDetailView: true })}
                                        >
                                            <i className="fa fa-info-circle"></i>
                                        </button>
                                        <button
                                            className="btn btn-warning mr-2"
                                            data-bs-toggle="modal"
                                            data-bs-target="#updateOrder"
                                            onClick={() => this.setState({ newOrder: order, isDetailView: false })}
                                        >
                                            <i className="fa fa-pen-to-square"></i>
                                        </button>
                                        <button className="btn btn-danger" onClick={() => this.handleDeleteOrder(order.booking_id)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <br />

                {/* Modal Cập Nhật */}

                <div className="modal fade" id="updateOrder" tabIndex="-1" aria-labelledby="addStaffLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4>Cập nhật thông tin</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="booking_id">Mã đơn đặt</label>
                                    <input
                                        id="booking_id"
                                        name="booking_id"
                                        className="form-control"
                                        placeholder="Mã đơn đặt"
                                        value={this.state.newOrder.booking_id}
                                        onChange={this.handleInputChange}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="user_id">Mã khách đặt</label>
                                    <input
                                        id="user_id"
                                        name="user_id"
                                        className="form-control"
                                        placeholder="Mã khách đặt"
                                        value={this.state.newOrder.user_id}
                                        onChange={this.handleInputChange}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="booking_type">Loại đơn đặt</label>
                                    <input
                                        id="booking_type"
                                        name="booking_type"
                                        className="form-control"
                                        placeholder="Cập nhật loại đơn"
                                        value={this.state.newOrder.booking_type}
                                        onChange={this.handleInputChange}
                                        readOnly={this.state.isDetailView}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="booking_date">Ngày đặt</label>
                                    <input
                                        id="booking_date"
                                        name="booking_date"
                                        className="form-control"
                                        placeholder="Cập nhật ngày đặt"
                                        value={this.state.newOrder.booking_date}
                                        onChange={this.handleInputChange}
                                        readOnly={this.state.isDetailView}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="discount">Discount</label>
                                    <input
                                        id="discount"
                                        name="discount"
                                        className="form-control"
                                        placeholder="Cập nhật mã giảm giá"
                                        value={this.state.newOrder.discount}
                                        onChange={this.handleInputChange}
                                        readOnly={this.state.isDetailView}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="total_price">Tổng giá</label>
                                    <input
                                        id="total_price"
                                        name="total_price"
                                        className="form-control"
                                        placeholder="Cập nhật tổng giá"
                                        value={this.state.newOrder.total_price}
                                        onChange={this.handleInputChange}
                                        readOnly={this.state.isDetailView}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="status">Tình trạng</label>
                                    <input
                                        id="status"
                                        name="status"
                                        className="form-control"
                                        placeholder="Cập nhật tình trạng"
                                        value={this.state.newOrder.status}
                                        onChange={this.handleInputChange}
                                        readOnly={this.state.isDetailView}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                {!this.state.isDetailView && (
                                    <div className="d-flex w-100">
                                        <button type="button" className="btn btn-success " onClick={this.handleUpdateCourt}>
                                            Cập nhật
                                        </button>
                                    </div>
                                )}

                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Kết thúc Modal Cập Nhật */}
            </div>
        );
    }
}
