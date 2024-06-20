import React, { Component } from "react";
import Slot from "./Slot";
import axios from "axios";
export default class Yard extends Component {
    state = {
        Yards: [],
        yardOb: {
            id: "",
            yard_name: "",
            slots: [],
            court_id: "",
        },
        activeTab: 0,
        newYardName: "",
    };

    componentDidMount() {
        this.fetchYard();
    }

    fetchYard = () => {
        axios
            .get("http://localhost:3001/yard")
            .then((res) => {
                this.setState({ Yards: res.data });
            })
            .catch((err) => {
                alert("Không thể lấy dữ liệu từ API");
            });
    };

    handleInputChange = (event) => {
        const { name, value, files } = event.target;
        if (files && files.length > 0) {
            this.setState((prevState) => ({
                yardOb: {
                    ...prevState.yardOb,
                    [name]: files[0],
                },
            }));
        } else {
            this.setState((prevState) => ({
                yardOb: {
                    ...prevState.yardOb,
                    [name]: value,
                },
            }));
        }
    };

    handleAddYard = () => {
        axios
            .post("http://localhost:3001/yard", this.state.yardOb)
            .then(() => {
                this.fetchYard();
                this.setState({
                    yardOb: {
                        id: "",
                        yard_name: "",
                        slots: [],
                        court_id: "",
                    },
                    showAlert: true,
                    alertMessage: "Thêm sân mới thành công!",
                    alertType: "success",
                });
            })
            .catch((error) => {
                alert("Có lỗi khi thêm sân!", error);
            });
    };

    handleDeleteYard = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sân này?")) {
            axios
                .delete(`http://localhost:3001/court/${id}`)
                .then(() => {
                    this.fetchYard();
                    this.setState({
                        showAlert: true,
                        alertMessage: "Xóa sân thành công!",
                        alertType: "success",
                    });
                })
                .catch((error) => {
                    alert("Có lỗi khi xóa cơ sở!", error);
                });
        }
    };

    handleUpdateCourt = () => {
        const { id, ...updatedCourt } = this.state.yardOb;
        axios
            .put(`http://localhost:3001/court/${id}`, updatedCourt)
            .then(() => {
                this.fetchYard();
                this.setState({
                    yardOb: {
                        ...updatedCourt,
                    },
                    showAlert: true,
                    alertMessage: "Cập nhật cơ sở thành công!",
                    alertType: "success",
                });
            })
            .catch((error) => {
                alert("Có lỗi khi cập nhật cơ sở!", error);
            });
    };

    render() {
        const { Yards, activeTab, newYardName } = this.state;

        return (
            <div className="YardComponent">
                <h1 className="text-center">Thông tin quản lí sân</h1>

                <div className="d-flex mb-3" style={{ justifyContent: "space-between", alignItems: "center" }}>
                    <select className="bg-secondary text-white" style={{ height: "40px", width: "20%" }}>
                        <option>CLB Cầu Lông</option>
                        <option>CLB Bóng đá</option>
                    </select>
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

                <div className="tabContent mb-4">
                    <ul className="nav nav-tabs">
                        {Yards.map((yard, index) => (
                            <li className="nav-item" key={yard.id}>
                                <button className={`nav-link ${activeTab === index ? "active" : ""}`} onClick={() => this.handleTabChange(index)}>
                                    {yard.yard_name}
                                </button>
                            </li>
                        ))}
                        <li className="nav-item">
                            <button
                                className="nav-link"
                                data-bs-toggle="modal"
                                data-bs-target="#addYardModal"
                                onClick={() => this.handleTabChange(Yards.length)}
                            >
                                Thêm sân
                            </button>
                        </li>
                    </ul>
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
                                        placeholder="Nhập tên sân"
                                        value={newYardName}
                                        onChange={this.handleInputChange}
                                    />
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

                <div className="row">
                    <div className="col-lg-7">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th colSpan={5}>Sân 1</th>
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Danh sách Slot</th>

                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                    <div className="col-lg-5">
                        <Slot />
                    </div>
                </div>
            </div>
        );
    }
}
