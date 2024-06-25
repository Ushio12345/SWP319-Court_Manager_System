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
            yard_id: [],
            court_id: "",
        },
        courts: [],
        yards: [],
        alertMessage: "",
        alertType: "",
    };

    componentDidMount() {
        this.fetchCourts();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedCourtId !== this.props.selectedCourtId) {
            this.fetchSlot();
        }
    }

    fetchYard = () => {
        axiosInstance
            .get("http://localhost:3001/yard")
            .then((res) => {
                this.setState({ courts: res.data });
            })
            .catch((err) => {
                showAlert("Không thể lấy dữ liệu từ API", "danger");
            });
    };

    fetchSlot = () => {
        const { selectedCourtId } = this.props;
        axiosInstance
            .get(`http://localhost:3001/slot?court_id=${selectedCourtId}`)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({ slots: res.data });
                } else {
                    this.setState({ slots: [] });
                    showAlert('error', 'Lỗi !', 'Không lấy được dữ liệu', 'top-end');
                    console.error("Response không thành công:", res.status);
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 401 && error.response.data.message === 'Token không hợp lệ hoặc đã hết hạn.') {
                    handleTokenError();
                }
                this.handleRequestError(error);
            });
    };

    handleAddSlot = () => {
        const { selectedCourtId } = this.props;
        const slotToAdd = { ...this.state.SlotsOb, court_id: selectedCourtId };
        axiosInstance
            .post("http://localhost:3001/slot", slotToAdd)
            .then(() => {
                this.fetchSlot();
                this.setState({
                    SlotsOb: {
                        slot_name: "",
                        start_time: "",
                        end_time: "",
                        price: "",
                        yard_id: [],
                        court_id: "",
                    },
                    alertMessage: "Thêm slot thành công!",
                    alertType: "success",
                });
            })
            .catch((error) => {
                this.showAlert("Xảy ra lỗi trong quá trình thêm slot. Thử lại sau!", "danger");
            });
    };

    handleCheckboxChange = (yardId, checked) => {
        this.setState((prevState) => {
            const selectedYards = checked ? [...prevState.SlotsOb.yard_id, yardId] : prevState.SlotsOb.yard_id.filter((id) => id !== yardId);

            return {
                SlotsOb: {
                    ...prevState.SlotsOb,
                    yard_id: selectedYards,
                },
            };
        });
    };

    handleUpdateSlot = () => {
        axiosInstance
            .put("time-slot/updateSlot", this.state.slot, {
                headers: {
                    'Content-Type': 'application/json',
                }
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
                    showAlert('success', '', 'Chỉnh sửa slot thành công', 'top-end');
                } else {
                    this.showAlert('error', 'Lỗi !', 'Chỉnh sửa slot không thành công', 'top-end');
                    console.error("Response không thành công:", res.status);
                }
            })
            .catch((error) => {
                this.showAlert("Cập nhật slot thất bại!", "danger");
            });
    };

    handleDeleteSlot = (slotId) => {
        showConfirmAlert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa slot này không ?", 'Xóa', 'center')
            .then((result) => {
                if (result.isConfirmed) {
                    axiosInstance.delete(`/time-slot/deleteSlot/${slotId}`)
                        .then((res) => {
                            if (res.status === 200) {
                                this.fetchSlot();
                                showAlert('success', '', 'Đã xóa slot thành công', 'top-end');
                            } else {
                                showAlert('error', '', 'Xóa slot không thành công', 'top-end');
                            }
                        })
                        .catch((error) => {
                            if (error.response && error.response.status === 401 && error.response.data.message === 'Token không hợp lệ hoặc đã hết hạn.') {
                                handleTokenError();
                            } else {
                                showAlert('error', '', 'Xóa slot không thành công', 'top-end');
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

    renderNameYard = () => {
        return this.state.yards.map((yard) => (
            <div className="d-flex" key={yard.id}>
                <input
                    type="checkbox"
                    value={yard.id}
                    checked={this.state.SlotsOb.yard_id.includes(yard.id)}
                    onChange={(e) => this.handleCheckboxChange(yard.id, e.target.checked)}
                />
                <strong>{yard.yard_name}</strong>
            </div>
        ));
    };

    showAlert = (message, type) => {
        this.setState({
            alertMessage: message,
            alertType: type,
        });
        setTimeout(() => {
            this.hideAlert();
        }, 3000);
    };

    hideAlert = () => {
        this.setState({
            alertMessage: "",
            alertType: "",
        });
    };

    clearForm = () => {
        this.setState({
            SlotsOb: {
                id: "",
                slot_name: "",
                start_time: "",
                end_time: "",
                price: "",
                yard_id: [],
                court_id: "",
            },
        });
    };

    renderSlots = () => {
        return this.state.Slots.map((slot, index) => (
            <tr key={slot.id}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{slot.slot_name}</td>
                <td className="text-center">
                    {slot.start_time} - {slot.end_time}
                </td>
                <td className="text-center">{slot.price}</td>
                <td className="text-center">
                    <div className="d-flex">
                        <button
                            className="btn btn-warning mr-2"
                            data-bs-toggle="modal"
                            data-bs-target="#updateSlot"
                            onClick={() => {
                                this.setState({ SlotsOb: { ...slot, yard_id: [...slot.yard_id] } });
                            }}
                        >
                            <i className="fa fa-pen-to-square"></i>
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                this.handleDeleteSlot(slot.id);
                            }}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        ));
    };

    render() {
        return (
            <div>
                <div className="row">
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
                                    }
                                })
                            }
                        >
                            <i className="fa fa-plus mr-1" />
                            Thêm Mới
                        </button>
                    </div>
                </div>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã slot</th>
                            <th>Tên</th>
                            <th>Thời gian</th>
                            <th>Giá tiền (VND)</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.slots.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center">Danh sách slot trống</td>
                            </tr>
                        ) : (
                            this.state.slots.map((slot, index) => (
                                <tr className="" key={slot.courtId}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{slot.slotId}</td>
                                    <td className="text-center">{slot.slotName}</td>
                                    <td className="text-center">{`${slot.startTime} - ${slot.endTime}`}</td>
                                    <td className="text-center">{slot.price}</td>
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

                {/* Modal Thêm Mới Slot */}
                <div className="modal fade" id="addNewSlot" tabIndex="-1" aria-labelledby="addSlotLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="text-center">Thêm mới Slot</h4>
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
                                <div className="form-group">
                                    <label htmlFor="price">Giá (Đơn vị: VND)</label>
                                    <input
                                        id="price"
                                        name="price"
                                        className="form-control"
                                        placeholder="Nhập giá"
                                        value={this.state.slot.price}
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
                <div className="modal fade" id="updateSlot" tabIndex="-1" aria-labelledby="updateSlotLabel" aria-hidden="true">
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
                                <div className="form-group">
                                    <label htmlFor="price">Giá (Đơn vị: VND)</label>
                                    <input
                                        id="price"
                                        name="price"
                                        className="form-control"
                                        placeholder="Nhập giá"
                                        value={this.state.slot.price}
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
