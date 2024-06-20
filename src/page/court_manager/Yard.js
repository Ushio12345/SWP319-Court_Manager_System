import React, { Component } from "react";
import Slot from "./Slot";
import axios from "axios";

export default class Yard extends Component {
    state = {
        yards: [],
        yardOb: {
            yard_id: "", // Include yard_id to track the specific yard being updated
            court_id: "",
            yard_name: "",
            slots: [],
        },
        courts: [],
        newCourt: {
            court_name: "",
            address: "",
            open_time: "",
            close_time: "",
            rate: "",
            user_id: "",
        },
        alertMessage: "",
        alertType: "",
    };

    componentDidMount() {
        this.fetchYard();
        this.fetchCourts();
    }

    fetchYard = () => {
        axios
            .get("http://localhost:3001/yard")
            .then((res) => {
                this.setState({ yards: res.data });
            })
            .catch((err) => console.error("Error fetching yards:", err));
    };

    fetchCourts = () => {
        axios
            .get("http://localhost:3001/court")
            .then((res) => {
                this.setState({ courts: res.data });
            })
            .catch((err) => {
                console.error("Error fetching courts:", err);
                alert("Không thể lấy dữ liệu từ API");
            });
    };

    handleAddYard = () => {
        axios
            .post("http://localhost:3001/yard", {
                court_id: this.state.yardOb.court_id,
                yard_name: this.state.yardOb.yard_name,
                slots: this.state.yardOb.slots,
            })
            .then(() => {
                this.fetchYard();
                this.showAlert("Thêm sân mới thành công.", "success");
                this.clearForm();
            })
            .catch((error) => {
                console.error("Error adding yard:", error);
                this.showAlert("Có lỗi khi thêm sân mới!", "danger");
            });
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            yardOb: {
                ...prevState.yardOb,
                [name]: value,
            },
        }));
    };

    renderCourtName = () => {
        return this.state.courts.map((court, index) => (
            <button
                className={`nav-link ${index === 0 ? "active" : ""}`}
                id={`nav-${court.id}-tab`}
                data-bs-toggle="tab"
                data-bs-target={`#nav-${court.id}`}
                type="button"
                role="tab"
                aria-controls={`nav-${court.id}`}
                aria-selected={index === 0 ? "true" : "false"}
                key={court.id}
                onClick={() => this.setState({ yardOb: { ...this.state.yardOb, court_id: court.id } })}
            >
                {court.court_name}
            </button>
        ));
    };

    renderYard = (courtId) => {
        return this.state.yards
            .filter((yard) => yard.court_id === courtId)
            .map((yard, index) => (
                <tr key={yard.id}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{yard.id}</td>
                    <td className="text-start">{yard.yard_name}</td>
                    <td className="d-flex btn-action">
                        <button
                            className="btn btn-warning mr-2"
                            data-bs-toggle="modal"
                            data-bs-target="#updateYard"
                            onClick={() =>
                                this.setState({
                                    yardOb: {
                                        yard_id: yard.id,
                                        court_id: yard.court_id,
                                        yard_name: yard.yard_name,
                                        slots: yard.slots,
                                    },
                                })
                            }
                        >
                            <i className="fa fa-pen-to-square"></i>
                        </button>
                        <button className="btn btn-danger" onClick={() => this.handleDeleteYard(yard.id)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            ));
    };

    handleCourtSelectChange = (event) => {
        const courtId = event.target.value;
        this.setState((prevState) => ({
            yardOb: {
                ...prevState.yardOb,
                court_id: courtId,
            },
        }));
    };

    handleUpdateYard = () => {
        const updatedYard = {
            yard_id: this.state.yardOb.yard_id,
            court_id: this.state.yardOb.court_id,
            yard_name: this.state.yardOb.yard_name,
            slots: this.state.yardOb.slots,
        };

        axios
            .put(`http://localhost:3001/yard/${updatedYard.yard_id}`, updatedYard)
            .then(() => {
                this.fetchYard();
                this.showAlert("Cập nhật sân thành công.", "success");
                document.getElementById("updateYard").classList.remove("show");
            })
            .catch((error) => {
                console.error("Error updating yard:", error);
                this.showAlert("Có lỗi khi cập nhật sân.", "danger");
            });
    };

    handleDeleteYard = (yardId) => {
        if (window.confirm("Bạn có chắc chắn chưa?")) {
            axios
                .delete(`http://localhost:3001/yard/${yardId}`)
                .then(() => {
                    this.fetchYard();
                    this.showAlert("Xóa sân thành công.", "success");
                })
                .catch((error) => {
                    console.error("Error deleting yard:", error);
                    this.showAlert("Có lỗi khi xóa sân.", "danger");
                });
        }
    };

    showAlert = (message, type) => {
        this.setState({
            alertMessage: message,
            alertType: type,
        });
        setTimeout(this.hideAlert, 3000);
    };

    hideAlert = () => {
        this.setState({
            alertMessage: "",
            alertType: "",
        });
    };

    clearForm = () => {
        this.setState({
            yardOb: {
                court_id: "",
                yard_name: "",
                slots: [],
            },
        });
    };

    render() {
        return (
            <div className="YardComponent">
                <h1 className="text-center">Thông tin quản lý sân</h1>

                <div className="d-flex mb-3" style={{ justifyContent: "space-between", alignItems: "center" }}>
                    <div className="input-group w-50">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập từ khóa"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">
                                <i className="fa fa-search"></i>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="tabContent mb-4">
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        {this.renderCourtName()}
                    </div>
                </div>

                {/* Modal Thêm Mới Sân */}
                <div className="modal fade" id="addYardModal" tabIndex="-1" aria-labelledby="addYardModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addYardModalLabel">
                                    Thêm mới sân
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="newYardName">Tên sân</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="newYardName"
                                        name="yard_name"
                                        placeholder="Nhập tên sân"
                                        value={this.state.yardOb.yard_name}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="courtSelect">Chọn sân cần thêm</label>
                                    <select
                                        id="courtSelect"
                                        className="form-control"
                                        value={this.state.yardOb.court_id}
                                        onChange={this.handleCourtSelectChange}
                                    >
                                        <option value="">Chọn sân</option>
                                        {this.state.courts.map((court) => (
                                            <option key={court.id} value={court.id}>
                                                {court.court_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.handleAddYard}>
                                    Thêm sân
                                </button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* update modal */}
                <div className="modal fade" id="updateYard" tabIndex="-1" aria-labelledby="updateSlotLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="text-center">Cập nhật thông tin Sân</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="updateYardName">Tên sân</label>
                                    <input
                                        id="updateYardName"
                                        name="yard_name"
                                        className="form-control"
                                        placeholder="Nhập tên sân"
                                        value={this.state.yardOb.yard_name}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="updateCourtSelect">Chọn sân</label>
                                    <select
                                        id="updateCourtSelect"
                                        className="form-control"
                                        value={this.state.yardOb.court_id}
                                        onChange={this.handleCourtSelectChange}
                                    >
                                        <option value="">Chọn sân</option>
                                        {this.state.courts.map((court) => (
                                            <option key={court.id} value={court.id}>
                                                {court.court_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.handleUpdateYard}>
                                    Cập nhật
                                </button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-7">
                        <button className="btn btn-success w-25 mb-1" data-bs-toggle="modal" data-bs-target="#addYardModal">
                            Thêm sân mới
                        </button>
                        <div className="tab-content" id="nav-tabContent">
                            {this.state.courts.map((court, index) => (
                                <div
                                    key={court.id}
                                    className={`tab-pane fade ${index === 0 ? "show active" : ""}`}
                                    id={`nav-${court.id}`}
                                    role="tabpanel"
                                    aria-labelledby={`nav-${court.id}-tab`}
                                >
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th className="text-center">Mã sân</th>
                                                <th className="text-start">Tên sân</th>
                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>{this.renderYard(court.id)}</tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <Slot />
                    </div>
                </div>
            </div>
        );
    }
}
