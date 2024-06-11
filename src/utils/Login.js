import { Component } from "react";
import Footer from "../componets/Footer";
import "../css/login.css";
import { redirect } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: "",
            password: "",
            redirectToRoleSelection: false // Thêm state để kiểm soát việc chuyển hướng
        };
    }

    setParams = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    login = (event) => {
        event.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            emailOrPhoneNumber: this.state.phoneNumber,
            password: this.state.password
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://167.99.67.127:8080/forbad/auth/signin", requestOptions)
            .then((response) => {
                if (response.status === 200) {
                    return response.json(); // Convert response to JSON object
                } else {
                    alert("Đăng nhập không thành công !");
                }
            })
            .then((data) => {
                if (data) { // Ensure data is not null or undefined
                    // Check the user's role
                    if (data.role === "temp") {
                        // Lưu thông tin người dùng vào sessionStorage
                        sessionStorage.setItem('userData', JSON.stringify(data));
                        // Cập nhật state để chuyển hướng đến trang chọn vai trò
                        this.setState({ redirectToRoleSelection: true });
                    } else {
                        // Call authenticate API with the obtained data
                        fetch("http://167.99.67.127:8080/forbad/auth/authenticate", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(data), // Send the user data to the authenticate API
                        })
                            .then((authResponse) => {
                                if (authResponse.status === 200) {
                                    return authResponse.json();
                                } else {
                                    alert("Đăng nhập thất bại !");
                                }
                            })
                            .then((authData) => {
                                if (authData && authData.accessToken) {
                                    // Store the JWT token in localStorage
                                    localStorage.setItem('jwtToken', authData.accessToken);
                                    localStorage.setItem('tokenExpiration', authData.expirationTime);
                                    console.log("Authentication successful");
                                    // Redirect to a protected page or perform other actions
                                }
                            })
                            .catch((authError) => {
                                alert(authError.message); // Show error message if authentication fails
                                console.error(authError);
                            });
                    }
                }
            })
            .catch((error) => {
                alert(error.message); // Show error message if there is an error during login
                console.error(error);
            });
    }

    login_google = (event) => {
        fetch("http://localhost:8080/forbad/auth/google")
            .then((response) => response.json())
            .then((data) => {
                // Redirect to the Google login URL
                window.location.href = data.redirectUrl;
            })
            .catch((error) => console.error(error));
    }

    render() {
        if (this.state.redirectToRoleSelection) {
            return <redirect to="/role-selection" />; // Chuyển hướng nếu cần
        }

        return (
            <div>
                <p id="wrong-repass" className="text-danger text-bold fw-bolder"></p>
                <div className="header-login-form">
                    <div className="container d-flex align-items-center justify-content-between">
                        <div className="header-login-form-left">
                            <div className="logo-header-login">
                                <img src="asserts/img/logo-cau-long-dep-01.png" alt="Logo" />
                            </div>
                            <div className="name-page">
                                <p className="m-0">Đăng nhập</p>
                            </div>
                        </div>
                        <div className="header-login-form-right m-0">
                            <a href="Guest.jsx">
                                Trở về trang chủ <i className="fa-solid fa-arrow-right" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="login-form" id="Login-form">
                    <div className="login-left">
                        <img src="asserts/img/logo-cau-long-dep-01.png" alt="Logo" />
                    </div>
                    <div className="login-right">
                        <form onSubmit={this.login}>
                            <h1>Đăng nhập</h1>
                            <div className="name-phone d-flex">
                                <div className="input-box">
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="Số điện thoại"
                                        id="phoneNumber"
                                        value={this.state.phoneNumber}
                                        onChange={this.setParams}
                                    />
                                    <i className="fa-solid fa-user" />
                                    <p id="userName-error" className="text-danger"></p>
                                </div>
                            </div>
                            <div className="input-box">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Mật khẩu"
                                    id="password"
                                    value={this.state.password}
                                    onChange={this.setParams}
                                />
                                <i className="fa-solid fa-lock" />
                                <p id="email-error" className="text-danger"></p>
                            </div>
                            <div className="remember-forgot">
                                <label><input type="checkbox" />Nhớ mật khẩu</label>
                                <a href="#">Quên mật khẩu</a>
                            </div>
                            <p id="wrong-repass" className="text-danger text-bold fw-bolder"></p>
                            <div>
                                <button className="btn btn-success p-2" type="submit">
                                    Đăng nhập
                                </button>
                            </div>
                            <div className="divider">
                                <span>hoặc tiếp tục với</span>
                            </div>
                            <div className="login-with">
                                <div className="gmail">
                                    <button className="btn btn-danger p-2" onClick={this.login_google}>
                                        <i className="fa-brands fa-google" /> Google
                                    </button>
                                </div>
                            </div>
                            <div className="register-link">
                                <p>
                                    Bạn chưa có tài khoản? <a href="Register.js">Đăng ký</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}