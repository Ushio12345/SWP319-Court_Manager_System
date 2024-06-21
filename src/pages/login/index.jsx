import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderLoginForm from "../../components/header-login-form";
import Footer from "../../components/footer";
import "./index.css";
import '../../App.css';
import { showAlert } from '../../utils/alertUtils'; 

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const setParams = (event) => {
        if (event.target.name === "email") {
            setEmail(event.target.value);
        } else if (event.target.name === "password") {
            setPassword(event.target.value);
        }
    };

    const login = (event) => {
        event.preventDefault();

        // Reset previous error messages
        setEmailError("");
        setPasswordError("");

        // Email validation
        if (!email.endsWith("@gmail.com")) {
            setEmailError("Email phải có đuôi là @gmail.com");
            return;
        }

        // Password validation
        if (password.length < 8) {
            setPasswordError("Mật khẩu phải có ít nhất 8 ký tự");
            return;
        }

        // If validations pass, proceed with login
        fetch("http://167.99.67.127:8080/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    showAlert('error', 'Đăng nhập không thành công!', 'Sai email hoặc mật khẩu. Vui lòng thử lại.', 'top-end');
                }
            })
            .then((data) => {
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("fullName", data.fullName);
                localStorage.setItem("imageUrl", data.imageUrl);
                localStorage.setItem("role", data.role);
                localStorage.setItem("jwtToken", data.accessToken);
                localStorage.setItem("tokenExpiration", data.expirationTime);
                console.log("Authentication successful");

                // Check if the user's role is "temp"
                if (data.role === "temp") {
                    window.location.href = "/role-selector";
                } else if (data.role === "manager"){
                    window.location.href = "/court_manager";
                } else if (data.role === "customer"){
                    window.location.href = "/";
                } 
                // else if (data.role === "staff"){
                //     window.location.href = "/staff";
                // } else if (data.role === "admin"){
                //     window.location.href = "/admin";
                // } 
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleGoogleLogin = (event) => {
        event.preventDefault();

        fetch("http://167.99.67.127:8080/auth/google")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    showAlert('error', 'Lỗi !', 'Có lỗi xảy ra. Vui lòng thử lại.', 'top-end');
                }
            })
            .then((data) => {
                if (data && data.redirectUrl) {
                    window.location.href = data.redirectUrl;
                } else {
                    showAlert('error', 'Lỗi !', 'Có lỗi xảy ra. Vui lòng thử lại.', 'top-end');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        const sendCodeToBackend = async () => {
            try {
                const response = await fetch(
                    "http://167.99.67.127:8080/auth/google/callback",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ code }),
                    }
                );

                if (!response.ok) {
                    showAlert('error', 'Lỗi !', 'Kết nối không ổn định. Vui lòng thử lại.', 'top-end');
                }

                const data = await response.json();
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("fullName", data.fullName);
                localStorage.setItem("imageUrl", data.imageUrl);
                localStorage.setItem("role", data.role);
                localStorage.setItem("jwtToken", data.accessToken);
                localStorage.setItem("tokenExpiration", data.expirationTime);
                console.log("Authentication successful");

                // Check if the user's role is "temp"
                if (data.role === "temp") {
                    window.location.href = "/role-selector";
                } else if (data.role === "manager"){
                    window.location.href = "/court_manager";
                } else if (data.role === "customer"){
                    window.location.href = "/";
                } 
                // else if (data.role === "staff"){
                //     window.location.href = "/staff";
                // } else if (data.role === "admin"){
                //     window.location.href = "/admin";
                // } 
            } catch (error) {
                console.error("Error sending code to backend:", error);
                // Handle error if needed
            }
        };

        if (code) {
            sendCodeToBackend();
        }
    }, [navigate]);

    return (
        <div className="form">
            <HeaderLoginForm title="Đăng nhập" />
            <div className="login-form" id="Login-form">
                <div className="login-left">
                    <img src="asserts/img/logo-cau-long-dep-01.png" alt="Logo" />
                </div>
                <div className="login-right">
                    <form onSubmit={login}>
                        <div className="input-box">
                            <input
                                type="text"
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                id="email"
                                value={email}
                                onChange={setParams}
                            />
                            <i className="fa-solid fa-user" />
                        </div>
                        {emailError && (
                            <p className="text-danger">{emailError}</p>
                        )}
                        <div className="input-box">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Mật khẩu"
                                id="password"
                                value={password}
                                onChange={setParams}
                            />
                            <i className="fa-solid fa-lock" />
                        </div>
                        {passwordError && (
                            <p className="text-danger">{passwordError}</p>
                        )}
                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" />
                                Nhớ mật khẩu
                            </label>
                            <a href="/forgot-password">Quên mật khẩu</a>
                        </div>
                        <div>
                            <button className="btn btn-primary p-2" type="submit">
                                Đăng nhập
                            </button>
                        </div>
                        <div className="divider">
                            <span>hoặc tiếp tục với</span>
                        </div>
                        <div className="login-with">
                            <div className="gmail">
                                <button
                                    className="btn btn-danger p-2"
                                    onClick={handleGoogleLogin}
                                >
                                    <i className="fa-brands fa-google" /> Google
                                </button>
                            </div>
                        </div>
                        <div className="register-link">
                            <p>
                                Bạn chưa có tài khoản? <a href="/register">Đăng ký</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
