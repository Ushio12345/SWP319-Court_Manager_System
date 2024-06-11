import React, { Component, createRef } from "react";
import Footer from "../../componets/Footer";
import axios from "axios"; // Import axios library
import "../../css/login.css";
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.passwordRef = createRef();
        this.rePasswordRef = createRef();
        this.lockRef = createRef();
        this.lockReRef = createRef();
    }

    componentDidMount() {
        this.lockRef.current.addEventListener("click", this.togglePasswordVisibility);
        this.lockReRef.current.addEventListener("click", this.togglePasswordVisibility);
    }

    componentWillUnmount() {
        this.lockRef.current.removeEventListener("click", this.togglePasswordVisibility);
        this.lockReRef.current.removeEventListener("click", this.togglePasswordVisibility);
    }

    togglePasswordVisibility = (event) => {
        const target = event.target;
        const targetInput = target.dataset.target === "password" ? this.passwordRef.current : this.rePasswordRef.current;
        const type = targetInput.getAttribute("type") === "password" ? "text" : "password";
        targetInput.setAttribute("type", type);
        target.classList.toggle("fa-lock");
        target.classList.toggle("fa-eye");
    };

    getInformationRegister = async (event) => {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const phoneNumber = document.getElementById("phoneNumber").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const rePassword = document.getElementById("re-password").value.trim();

        const errorMessages = {
            fullName: "Tên đầy đủ phải ít hơn 100 ký tự.",
            phoneNumber: "Số điện thoại phải có từ 10 đến 11 số.",
            email: "Bạn chưa nhập email.",
            password: "Mật khẩu phải có từ 8 đến 120 ký tự.",
            rePassword: "Bạn chưa nhập lại mật khẩu.",
        };

        const fullNameError = document.getElementById("fullName-error");
        const phoneNumberError = document.getElementById("phoneNumber-error");
        const emailError = document.getElementById("email-error");
        const passwordError = document.getElementById("password-error");
        const rePasswordError = document.getElementById("re-password-error");
        const wrongRepass = document.getElementById("wrong-repass");

        // Clear previous error messages
        if (fullNameError) fullNameError.innerHTML = "";
        if (phoneNumberError) phoneNumberError.innerHTML = "";
        if (emailError) emailError.innerHTML = "";
        if (passwordError) passwordError.innerHTML = "";
        if (rePasswordError) rePasswordError.innerHTML = "";
        if (wrongRepass) wrongRepass.innerHTML = "";

        let isValid = true;

        if (!fullName) {
            if (fullNameError) fullNameError.innerHTML = "Bạn chưa nhập tên đăng nhập.";
            isValid = false;
        } else if (fullName.length > 100) {
            if (fullNameError) fullNameError.innerHTML = errorMessages.fullName;
            isValid = false;
        }

        if (!phoneNumber) {
            if (phoneNumberError) phoneNumberError.innerHTML = "Bạn chưa nhập số điện thoại.";
            isValid = false;
        } else if (!/^\d{10,11}$/.test(phoneNumber)) {
            if (phoneNumberError) phoneNumberError.innerHTML = errorMessages.phoneNumber;
            isValid = false;
        }

        if (!email) {
            if (emailError) emailError.innerHTML = errorMessages.email;
            isValid = false;
        }

        if (!password) {
            if (passwordError) passwordError.innerHTML = "Bạn chưa nhập password.";
            isValid = false;
        } else if (password.length < 8 || password.length > 120) {
            if (passwordError) passwordError.innerHTML = errorMessages.password;
            isValid = false;
        }

        if (!rePassword) {
            if (rePasswordError) rePasswordError.innerHTML = errorMessages.rePassword;
            isValid = false;
        }

        if (!isValid) return;

        if (password !== rePassword) {
            if (wrongRepass) wrongRepass.innerHTML = "Mật khẩu chưa khớp. Xin vui lòng nhập lại!";
            return;
        }

        async function checkEmailExists(email) {
            fetch("http://167.99.67.127:8080/forbad/auth/signup")
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error("Error:", error));

            try {
                const response = await axios.post(
                    `http://167.99.67.127:8080/forbad/auth/signup?email=${email}`
                );
                return response.data.length > 0;
            } catch (error) {
                console.error("Error while checking email existence:", error);

                return false;
            }
        }
        try {
            const emailExists = await checkEmailExists(email);
            if (emailExists) {
                alert("Email đã tồn tại trong hệ thống. Vui lòng sử dụng một địa chỉ email khác.");
                return;
            }
            const response = await axios.post("http://167.99.67.127:8080/forbad/auth/signup", {
                email,
                phoneNumber,
                password,
                fullName,
            });
            // console.log("Name: ", fullName);
            // console.log("sdt", phoneNumber);
            // console.log("email ", email);
            // console.log("pwd", password);

            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem("token", token);
                alert("Đăng ký thành công!");
            }
        } catch (error) {
            console.error("An error occurred while registering:", error);
            if (error.response && error.response.status === 400) {
                alert("Email đã tồn tại trong hệ thống. Vui lòng sử dụng một địa chỉ email khác.");
            } else {
                // Handle other errors if needed
            }
        }
    };
    login_google = async (event) => {
        fetch("http://167.99.67.127:8080/forbad/auth/google")
            .then((response) => response.json())
            .then((data) => {
                // Redirect to the Google login URL
                window.location.href = data.redirectUrl;
            })
            .catch((error) => console.error(error));
    };
    render() {
        return (
            <div>
                <div className="header-login-form">
                    <div className="container d-flex align-items-center justify-content-between">
                        <div className="header-login-form-left">
                            <div className="logo-header-login">
                                <img src="asserts/img/logo-cau-long-dep-01.png" alt="Logo" />
                            </div>
                            <div className="name-page">
                                <p className="m-0">Đăng kí</p>
                            </div>
                        </div>
                        <div className="header-login-form-right m-0">
                            <a href="/">
                                Trở về trang chủ <i className="fa-solid fa-arrow-right" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="login-form" id="register-form">
                    <div className="login-left">
                        <img src="asserts/img/logo-cau-long-dep-01.png" alt="Logo" />
                    </div>
                    <div className="login-right">
                        <form onSubmit={this.getInformationRegister}>
                            <h1>Đăng kí</h1>

                            <div className="input-box" style={{ marginRight: 5 }}>
                                <input type="text" placeholder="Họ và tên" id="fullName" />
                                <i className="fa-solid fa-user" />
                                <p id="fullName-error" className="text-danger"></p>
                            </div>
                            <div className="input-box">
                                <input type="text" placeholder="Số điện thoại" id="phoneNumber" />
                                <i className="fa-solid fa-phone" />
                                <p id="phoneNumber-error" className="text-danger"></p>
                            </div>

                            <div className="input-box">
                                <input type="email" placeholder="Email" id="email" />
                                <i className="fa-solid fa-envelope" />
                                <p id="email-error" className="text-danger"></p>
                            </div>
                            <div className="input-pass" style={{ display: "flex" }}>
                                <div className="input-box" style={{ marginRight: 5 }}>
                                    <input type="password" placeholder="Mật Khẩu" id="password" ref={this.passwordRef} />
                                    <i id="lock" className="fa-solid fa-lock" data-target="password" ref={this.lockRef} />
                                    <p id="password-error" className="text-danger"></p>
                                </div>
                                <div className="input-box">
                                    <input type="password" placeholder="Nhập lại mật khẩu" id="re-password" ref={this.rePasswordRef} />
                                    <i id="lock-re" className="fa-solid fa-lock" data-target="re-password" ref={this.lockReRef} />
                                    <p id="re-password-error" className="text-danger"></p>
                                </div>
                            </div>
                            <p id="wrong-repass" className="text-danger text-bold fw-bolder"></p>
                            <div>
                                <button type="submit" className="btn btn-primary p-2">Đăng kí</button>
                            </div>
                            <div className="divider">
                                <span>hoặc</span>
                            </div>
                            <div className="login-with">
                                <div className="gmail">
                                    <button className="btn btn-danger p-2" onClick={this.login_google}>
                                        <i className="fa-brands fa-google" /> Google
                                    </button>
                                </div>
                            </div>
                            <hr />
                            <div className="login-with">
                                {/* <div className="gmail">
                                    <button className="btn btn-danger p-2">
                                        <i className="fa-brands fa-google" /> Đăng kí với Google
                                    </button>
                                </div> */}
                            </div>
                            <div className="register-link">
                                <p>
                                    Bạn đã có tài khoản? <a href="/login">Đăng nhập</a>
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
