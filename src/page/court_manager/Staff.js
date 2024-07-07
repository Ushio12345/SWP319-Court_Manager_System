// // import React, { Component } from "react";
// // import axiosInstance from "../../config/axiosConfig";
// // import { showAlert, showConfirmAlert } from '../../utils/alertUtils';
// // import { handleTokenError } from "../../utils/tokenErrorHandle";

// // export default class Staff extends Component {
// //     state = {
// //         StaffList: [],
// //         courts: [],
// //         newStaff: {
// //             userId: "",
// //             email:"",
// //             fullName:"",
// //             profileAvatar:"",
// //             role:""
// //         },
// //         selectedCourt: "",
// //         showAlert: false,
// //         alertMessage: "",
// //         alertType: "",
// //         isDetailView: false
// //     };

// //     componentDidMount() {
// //         this.fetchCourts();
// //     }

// //     fetchCourts = () => {
// //         axiosInstance
// //             .get("/court/courts-of-owner")
// //             .then((res) => {
// //                 if (res.status === 200) {
// //                     const selectedCourt = res.data[0];
// //                     this.setState({ courts: res.data, selectedCourt: selectedCourt.courtId }, () => {
// //                         this.fetchStaffWithCourtID(selectedCourt.courtId);
// //                     });
// //                 } else {
// //                     this.handleRequestError(res);
// //                 }
// //             })
// //             .catch((error) => {
// //                 this.handleRequestError(error);
// //             });
// //     };

// //     fetchStaffWithCourtID = (selectedCourt) => {
// //         let token = localStorage.getItem("token");
// //         axiosInstance
// //             .get(`/court/staffs-of-court/${selectedCourt}`,{
// //                 headers: { Authorization: `Bearer ${token}`},
// //             })
// //             .then((res) => {
// //                 if (res.status === 200) {
// //                     this.setState({ StaffList: res.data });
// //                 } else {
// //                     this.handleRequestError(res);
// //                 }
// //             })
// //             .catch((error) => {
// //                 this.handleRequestError(error);
// //             });
// //     };

// //     handleInputChange = (event) => {
// //         const { name, value } = event.target;
// //         this.setState((prevState) => ({
// //             newStaff: {
// //                 ...prevState.newStaff,
// //                 [name]: value,
// //             },
// //         }));
// //     };


// //     handleAddStaff = (staff_id) => {
// //         const { newStaff, selectedCourt } = this.state;
// //         let token = localStorage.getItem("token");
// //         let formData = new FormData();

// //         formData.append("userId", newStaff.userId);
// //         formData.append("email", newStaff.email);
// //         formData.append("fullName", newStaff.fullName);
// //         formData.append("role", newStaff.role);
// //         if (newStaff.profileAvatar) {
// //             formData.append("profileAvatar", newStaff.profileAvatar);
// //         }

// //         axiosInstance
// //             .post(`/court/${selectedCourt}/add-staff/${staff_id}`, formData, {
// //                 headers: {
// //                     Authorization: `Bearer ${token}`
// //                 },
// //             })
// //             .then((res) => {
// //                 if (res.status === 200) {
// //                     this.fetchStaffWithCourtID(selectedCourt);
// //                     this.setState({
// //                         newStaff: {
// //                             userId: "",
// //                             email: "",
// //                             fullName: "",
// //                             profileAvatar: "",
// //                             role: ""
// //                         },
// //                     });
// //                     showAlert("success", "", "Thêm Staff thành công", "top-end");
// //                 } else {
// //                     showAlert("error", "Lỗi !", "Thêm Staff không thành công", "top-end");
// //                     console.error("Response không thành công:", res.status);
// //                 }
// //             })
// //             .catch((error) => {
// //                 if (error.response && error.response.status === 401 && error.response.data.message === "Token không hợp lệ hoặc đã hết hạn.") {
// //                     handleTokenError();
// //                 } else {
// //                     showAlert("error", "Lỗi !", "Thêm Staff không thành công", "top-end");
// //                 }
// //                 this.handleRequestError(error);
// //             });
// //     };


// //     handleDeleteStaff = (staff_id) => {
// //         showConfirmAlert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa Staff này không?", "Xóa", "center").then((result) => {
// //             if (result.isConfirmed) {
// //                 let token = localStorage.getItem("token");
// //                 console.log("Retrieved token:", token);
// //                 const {selectedCourt} = this.state;
// //                 const deleteStaff = () => {
// //                     axiosInstance
// //                         .delete(`/court/${selectedCourt}/deleteStaffFromCourt/${staff_id}`, {
// //                             headers: {
// //                                 Authorization: `Bearer ${token}`,
// //                             },
// //                         })
// //                         .then((res) => {
// //                             if (res.status === 200) {
// //                                 this.fetchStaffWithCourtID(selectedCourt);
// //                                 showAlert("success", "", "Đã xóa Staff thành công", "top-end");
// //                             } else {
// //                                 showAlert("error", "", "Xóa Staff không thành công", "top-end");
// //                             }
// //                         })
// //                         .catch((error) => {
// //                             if (
// //                                 error.response &&
// //                                 error.response.status === 401 &&
// //                                 error.response.data.message === "Token không hợp lệ hoặc đã hết hạn."
// //                             ) {
// //                                 handleTokenError();
// //                             } else {
// //                                 showAlert("error", "", "Xóa sân không thành công", "top-end");
// //                             }
// //                             console.error("Response không thành công:", error);
// //                         });
// //                 };

// //                 // Call the function after confirmation
// //                 deleteStaff();
// //             }
// //         });
// //     };


// //     handleRequestError = (error) => {
// //         let errorMessage = "Có lỗi xảy ra khi lấy dữ liệu";
// //         if (error.response) {
// //             if (error.response.status === 401 && error.response.data.message === "Token không hợp lệ hoặc đã hết hạn.") {
// //                 handleTokenError();
// //                 errorMessage = "Token không hợp lệ hoặc đã hết hạn.";
// //             } else {
// //                 errorMessage = error.response.data.message || errorMessage;
// //             }
// //         }
// //         showAlert("error", "Lỗi !", errorMessage, "top-end");
// //         console.error("Request error:", error);
// //     };

// //     renderCourtOption = () => {
// //         return this.state.courts.map((court) => (
// //             <option key={court.courtId} value={court.courtId}>
// //                 {court.courtName}
// //             </option>
// //         ));
// //     };

// //     handleCourtChange = (event) => {
// //         const courtId = event.target.value;
// //         this.setState({
// //             selectedCourt: courtId,
// //         });

// //         this.fetchStaffWithCourtID(courtId);
// //     };

// //     handleFileChange = (event) => {
// //         const file = event.target.files[0];
// //         this.setState((prevState) => ({
// //             newStaff: {
// //                 ...prevState.newStaff,
// //                 profileAvatar: file,
// //             },
// //         }));
// //     };

// //     render() {

// //         return (
// //             <div>
// //                 {/* Alert Message */}
// //                 {this.state.showAlert && (
// //                     <div className={`alert alert-${this.state.alertType} alert-dismissible fade show`} role="alert">
// //                         {this.state.alertMessage}
// //                         <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
// //                     </div>
// //                 )}
// //                 <h1 className="text-center">Danh sách nhân viên</h1>
// //                 <div className="flex" style={{ alignItems: "center", justifyContent: "space-between" }}>
// //                     <div className="select-court d-flex" style={{ alignItems: "center", justifyContent: "space-between" }}>
// //                         <label className="me-3">Chọn cơ sở: </label>
// //                         <select className="" style={{ height: 40 }} onChange={this.handleCourtChange}>
// //                             {this.renderCourtOption()}
// //                         </select>
// //                     </div>
// //                 </div>

//                 <button className="btn btn-success w-25 mb-2" data-bs-toggle="modal" data-bs-target="#addStaff">
//                     Thêm nhân viên
//                 </button>
//                 {/* Staff List */}
//                 <div className="tblStaff" id="tblStaff">
//                     <table className="table table-bordered">
//                         <thead>
//                             <tr>
//                                 <th>STT</th>
//                                 <th>ID nhân viên</th>
//                                 <th>Email</th>
//                                 <th>Tên</th>
//                                 <th>Ảnh</th>
//                                 <th>Role</th>
//                                 <th>Thao tác</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {this.state.StaffList.map((staff, index) => (
//                                 <tr key={staff.userId}>
//                                     <td className="text-center">{index + 1}</td>
//                                     <td className="text-center">{staff.userId}</td>
//                                     <td className="text-center">{staff.email}</td>
//                                     <td className="text-center">{staff.fullName}</td>
//                                     <td className="text-center">
//                                         <img src={this.state.newStaff.profileAvatar} alt="Hình ảnh Staff" className="img-fluid" />
//                                     </td>
//                                     <td className="text-center">{staff.role}</td>
//                                     <td className="d-flex">
//                                         {/* <button
//                                             className="btn btn-info mr-2 btn-action"
//                                             data-bs-toggle="modal"
//                                             data-bs-target="#detailStaff"
//                                             onClick={() => this.setState({ newStaff: staff, isDetailView: true })}
//                                         >
//                                             <i className="fa fa-info-circle"></i>
//                                         </button> */}
//                                         <button className="btn btn-danger" onClick={() => this.handleDeleteStaff(staff.userId)}>
//                                             <i className="fa fa-trash"></i>
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

// //                 {/* Add Staff Modal */}
// //                 <div className="modal fade" id="addStaff" tabIndex="-1" aria-labelledby="addStaffLabel" aria-hidden="true">
// //                     <div className="modal-dialog">
// //                         <div className="modal-content">
// //                             <div className="modal-header">
// //                                 <h4 className="modal-title">Thêm nhân viên</h4>
// //                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
// //                             </div>
// //                             <div className="modal-body">
// //                                 <div className="form-group">
// //                                     <label htmlFor="court_id">Cơ sở làm việc</label>
// //                                     <input
// //                                         id="court_id"
// //                                         name="court_id"
// //                                         className="form-control"
// //                                         placeholder="Nhập cơ sở"
// //                                         value={this.state.selectedCourt}
// //                                         onChange={this.handleInputChange}
// //                                         readOnly
// //                                     />
// //                                 </div>
// //                                 <div className="form-group">
// //                                     <label htmlFor="staff_id">Staff ID</label>
// //                                     <input
// //                                         id="staff_id"
// //                                         name="staff_id"
// //                                         className="form-control"
// //                                         placeholder="Nhập User Id"
// //                                         value={this.state.newStaff.userId}
// //                                         onChange={this.handleInputChange}
// //                                         readOnly={this.state.isDetailView}
// //                                     />
// //                                 </div>
// //                                 <div className="form-group">
// //                                     <label htmlFor="email">Email</label>
// //                                     <input
// //                                         id="email"
// //                                         name="email"
// //                                         className="form-control"
// //                                         placeholder="Nhập email Staff"
// //                                         value={this.state.newStaff.email}
// //                                         onChange={this.handleInputChange}
// //                                         readOnly={this.state.isDetailView}
// //                                     />
// //                                 </div>
// //                                 <div className="form-group">
// //                                     <label htmlFor="profileAvatar">Ảnh Staff</label>
// //                                     <input
// //                                         id="profileAvatar"
// //                                         name="profileAvatar"
// //                                         className="form-control"
// //                                         type="file"
// //                                         //value={this.state.newStaff.profileAvatar}
// //                                         onChange={this.handleFileChange}
// //                                         readOnly={this.state.isDetailView}
// //                                     />
// //                                 </div>
// //                                 <div className="form-group">
// //                                     <label htmlFor="role">Role</label>
// //                                     <input
// //                                         id="role"
// //                                         name="role"
// //                                         className="form-control"
// //                                         placeholder="role"
// //                                         value={this.state.newStaff.role}
// //                                         onChange={this.handleInputChange}
// //                                         readOnly
// //                                     />
// //                                 </div>
// //                             </div>
// //                             <div className="modal-footer">
// //                                 {!this.state.isDetailView && (
// //                                     <div className="d-flex w-100">
// //                                         <button type="button" className="btn btn-primary" onClick={this.handleAddStaff( this.state.newStaff.staff_id)}>
// //                                             Thêm mới
// //                                         </button>
// //                                     </div>
// //                                 )}
// //                                 <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
// //                                     Đóng
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         );
// //     }
// // }
