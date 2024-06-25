import React, { Component } from "react";
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
        courts: [],
        newCourt: {
            court_name: "",
            address: "",
            open_time: "",
            close_time: "",

            rate: "",
            user_id: "",
        },

        showAlert: false,
        alertMessage: "",
        alertType: "",
    };

    componentDidMount() {
        this.fetchStaffList();
        this.fetchCourts();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedCourtId !== this.props.selectedCourtId) {
            this.fetchStaffList();
        }
    }
    fetchCourts = () => {
        axios
            .get("http://localhost:3001/court")
            .then((res) => {
                this.setState({ courts: res.data });
            })
            .catch((err) => {
                alert("Không thể lấy dữ liệu từ API");
            });
    };
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
        const staffToAdd = { ...this.state.newStaff, court_id: this.props.selectedCourtId };
        axios
            .post("http://localhost:3001/staff", staffToAdd)
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

    handleUpdateStaff = () => {
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
        const filteredStaffList = this.state.StaffList.filter((staff) => staff.court_id === this.props.selectedCourtId);

        return (
            <div>
                {/* Alert Message */}
                {this.state.showAlert && (
                    <div className={`alert alert-${this.state.alertType} alert-dismissible fade show`} role="alert">
                        {this.state.alertMessage}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )}
                <h1 className="text-center">Danh sách nhân viên</h1>

                <button className="btn btn-success w-25 mb-2" data-bs-toggle="modal" data-bs-target="#addStaff">
                    Thêm nhân viên
                </button>
                {/* Staff List */}
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
                            {filteredStaffList.map((staff, index) => (
                                <tr key={staff.id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{staff.id}</td>
                                    <td>{staff.court_id}</td>
                                    <td>{staff.full_name}</td>
                                    <td className="text-center">{staff.phone_number}</td>
                                    <td>{staff.email}</td>
                                    <td className="d-flex">
                                        {/* <button
                                            className="btn btn-info mr-2 btn-action"
                                            data-bs-toggle="modal"
                                            data-bs-target="#detailStaff"
                                            onClick={() => this.setState({ newStaff: staff, isDetailView: true })}
                                        >
                                            <i className="fa fa-info-circle"></i>
                                        </button> */}
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
                </div>

                {/* Add Staff Modal */}
                <div className="modal fade" id="addStaff" tabIndex="-1" aria-labelledby="addStaffLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Thêm nhân viên</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
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
                                    <label htmlFor="court_id">Cơ sở làm việc</label>
                                    <input
                                        id="court_id"
                                        name="court_id"
                                        className="form-control"
                                        placeholder="Nhập cơ sở"
                                        value={this.props.selectedCourtId}
                                        onChange={this.handleInputChange}
                                        readOnly
                                    />
                                </div>
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

                {/* Update Staff Modal */}
                <div className="modal fade" id="updateStaff" tabIndex="-1" aria-labelledby="addStaffLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Cập nhật thông tin nhân viên</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
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
                                    <label htmlFor="court_id_update">Cơ sở làm việc</label>
                                    <select
                                        id="court_id_update"
                                        name="court_id"
                                        className="form-control"
                                        value={this.state.newStaff.court_id}
                                        onChange={this.handleInputChange}
                                    >
                                        <option value="">Chọn cơ sở làm việc</option>
                                        {this.state.courts.map((court) => (
                                            <option key={court.id} value={court.id}>
                                                {court.court_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                {!this.state.isDetailView && (
                                    <div className="d-flex w-100">
                                        <button type="button" className="btn btn-success" onClick={this.handleUpdateStaff}>
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
        );
    }
}
