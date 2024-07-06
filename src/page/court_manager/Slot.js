import React, { Component } from "react";
import axiosInstance from "../../config/axiosConfig";
import { showAlert, showConfirmAlert } from "../../utils/alertUtils";
import { handleTokenError } from "../../utils/tokenErrorHandle";

export default class Slot extends Component {
    state = {
        slots: [],
        slot: {
            slotId: "",
            slotName: "",
            startTime: "",
            endTime: "",
            price: "",
        },
        currentPage: 1,
        slotsPerPage: 5,
    };

    componentDidMount() {
        this.fetchSlot();
    }

    fetchSlot = () => {
        axiosInstance
            .get("/time-slot/findAllSlot")
            .then((res) => {
                if (res.status === 200) {
                    this.setState({ slots: res.data });
                } else {
                    this.setState({ slots: [] });
                    showAlert("error", "Lỗi !", "Không lấy được dữ liệu", "top-end");
                    console.error("Response không thành công:", res.status);
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 401 && error.response.data.message === "Token không hợp lệ hoặc đã hết hạn.") {
                    handleTokenError();
                }
                this.handleRequestError(error);
            });
    };

    handleAddSlot = () => {
        const { slot } = this.state;
        const slotData = {
            slotName: slot.slotName,
            startTime: slot.startTime,
            endTime: slot.endTime,
            price: slot.price,
        };
        axiosInstance
            .post("time-slot/createSlot", slotData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    this.fetchSlot();
                    this.setState({
                        slot: {
                            slotId: "",
                            slotName: "",
                            startTime: "",
                            endTime: "",
                            price: "",
                        },
                    });
                    showAlert("success", "", "Thêm slot thành công", "top-end");
                } else {
                    showAlert("error", "Lỗi !", "Thêm slot không thành công", "top-end");
                    console.error("Response không thành công:", res.status);
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    if (error.response.data.message === "Token không hợp lệ hoặc đã hết hạn.") {
                        handleTokenError();
                    } else if (error.response.data.message === "Slot với tên này đã có trong danh sách.") {
                        showAlert("error", "Lỗi!", "Slot với tên này đã có trong danh sách.", "top-end");
                    }
                }
                this.handleRequestError(error);
            });
    };

    handleUpdateSlot = () => {
        axiosInstance
            .put("time-slot/updateSlot", this.state.slot, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    this.fetchSlot();
                    this.setState({
                        slot: {
                            slotId: "",
                            slotName: "",
                            startTime: "",
                            endTime: "",
                            price: "",
                        },
                    });
                    showAlert("success", "", "Chỉnh sửa slot thành công", "top-end");
                } else {
                    showAlert("error", "Lỗi !", "Chỉnh sửa slot không thành công", "top-end");
                    console.error("Response không thành công:", res.status);
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    if (error.response.data.message === "Token không hợp lệ hoặc đã hết hạn.") {
                        handleTokenError();
                    } else if (error.response.data.message === "Slot với tên này đã có trong danh sách.") {
                        showAlert("error", "Lỗi!", "Slot với tên này đã có trong danh sách.", "top-end");
                    }
                }
                this.handleRequestError(error);
            });
    };

    handleDeleteSlot = (slotId) => {
        showConfirmAlert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa slot này không ?", "Xóa", "center").then((result) => {
            if (result.isConfirmed) {
                axiosInstance
                    .delete(`/time-slot/deleteSlot/${slotId}`)
                    .then((res) => {
                        if (res.status === 200) {
                            this.fetchSlot();
                            showAlert("success", "", "Đã xóa slot thành công", "top-end");
                        } else {
                            showAlert("error", "", "Xóa slot không thành công", "top-end");
                        }
                    })
                    .catch((error) => {
                        if (
                            error.response &&
                            error.response.status === 401 &&
                            error.response.data.message === "Token không hợp lệ hoặc đã hết hạn."
                        ) {
                            handleTokenError();
                        } else {
                            showAlert("error", "", "Xóa slot không thành công", "top-end");
                        }
                        console.error("Response không thành công:", error);
                    });
            }
        });
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            slot: {
                ...prevState.slot,
                [name]: value,
            },
        }));
    };

    handleRequestError = (error) => {
        console.error("Lỗi từ server:", error.response.data);
    };

    // Xử lý thay đổi trang
    handlePageChange = (event) => {
        this.setState({ currentPage: Number(event.target.id) });
    };

    render() {
        const { slots, currentPage, slotsPerPage } = this.state;

        // Tính toán các slot hiện tại
        const indexOfLastSlot = currentPage * slotsPerPage;
        const indexOfFirstSlot = indexOfLastSlot - slotsPerPage;
        const currentSlots = slots.slice(indexOfFirstSlot, indexOfLastSlot);

        // Tạo các nút phân trang
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(slots.length / slotsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <div>
                <div className="row py-5">
                    <div className="col-md-8">
                        <button
                            id="btnThemSlot"
                            className="btn btn-primary w-25"
                            data-bs-toggle="modal"
                            data-bs-target="#addNewSlot"
                            onClick={() =>
                                this.setState({
                                    slot: {
                                        slotName: "",
                                        startTime: "",
                                        endTime: "",
                                        price: "",
                                    },
                                })
                            }
                        >
                            <i className="fa fa-plus mr-1" />
                            Thêm Mới
                        </button>
                    </div>
                </div>

                <table className="table table-hover mt-2">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã slot</th>
                            <th>Tên</th>
                            <th>Thời gian</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentSlots.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    Danh sách slot trống
                                </td>
                            </tr>
                        ) : (
                            currentSlots.map((slot, index) => (
                                <tr className="" key={slot.slotId}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{slot.slotId}</td>
                                    <td className="text-center">{slot.slotName}</td>
                                    <td className="text-center">{`${slot.startTime} - ${slot.endTime}`}</td>
                                    <td className="d-flex btn-action">
                                        <button
                                            className="btn btn-warning mr-2"
                                            data-bs-toggle="modal"
                                            data-bs-target="#updateSlot"
                                            onClick={() => this.setState({ slot: slot, isDetailView: false })}
                                        >
                                            <i className="fa fa-pen-to-square"></i>
                                        </button>
                                        <button className="btn btn-danger" onClick={() => this.handleDeleteSlot(slot.slotId)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Nút phân trang */}
                <nav className="">
                    <ul className="pagination ">
                        {pageNumbers.map((number) => (
                            <li key={number} className="page-item">
                                <button onClick={this.handlePageChange} id={number} className="page-link">
                                    {number}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Modal Thêm Mới Slot */}
                <div className="modal fade" id="addNewSlot" tabIndex="-1" aria-labelledby="addSlotLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="text-center">Điền thông tin slot</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="slotName">Tên slot</label>
                                    <input
                                        id="slotName"
                                        name="slotName"
                                        className="form-control"
                                        placeholder="Nhập tên Slot"
                                        value={this.state.slot.slotName}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="startTime">Giờ bắt đầu</label>
                                    <input
                                        id="startTime"
                                        name="startTime"
                                        className="form-control"
                                        placeholder="Nhập giờ bắt đầu"
                                        value={this.state.slot.startTime}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="endTime">Giờ kết thúc</label>
                                    <input
                                        id="endTime"
                                        name="endTime"
                                        className="form-control"
                                        placeholder="Nhập giờ kết thúc"
                                        value={this.state.slot.endTime}
                                        onChange={this.handleInputChange}
                                    />
                                </div>                        
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.handleAddSlot}>
                                    Thêm slot
                                </button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Update modal */}
                <div className="modal fade my-5" id="updateSlot" tabIndex="-1" aria-labelledby="updateSlotLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="text-center">Cập nhật thông tin slot</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="slotName">Tên slot</label>
                                    <input
                                        id="slotName"
                                        name="slotName"
                                        className="form-control"
                                        placeholder="Nhập tên Slot"
                                        value={this.state.slot.slotName}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="startTime">Giờ bắt đầu</label>
                                    <input
                                        id="startTime"
                                        name="startTime"
                                        className="form-control"
                                        placeholder="Nhập giờ bắt đầu"
                                        value={this.state.slot.startTime}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="endTime">Giờ kết thúc</label>
                                    <input
                                        id="endTime"
                                        name="endTime"
                                        className="form-control"
                                        placeholder="Nhập giờ kết thúc"
                                        value={this.state.slot.endTime}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.handleUpdateSlot}>
                                    Lưu
                                </button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
