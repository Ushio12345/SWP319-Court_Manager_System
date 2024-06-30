import React, { Component } from "react";
import "./style.css";
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
            },
            errors: {
                username: "",
            },
        };
    }

    componentDidMount() {
        this.fetchUserFromLocalStorage();
    }

    fetchUserFromLocalStorage() {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            this.setState({
                isLoggedIn: true,
                user: {
                    username: user.fullName,
                    avatar: user.imageUrl,
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
            },
        });
        window.location.href = "/";
    };

    validateField = (name, value) => {
        let error = "";

        if (name === "username") {
            if (value.length === 0) {
                error = "Vui lòng nhập tên người dùng";
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

    handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState((prevState) => ({
                    user: {
                        ...prevState.user,
                        avatar: reader.result,
                    },
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validateForm()) {
            const { user } = this.state;
            localStorage.setItem("user", JSON.stringify(user));
            alert("Cập nhật thông tin thành công!");
            this.setState({
                user,
            });
        }
    };

    validateForm = () => {
        const { username } = this.state.user;
        const errors = {};

        if (username.length === 0) {
            errors.username = "Vui lòng nhập tên người dùng";
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
                                <input type="file" onChange={this.handleAvatarChange} />
                                Chỉnh sửa
                            </label>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="username" className="form-label">
                                Họ và tên:
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.username ? "is-invalid" : ""}`}
                                id="username"
                                name="username"
                                value={user.username}
                                onChange={this.handleInputChange}
                            />
                            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
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
