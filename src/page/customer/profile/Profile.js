import React, { Component } from "react";
import "./style.css";
import HeaderLoginForm from "../../../components/header-login-form";
import Footer from "../../../components/footer";
import Header from "../../../components/header";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: {
                username: "",
                avatar: "",
                email: "",
                password: "",
                phone: "",
                balance: 0,
                roles: [],
            },
            errors: {
                email: "",
                password: "",
                phone: "",
            },
        };
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            this.setState({
                isLoggedIn: true,
                user: {
                    username: user.fullName,
                    avatar: user.imageUrl,
                    email: user.email,
                    phone: user.phone,
                    balance: user.balance,
                    roles: user.roles,
                },
            });
        }
    }

    handleLogout = () => {
        localStorage.removeItem("user");

        this.setState({
            isLoggedIn: false,
            user: {
                username: "",
                avatar: "",
                email: "",
                password: "",
                phone: "",
                balance: 0,
                roles: [],
            },
        });

        window.location.href = "/";
    };

    validateField = (name, value) => {
        let error = "";

        if (name === "email") {
            if (!value.endsWith("@gmail.com")) {
                error = "Email phải kết thúc bằng @gmail.com";
            }
        } else if (name === "password") {
            if (value.length < 8) {
                error = "Mật khẩu phải có ít nhất 8 ký tự";
            }
        } else if (name === "phone") {
            if (value.length !== 10 || !/^\d{10}$/.test(value)) {
                error = "Số điện thoại phải có đúng 10 chữ số";
            }
        }

        this.setState((prevState) => ({
            errors: {
                ...prevState.errors,
                [name]: error,
            },
        }));
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                [name]: value,
            },
        }));

        this.validateField(name, value);
    };

    handleBlur = (e) => {
        const { name, value } = e.target;
        this.validateField(name, value);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validateForm()) {
            // Handle form submission
        }
    };

    validateForm = () => {
        const { email, password, phone } = this.state.user;
        const errors = {};

        if (!email.endsWith("@gmail.com")) {
            errors.email = "Email phải kết thúc bằng @gmail.com";
        }

        if (password.length < 8) {
            errors.password = "Mật khẩu phải có ít nhất 8 ký tự";
        }

        if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
            errors.phone = "Số điện thoại phải có đúng 10 chữ số";
        }

        this.setState({ errors });

        return Object.keys(errors).length === 0;
    };

    render() {
        const { isLoggedIn, user, errors } = this.state;
        return (
            <div className="profile">
                <section className="header">
                    <Header isLoggedIn={isLoggedIn} user={user} handleLogout={this.handleLogout} />
                </section>
                <div className="form-showProfile w-1/3 my-5 m-auto">
                    <form className="showProfile" onSubmit={this.handleSubmit}>
                        <div className="showProfile-title">
                            <h3>Thông tin của bạn</h3>
                        </div>
                        <div className="showAvatar text-center">
                            <img src={user.avatar} alt="User Avatar" />
                            <label className="custom-file-upload" style={{ cursor: "pointer" }}>
                                <input type="file" />
                                Chỉnh sửa
                            </label>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="username" className="form-label">
                                Họ và tên:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={user.username}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="email" className="form-label">
                                Email:
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={user.email}
                                onChange={this.handleInputChange}
                                onBlur={this.handleBlur}
                            />
                            {errors.email && <small className="text-danger">{errors.email}</small>}
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="form-label">
                                Mật khẩu:
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={user.password}
                                onChange={this.handleInputChange}
                                onBlur={this.handleBlur}
                            />
                            {errors.password && <small className="text-danger">{errors.password}</small>}
                        </div>
                        <div className="mb-2">
                            <label htmlFor="phone" className="form-label">
                                Số điện thoại:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={user.phone}
                                onChange={this.handleInputChange}
                                onBlur={this.handleBlur}
                            />
                            {errors.phone && <small className="text-danger">{errors.phone}</small>}
                        </div>
                        <div className="mb-2">
                            <label htmlFor="balance" className="form-label">
                                Số dư giờ đã nạp
                            </label>
                            <input type="number" className="form-control" id="balance" name="balance" readOnly value={user.balance} />
                        </div>
                        <button className="btn btn-primary m-0 p-2" type="submit">
                            Cập nhật thay đổi
                        </button>
                    </form>
                </div>
                <Footer />
            </div>
        );
    }
}
