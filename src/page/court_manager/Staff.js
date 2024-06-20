import React, { Component, Profiler } from "react";
import axios from "axios";
export default class Staff extends Component {
    state = {
        StaffList: [],
        newStaff: {
            court_id: "",
            full_name: "",
            phone_number: "",
            email: "",
            profile_picture: "",
        },
        isDetailView: false,
        showAlert: false,
        alertMessage: "",
        alertType: "",
    };
    componentDidMount() {
        this.fetchStaffList();
    }

    fetchStaffList = () => {
        axios
            .get("http://localhost:3001/staff")
            .then((res) => {
                this.setState({ StaffList: res.data });
            })
            .catch((err) => {
                alert("Không thể lấy dữ liệu.");
            });
    };

    handleInputChange = (event) => {
        const { name, value, files } = event.target;
        // Kiểm tra xem trường nhập là hình ảnh
        if (files) {
            const profile_picture = URL.createObjectURL(files[0]);
            this.setState((prevState) => ({
                newStaff: {
                    ...prevState.newStaff,
                    profile_picture,
                },
            }));
        } else {
            this.setState((prevState) => ({
                newStaff: {
                    ...prevState.newStaff,
                    [name]: value,
                },
            }));
        }
    };

    handleAddStaff = () => {
        axios
            .post("http://localhost:3001/staff", this.state.newStaff)
            .then(() => {
                this.fetchStaffList();
                this.setState({
                    newStaff: {
                        court_id: "",
                        full_name: "",
                        phone_number: "",
                        email: "",
                        profile_picture: "",
                    },
                    showAlert: true,
                    alertMessage: "Thêm nhân viên thành công!",
                    alertType: "success",
                });
            })
            .catch((error) => {
                alert("Xảy ra lỗi trong quá trình thêm nhân viên. Thử lại sau!", error);
            });
    };

    handleDeleteStaff = (id) => {
        if (window.confirm("Bạn có muốn xóa nhân viên này không?")) {
            axios
                .delete(`http://localhost:3001/staff/${id}`)
                .then(() => {
                    this.fetchStaffList();
                    this.setState({
                        showAlert: true,
                        alertMessage: "Xóa cơ sở thành công!",
                        alertType: "success",
                    });
                })
                .catch((err) => {
                    alert("Có lỗi trong quá trình xóa cơ sở. Thử lại sau!", err);
                });
        }
    };

    handleUpdatetaff = () => {
        const { id, ...updateStaff } = this.state.newStaff;
        axios
            .put(`http://localhost:3001/staff/${id}`, updateStaff)
            .then(() => {
                this.fetchStaffList();
                this.setState({
                    newStaff: {
                        ...updateStaff,
                    },
                    showAlert: true,
                    alertMessage: "Cập nhật thông tin nhân viên thành công!",
                    alertType: "success",
                });
            })
            .catch(() => {
                alert("Có lỗi trong quá trình cập nhật thông tin. Vui lòng thử lại sau!");
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
                <div className="modal fade" id="detailStaff" tabIndex="-1" aria-labelledby="detailStaffLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="detailStaffLabel">
                                    Thông tin nhân viên
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <img src={this.state.newStaff.profile_picture} alt="User Image" className="img-fluid" />
                                    </div>
                                    <div className="col-md-6">
                                        <h4>{this.state.newStaff.full_name}</h4>
                                        <p>
                                            <strong>Mã nhân viên:</strong> {this.state.newStaff.id}
                                        </p>
                                        <p>
                                            <strong>Mã cơ sở:</strong> {this.state.newStaff.court_id}
                                        </p>

                                        <p>
                                            <strong>Số điện thoại:</strong> {this.state.newStaff.phone_number}
                                        </p>
                                        <p>
                                            <strong>Email:</strong> {this.state.newStaff.email}
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
                {/*  */}
                <div className="row">
                    <div className="col-md-8">
                        <button
                            id="btnThemStaff"
                            className="btn btn-success w-25"
                            data-bs-toggle="modal"
                            data-bs-target="#addStaff"
                            onClick={() => {
                                this.setState({
                                    newStaff: {
                                        court_id: "",
                                        full_name: "",
                                        phone_number: "",
                                        email: "",
                                        profile_picture: "",
                                    },
                                    isDetailView: false,
                                });
                            }}
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
                <div className="tblStaff" id="tblStaff">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>ID nhân viên</th>
                                <th className="text-start">Mã cơ sở</th>
                                <th className="text-start">Họ và tên</th>
                                <th>Số điện thoại</th>
                                <th className="text-start">Email</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.StaffList.map((staff, index) => (
                                <tr key={staff.id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{staff.id}</td>
                                    <td>{staff.court_id}</td>
                                    <td>{staff.full_name}</td>
                                    <td className="text-center">{staff.phone_number}</td>
                                    <td>{staff.email}</td>
                                    <td className="d-flex">
                                        <button
                                            className="btn btn-info mr-2"
                                            data-bs-toggle="modal"
                                            data-bs-target="#detailStaff"
                                            onClick={() => this.setState({ newStaff: staff, isDetailView: true })}
                                        >
                                            <i className="fa fa-info-circle"></i>
                                        </button>
                                        <button
                                            className="btn btn-warning mr-2"
                                            data-bs-toggle="modal"
                                            data-bs-target="#updateStaff"
                                            onClick={() => this.setState({ newStaff: staff, isDetailView: false })}
                                        >
                                            <i className="fa fa-pen-to-square"></i>
                                        </button>
                                        <button className="btn btn-danger" onClick={() => this.handleDeleteStaff(staff.id)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* END TABLE SẢN PHẨM */}
                </div>
                <br />

                {/*-them mơi cập nhât modal Staff-*/}
                <div className="modal fade" id="addStaff" tabIndex="-1" aria-labelledby="addStaffLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* Modal Header */}
                            <div className="modal-header">
                                <h4 className="modal-title">Thêm nhân viên</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            {/* Modal body */}
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="full_name">Tên nhân viên</label>
                                    <input
                                        id="full_name"
                                        name="full_name"
                                        className="form-control"
                                        placeholder="Nhập vào tên nhân viên"
                                        value={this.state.newStaff.full_name}
                                        onChange={this.handleInputChange}
                                        readOnly={this.state.isDetailView}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone_number">Điện thoại</label>
                                    <input
                                        id="phone_number"
                                        name="phone_number"
                                        className="form-control"
                                        placeholder="Nhập số điện thoại"
                                        value={this.state.newStaff.phone_number}
                                        onChange={this.handleInputChange}
                                        readOnly={this.state.isDetailView}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Nhập địa chỉ email"
                                        type="email"
                                        value={this.state.newStaff.email}
                                        onChange={this.handleInputChange}
                                        readOnly={this.state.isDetailView}
                                    />
                                </div>
                                <div className="form-group">
                                    <labe htmlFor="court_id">Cơ sở làm việc</labe>
                                    <input
                                        id="court_id"
                                        name="court_id"
                                        className="form-control"
                                        placeholder="Nhập cơ sở"
                                        value={this.state.newStaff.court_id}
                                        onChange={this.handleInputChange}
                                        readOnly={this.state.isDetailView}
                                    />
                                </div>

                                <div className="modal-footer">
                                    {!this.state.isDetailView && (
                                        <div className="d-flex w-100">
                                            <button type="button" className="btn btn-primary" onClick={this.handleAddStaff}>
                                                Thêm mới
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
                </div>

                <div className="modal fade" id="updateStaff" tabIndex="-1" aria-labelledby="addStaffLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* Modal Header */}
                            <div className="modal-header">
                                <h4 className="modal-title">Cập nhật thông tin nhân viên</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            {/* Modal body */}
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="full_name">Tên nhân viên</label>
                                    <input
                                        id="full_name"
                                        name="full_name"
                                        className="form-control"
                                        placeholder="Nhập vào tên nhân viên"
                                        value={this.state.newStaff.full_name}
                                        onChange={this.handleInputChange}
                                        readOnly={this.state.isDetailView}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone_number">Điện thoại</label>
                                    <input
                                        id="phone_number"
                                        name="phone_number"
                                        className="form-control"
                                        placeholder="Nhập số điện thoại"
                                        value={this.state.newStaff.phone_number}
                                        onChange={this.handleInputChange}
                                        readOnly={this.state.isDetailView}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Nhập địa chỉ email"
                                        type="email"
                                        value={this.state.newStaff.email}
                                        onChange={this.handleInputChange}
                                        readOnly={this.state.isDetailView}
                                    />
                                </div>
                                <div className="form-group">
                                    <labe htmlFor="court_id">Cơ sở làm việc</labe>
                                    <input
                                        id="court_id"
                                        name="court_id"
                                        className="form-control"
                                        placeholder="Nhập cơ sở"
                                        value={this.state.newStaff.court_id}
                                        onChange={this.handleInputChange}
                                        readOnly={this.state.isDetailView}
                                    />
                                </div>

                                <div className="modal-footer">
                                    {!this.state.isDetailView && (
                                        <div className="d-flex w-100">
                                            <button type="button" className="btn btn-success " onClick={this.handleUpdatetaff}>
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
                </div>
                {/* kết thúc modal newStaff */}
            </div>
        );
    }
}
