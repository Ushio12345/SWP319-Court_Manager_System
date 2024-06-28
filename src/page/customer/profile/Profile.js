import React, { Component } from "react";
import "./style.css";
import HeaderLoginForm from "../../../components/header-login-form";
export default class Profile extends Component {
    render() {
        return (
            <div className="profile">
                <HeaderLoginForm />
                <div className="form-showProfile w-1/3 my-5">
                    <div className="showProfile ">
                        <div className="showProfile-title">
                            <h3>Thông tin của bạn</h3>
                        </div>
                        <div className="showAvatar text-center">
                            <img src="https://i.pravatar.cc/150?img=3" alt="User Avatar" />
                            <label className="custom-file-upload" style={{ cursor: "pointer" }}>
                                <input type="file" />
                                Chỉnh sửa
                            </label>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="name" className="form-label">
                                Họ và tên:
                            </label>
                            <input type="text" className="form-control" id="name" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="email" className="form-label">
                                Email:
                            </label>
                            <input type="email" className="form-control" id="email" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="phone" className="form-label">
                                Số điện thoại:
                            </label>
                            <input type="text" className="form-control" id="phone" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="balance" className="form-label">
                                Số dư giờ đã nạp
                            </label>
                            <input type="number" className="form-control" id="balance" readOnly value={1} />
                        </div>
                        <button className="btn btn-primary m-0 p-2">Cập nhật thay đổi</button>
                    </div>
                </div>
            </div>
        );
    }
}
