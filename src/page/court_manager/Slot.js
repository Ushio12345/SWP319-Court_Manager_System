import React, { Component } from "react";
import axios from "axios";

export default class Slot extends Component {
    state = {
        Slots: [],
        SlotsOb: {
            slot_name: "",
            start_time: "",
            end_time: "",
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

    fetchCourts = () => {
        axios
            .get("http://localhost:3001/court")
            .then((res) => {
                this.setState({ courts: res.data });
            })
            .catch((err) => {
                this.showAlert("Không thể lấy dữ liệu từ API", "danger");
            });
    };

    fetchSlot = () => {
        const { selectedCourtId } = this.props;
        axios
            .get(`http://localhost:3001/slot?court_id=${selectedCourtId}`)
            .then((res) => {
                this.setState({ Slots: res.data });
            })
            .catch((err) => {
                this.showAlert("Không thể lấy dữ liệu từ API", "danger");
            });
    };

    handleAddSlot = () => {
        const { selectedCourtId } = this.props;
        const slotToAdd = { ...this.state.SlotsOb, court_id: selectedCourtId };
        axios
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
        const { id, ...updateSlot } = this.state.SlotsOb;
        axios
            .put(`http://localhost:3001/slot/${id}`, updateSlot)
            .then(() => {
                this.fetchSlot();
                this.showAlert("Cập nhật slot thành công!", "success");
                this.clearForm();
            })
            .catch((error) => {
                this.showAlert("Cập nhật slot thất bại!", "danger");
            });
    };

    handleDeleteSlot = (id) => {
        const slotToDelete = this.state.Slots.find((slot) => slot.id === id);
        if (window.confirm(`Bạn chắc chắn muốn xóa ${slotToDelete.slot_name} không?`)) {
            axios
                .delete(`http://localhost:3001/slot/${id}`)
                .then(() => {
                    this.fetchSlot();
                    this.showAlert("Xóa slot thành công!", "success");
                })
                .catch(() => {
                    this.showAlert("Xóa slot thất bại!", "danger");
                });
        }
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            SlotsOb: {
                ...prevState.SlotsOb,
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
                {this.state.alertMessage && (
                    <div className={`alert alert-${this.state.alertType}`} role="alert">
                        {this.state.alertMessage}
                    </div>
                )}

                <button className="btn btn-success w-25 mb-1" data-bs-toggle="modal" data-bs-target="#addNewSlot">
                    Thêm Slot
                </button>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th colSpan={5}>Danh sách slot trong cơ sở</th>
                        </tr>
                        <tr>
                            <th>STT</th>
                            <th>Tên Slot</th>
                            <th>Thời gian</th>
                            <th>Giá tiền</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderSlots()}</tbody>
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
                                    <label htmlFor="slot_name">Tên Slot</label>
                                    <input
                                        id="slot_name"
                                        name="slot_name"
                                        className="form-control"
                                        placeholder="Nhập tên Slot"
                                        value={this.state.SlotsOb.slot_name}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="start_time">Giờ bắt đầu</label>
                                    <input
                                        id="start_time"
                                        name="start_time"
                                        className="form-control"
                                        placeholder="Nhập giờ bắt đầu"
                                        value={this.state.SlotsOb.start_time}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="end_time">Giờ kết thúc</label>
                                    <input
                                        id="end_time"
                                        name="end_time"
                                        className="form-control"
                                        placeholder="Nhập giờ kết thúc"
                                        value={this.state.SlotsOb.end_time}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Giá</label>
                                    <input
                                        id="price"
                                        name="price"
                                        className="form-control"
                                        placeholder="Nhập giá"
                                        value={this.state.SlotsOb.price}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">{this.renderNameYard()}</div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.handleAddSlot}>
                                    Thêm Slot
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
                                <h4 className="text-center">Cập nhật thông tin Slot</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="slot_name">Tên Slot</label>
                                    <input
                                        id="slot_name"
                                        name="slot_name"
                                        className="form-control"
                                        placeholder="Nhập tên Slot"
                                        value={this.state.SlotsOb.slot_name}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="start_time">Giờ bắt đầu</label>
                                    <input
                                        id="start_time"
                                        name="start_time"
                                        className="form-control"
                                        placeholder="Nhập giờ bắt đầu"
                                        value={this.state.SlotsOb.start_time}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="end_time">Giờ kết thúc</label>
                                    <input
                                        id="end_time"
                                        name="end_time"
                                        className="form-control"
                                        placeholder="Nhập giờ kết thúc"
                                        value={this.state.SlotsOb.end_time}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Giá</label>
                                    <input
                                        id="price"
                                        name="price"
                                        className="form-control"
                                        placeholder="Nhập giá"
                                        value={this.state.SlotsOb.price}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">{this.renderNameYard()}</div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.handleUpdateSlot}>
                                    Cập nhật
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
