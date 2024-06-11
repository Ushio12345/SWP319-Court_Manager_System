import axios from "axios";
import React, { Component } from "react";

export default class extends Component {
    state = {
        courts: [],
        newCourt: {
            court_id: "",
            court_name: "",
            address: "",
            open_time: "",
            close_time: "",
            numberOfCourt: "",
            rate: "",
            user_id: "",
            imgURL: "",
        },
        isDetailView: false,
        showAlert: false,
        alertMessage: "",
        alertType: "",
    };

    componentDidMount() {
        this.fetchCourts();
    }

    fetchCourts = () => {
        axios
            .get("http://localhost:3000/court")
            .then((res) => {
                this.setState({ courts: res.data });
            })
            .catch((err) => {
                alert("Không thể lấy dữ liệu từ API");
            });
    };

    handleInputChange = (event) => {
        const { name, value, files } = event.target;
        if (files && files.length > 0) {
            this.setState((prevState) => ({
                newCourt: {
                    ...prevState.newCourt,
                    [name]: files[0],
                },
            }));
        } else {
            this.setState((prevState) => ({
                newCourt: {
                    ...prevState.newCourt,
                    [name]: value,
                },
            }));
        }
    };

    handleAddCourt = () => {
        axios
            .post("http://localhost:3000/court", this.state.newCourt)
            .then(() => {
                this.fetchCourts();
                this.setState({
                    newCourt: {
                        court_id: "",
                        court_name: "",
                        address: "",
                        open_time: "",
                        close_time: "",
                        numberOfCourt: "",
                        imgURL: "",
                    },
                    showAlert: true,
                    alertMessage: "Thêm cơ sở thành công!",
                    alertType: "success",
                });
            })
            .catch((error) => {
                alert("Có lỗi khi thêm cơ sở!", error);
            });
    };

    handleDeleteCourt = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa cơ sở này?")) {
            axios
                .delete(`http://localhost:3000/court/${id}`)
                .then(() => {
                    this.fetchCourts();
                    this.setState({
                        showAlert: true,
                        alertMessage: "Xóa cơ sở thành công!",
                        alertType: "success",
                    });
                })
                .catch((error) => {
                    alert("Có lỗi khi xóa cơ sở!", error);
                });
        }
    };

    handleUpdateCourt = () => {
        const { id, ...updatedCourt } = this.state.newCourt;
        axios
            .put(`http://localhost:3000/court/${id}`, updatedCourt)
            .then(() => {
                this.fetchCourts();
                this.setState({
                    newCourt: {
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
                                    Chi tiết sân
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <img src={this.state.newCourt.imgURL} alt="Court Image" className="img-fluid" />
                                    </div>
                                    <div className="col-md-6">
                                        <h1>{this.state.newCourt.court_name}</h1>
                                        <p>
                                            <strong>Mã cơ sở:</strong> {this.state.newCourt.id}
                                        </p>
                                        <p>
                                            <strong>Tên cơ sở:</strong> {this.state.newCourt.court_name}
                                        </p>
                                        <p>
                                            <strong>Địa chỉ:</strong> {this.state.newCourt.address}
                                        </p>
                                        <p>
                                            <strong>Khung giờ hoạt động:</strong> {this.state.newCourt.open_time} - {this.state.newCourt.close_time}
                                        </p>
                                        <p>
                                            <strong>Số sân:</strong> {this.state.newCourt.numberOfCourt}
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

                <h1 className="text-center">Thông tin quản lí cơ sở</h1>

                <div className="row">
                    <div className="col-md-8">
                        <button
                            id="btnThemCoSo"
                            className="btn btn-primary w-25"
                            data-bs-toggle="modal"
                            data-bs-target="#addNewCourt"
                            onClick={() =>
                                this.setState({
                                    newCourt: {
                                        court_id: "",
                                        court_name: "",
                                        address: "",
                                        open_time: "",
                                        close_time: "",
                                        numberOfCourt: "",
                                        rate: "",
                                        user_id: "",
                                        imgURL: "",
                                    },
                                    isDetailView: false,
                                })
                            }
                        >
                            <i className="fa fa-plus mr-1" />
                            Thêm Mới
                        </button>
                    </div>
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
                                <th>Mã cơ sở</th>
                                <th className="text-start">Tên Cơ Sở</th>
                                <th className="text-start">Địa chỉ</th>
                                <th>Giờ làm việc</th>
                                <th>Số sân</th>
                                <th>Đánh giá</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.courts.map((court, index) => (
                                <tr key={court.id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{court.id}</td>
                                    <td className="text-start">{court.court_name}</td>
                                    <td>{court.address}</td>
                                    <td className="text-center">{`${court.open_time} - ${court.close_time}`}</td>
                                    <td className="text-center">{court.numberOfCourt}</td>
                                    <td className="text-center">4/5</td>
                                    <td className="d-flex">
                                        <button
                                            className="btn btn-info mr-2"
                                            data-bs-toggle="modal"
                                            data-bs-target="#detailModal"
                                            onClick={() => this.setState({ newCourt: court, isDetailView: true })}
                                        >
                                            <i className="fa fa-info-circle"></i>
                                        </button>
                                        <button
                                            className="btn btn-warning mr-2"
                                            data-bs-toggle="modal"
                                            data-bs-target="#updateCourt"
                                            onClick={() => this.setState({ newCourt: court, isDetailView: false })}
                                        >
                                            <i className="fa fa-pen-to-square"></i>
                                        </button>
                                        <button className="btn btn-danger" onClick={() => this.handleDeleteCourt(court.id)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <br />

                {/* Modal Thêm Mới/Cập Nhật */}
                <div className="modal fade" id="addNewCourt" tabIndex="-1" aria-labelledby="addStaffLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="text-center">Điền thông tin sân</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="court_id">Mã cơ sở</label>
                                    <input
                                        id="court_id"
                                        name="court_id"
                                        className="form-control"
                                        placeholder="Mã cơ sở"
                                        value={this.state.newCourt.id}
                                        onChange={this.handleInputChange}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="court_name">Tên cơ sở</label>
                                    <input
                                        id="court_name"
                                        name="court_name"
                                        className="form-control"
                                        placeholder="Nhập tên cơ sở"
                                        value={this.state.newCourt.court_name}
                                        onChange={this.handleInputChange}
                                        readOnly={this.state.isDetailView}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Địa chỉ</label>
                                    <input
                                        id="address"
                                        name="address"
                                        className="form-control"
                                        placeholder="Nhập địa chỉ"
                                        value={this.state.newCourt.address}
                                        onChange={this.handleInputChange}
                                        readOnly={this.state.isDetailView}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="open_time">Khung giờ hoạt động</label>
                                    <input
                                        id="open_time"
                                        name="open_time"
                                        className="form-control"
                                        placeholder="Nhập giờ mở cửa (7:00)"
                                        value={this.state.newCourt.open_time}
                                        onChange={this.handleInputChange}
                                        readOnly={this.state.isDetailView}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="close_time">Khung giờ đóng cửa</label>
                                    <input
                                        id="close_time"
                                        name="close_time"
                                        className="form-control"
                                        placeholder="Nhập giờ đóng cửa"
                                        value={this.state.newCourt.close_time}
                                        onChange={this.handleInputChange}
                                        readOnly={this.state.isDetailView}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="numberOfCourt">Số sân</label>
                                    <input
                                        id="numberOfCourt"
                                        name="numberOfCourt"
                                        className="form-control"
                                        placeholder="Nhập số sân"
                                        value={this.state.newCourt.numberOfCourt}
                                        onChange={this.handleInputChange}
                                        readOnly={this.state.isDetailView}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="imgURL">Hình ảnh</label>
                                    <input
                                        id="imgURL"
                                        name="imgURL"
                                        type="file"
                                        className="form-control"
                                        // value={this.state.newCourt.imgURL}
                                        onChange={this.handleInputChange}
                                        readOnly={this.state.isDetailView}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                {!this.state.isDetailView && (
                                    <div className="d-flex w-100">
                                        <button type="button" className="btn btn-primary " onClick={this.handleAddCourt}>
                                            Thêm sân
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

                <div className="modal fade" id="updateCourt" tabIndex="-1" aria-labelledby="addStaffLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4>Cập nhật thông tin</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="court_id">Mã cơ sở</label>
                                    <input
                                        id="court_id"
                                        name="court_id"
                                        className="form-control"
                                        placeholder="Mã cơ sở"
                                        value={this.state.newCourt.id}
                                        onChange={this.handleInputChange}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="court_name">Tên cơ sở</label>
                                    <input
                                        id="court_name"
                                        name="court_name"
                                        className="form-control"
                                        placeholder="Nhập tên cơ sở"
                                        value={this.state.newCourt.court_name}
                                        onChange={this.handleInputChange}
                                        readOnly={this.state.isDetailView}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Địa chỉ</label>
                                    <input
                                        id="address"
                                        name="address"
                                        className="form-control"
                                        placeholder="Nhập địa chỉ"
                                        value={this.state.newCourt.address}
                                        onChange={this.handleInputChange}
                                        readOnly={this.state.isDetailView}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="open_time">Khung giờ hoạt động</label>
                                    <input
                                        id="open_time"
                                        name="open_time"
                                        className="form-control"
                                        placeholder="Nhập giờ mở cửa (7:00)"
                                        value={this.state.newCourt.open_time}
                                        onChange={this.handleInputChange}
                                        readOnly={this.state.isDetailView}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="close_time">Khung giờ đóng cửa</label>
                                    <input
                                        id="close_time"
                                        name="close_time"
                                        className="form-control"
                                        placeholder="Nhập giờ đóng cửa"
                                        value={this.state.newCourt.close_time}
                                        onChange={this.handleInputChange}
                                        readOnly={this.state.isDetailView}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="numberOfCourt">Số sân</label>
                                    <input
                                        id="numberOfCourt"
                                        name="numberOfCourt"
                                        className="form-control"
                                        placeholder="Nhập số sân"
                                        value={this.state.newCourt.numberOfCourt}
                                        onChange={this.handleInputChange}
                                        readOnly={this.state.isDetailView}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="imgURL">Hình ảnh</label>
                                    <input
                                        id="imgURL"
                                        name="imgURL"
                                        type="file"
                                        className="form-control"
                                        // value={this.state.newCourt.imgURL}
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
                {/* Kết thúc Modal Thêm Mới/Cập Nhật */}
            </div>
        );
    }
}
