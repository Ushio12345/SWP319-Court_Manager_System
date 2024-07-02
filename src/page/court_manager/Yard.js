import React, { Component } from "react";
import { showAlert } from "../../utils/alertUtils";
import axiosInstance from "../../config/axiosConfig";
import { handleTokenError } from "../../utils/tokenErrorHandle";
import "./manager.css";

export default class Yard extends Component {
    state = {
        courts: [],
        yards: [],
        slots: [],
        newYard: {
            yardId: "",
            yardName: "",
        },
        selectedCourt: "",
        selectedCourtName: "",
        selectedYard: "",
        slotInYard: [],
        showModal: false,
    };

    componentDidMount() {
        this.fetchCourts();
        this.fetchSlotOfCourt();
    }

    fetchCourts = () => {
        axiosInstance
            .get("/court/courts-of-owner")
            .then((res) => {
                if (res.status === 200) {
                    this.setState({ courts: res.data });
                } else {
                    this.handleRequestError(res);
                }
            })
            .catch((error) => {
                this.handleRequestError(error);
            });
    };

    fetchSlotOfCourt = () => {
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

    fetchYardWithCourtID = (selectedCourt) => {
        axiosInstance
            .get(`/yard/findAllYard?courtId=${selectedCourt}`)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({ yards: res.data });
                } else {
                    this.handleRequestError(res);
                }
            })
            .catch((error) => {
                this.handleRequestError(error);
            });
    };

    fetchSlotWithYard = (yardId) => {
        axiosInstance
            .get(`/yard-schedule/getAllByYardId/${yardId}`)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({ slotInYard: res.data });
                } else {
                    this.handleRequestError(res);
                }
            })
            .catch((error) => {
                this.handleRequestError(error);
            });
    };

    handleCourtChange = (event) => {
        const courtId = event.target.value;
        const courtName = event.target.options[event.target.selectedIndex].text;
        this.setState({
            selectedCourt: courtId,
            selectedCourtName: courtName,
        });

        this.fetchYardWithCourtID(courtId);
    };

    handleYardClick = (yardId) => {
        this.setState({ selectedYard: yardId }, () => {
            this.fetchSlotWithYard(yardId);
        });
    };

    handleAddSlot = (slotId) => {
        const { selectedYard } = this.state;

        if (!selectedYard) {
            showAlert("error", "Lỗi!", "Vui lòng chọn một sân trước khi thêm slot.", "top-end");
            return;
        }

        axiosInstance
            .post(`/yard-schedule/${selectedYard}/timeSlot/${slotId}`)
            .then((res) => {
                if (res.status === 200) {
                    showAlert("success", "Thành công!", "Đã thêm slot vào sân.", "top-end");
                    this.fetchSlotWithYard(selectedYard);
                } else {
                    this.handleRequestError(res);
                }
            })
            .catch((error) => {
                this.handleRequestError(error);
            });
    };
    deleteSlotForYard = (slotId) => {
        const { selectedYard } = this.state;

        if (!selectedYard) {
            showAlert("error", "Lỗi!", "Vui lòng chọn một sân trước khi xóa slot.", "top-end");
            return;
        }

        axiosInstance
            .delete(`/yard-schedule/${selectedYard}/deleteSlotFromYard/${slotId}`)
            .then((res) => {
                if (res.status === 200) {
                    showAlert("success", "Thành công!", "Đã xóa slot khỏi sân.", "top-end");
                    this.fetchSlotWithYard(selectedYard);
                } else {
                    this.handleRequestError(res);
                }
            })
            .catch((error) => {
                this.handleRequestError(error);
            });
    };

    toggleModal = () => {
        this.setState((prevState) => ({
            showModal: !prevState.showModal,
        }));
    };

    handleRequestError = (error) => {
        let errorMessage = "Có lỗi xảy ra khi lấy dữ liệu";
        if (error.response) {
            if (error.response.status === 401 && error.response.data.message === "Token không hợp lệ hoặc đã hết hạn.") {
                handleTokenError();
                errorMessage = "Token không hợp lệ hoặc đã hết hạn.";
            } else {
                errorMessage = error.response.data.message || errorMessage;
            }
        }
        showAlert("error", "Lỗi !", errorMessage, "top-end");
        console.error("Request error:", error);
    };

    renderCourtOption = () => {
        return this.state.courts.map((court) => (
            <option key={court.courtId} value={court.courtId}>
                {court.courtName}
            </option>
        ));
    };

    renderYardWithCourt = () => {
        return this.state.yards.map((yard) => (
            <button
                key={yard.yardId}
                className={`yardBtn btn m-2 p-2 ${this.state.selectedYard === yard.yardId ? "active" : ""}`}
                onClick={() => this.handleYardClick(yard.yardId)}
            >
                {yard.yardName}
            </button>
        ));
    };

    renderSlotInYard = () => {
        return this.state.slotInYard.map((slot, index) => (
            <tr key={slot.slotId}>
                <td>{index + 1}</td>
                <td>{slot.slotName}</td>
                <td className="text-center">
                    {slot.startTime} - {slot.endTime}
                </td>
                <td className="text-center">{slot.price}</td>
                <td className="text-center">
                    <button className="btn btn-danger" onClick={() => this.deleteSlotForYard(slot.slotId)}>
                        <i className="fa fa-trash" />
                    </button>
                </td>
            </tr>
        ));
    };

    renderSlotYardHaveNot = () => {
        const { slots, slotInYard } = this.state;
        const slotInYardIds = slotInYard.map((slot) => slot.slotId);

        return slots
            .filter((slot) => !slotInYardIds.includes(slot.slotId))
            .map((slot) => (
                <div key={slot.slotId} className="d-flex align-items-center justify-content-between p-2">
                    <div>
                        {slot.slotName}: {slot.startTime} - {slot.endTime}
                    </div>
                    <button className="btn btn-primary w-25" onClick={() => this.handleAddSlot(slot.slotId)}>
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
            ));
    };

    render() {
        return (
            <div className="yardManager">
                <div>
                    <div className="flex" style={{ alignItems: "center", justifyContent: "space-between" }}>
                        <div className="select-court d-flex" style={{ alignItems: "center", justifyContent: "space-between" }}>
                            <label className="me-3">Chọn cơ sở: </label>
                            <select className="" style={{ height: 40 }} onChange={this.handleCourtChange}>
                                {this.renderCourtOption()}
                            </select>
                        </div>
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
                                    <i className="fa fa-search" />
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="yardWithCourtID grid grid-cols-6 gap-1 mt-4">{this.renderYardWithCourt()}</div>
                    <button className="btn btn-primary p-0 my-2 w-25 p-1" data-bs-toggle="modal" data-bs-target="#modalDsSlot">
                        <i className="fa-solid fa-plus"></i> Thêm slot
                    </button>
                    <table className="table table-hover mt-4">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên slot</th>
                                <th className="text-center">Thời gian</th>
                                <th className="text-center">Giá tiền/Slot</th>
                                <th className="text-center">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>{this.renderSlotInYard()}</tbody>
                    </table>
                </div>

                <div className="modal fade" id="modalDsSlot" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Danh sách slot
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">{this.renderSlotYardHaveNot()}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
