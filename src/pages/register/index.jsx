import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderLoginForm from "../../components/header-login-form";
import Footer from "../../components/footer";
import "./index.css";
import '../../App.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

// class Register  = () => {
//     // constructor(props) {

//     //     super(props);
//     //     this.passwordRef = createRef();
//     //     this.rePasswordRef = createRef();
//     //     this.lockRef = createRef();
//     //     this.lockReRef = createRef();
//     // }

//     // componentDidMount() {
//     //     this.lockRef.current.addEventListener("click", this.togglePasswordVisibility);
//     //     this.lockReRef.current.addEventListener("click", this.togglePasswordVisibility);
//     // }

//     // componentWillUnmount() {
//     //     this.lockRef.current.removeEventListener("click", this.togglePasswordVisibility);
//     //     this.lockReRef.current.removeEventListener("click", this.togglePasswordVisibility);
//     // }

//     // togglePasswordVisibility = (event) => {
//     //     const target = event.target;
//     //     const targetInput = target.dataset.target === "password" ? this.passwordRef.current : this.rePasswordRef.current;
//     //     const type = targetInput.getAttribute("type") === "password" ? "text" : "password";
//     //     targetInput.setAttribute("type", type);
//     //     target.classList.toggle("fa-lock");
//     //     target.classList.toggle("fa-eye");
//     // };

//     // getInformationRegister = async (event) => {
//     //     event.preventDefault();

//     //     const fullName = document.getElementById("fullName").value.trim();
//     //     const phoneNumber = document.getElementById("phoneNumber").value.trim();
//     //     const email = document.getElementById("email").value.trim();
//     //     const password = document.getElementById("password").value.trim();
//     //     const rePassword = document.getElementById("re-password").value.trim();

//     //     const errorMessages = {
//     //         fullName: "Tên đầy đủ phải ít hơn 100 ký tự.",
//     //         phoneNumber: "Số điện thoại phải có từ 10 đến 11 số.",
//     //         email: "Bạn chưa nhập email.",
//     //         password: "Mật khẩu phải có từ 8 đến 120 ký tự.",
//     //         rePassword: "Bạn chưa nhập lại mật khẩu.",
//     //     };

//     //     const fullNameError = document.getElementById("fullName-error");
//     //     const phoneNumberError = document.getElementById("phoneNumber-error");
//     //     const emailError = document.getElementById("email-error");
//     //     const passwordError = document.getElementById("password-error");
//     //     const rePasswordError = document.getElementById("re-password-error");
//     //     const wrongRepass = document.getElementById("wrong-repass");

//     //     // Clear previous error messages
//     //     if (fullNameError) fullNameError.innerHTML = "";
//     //     if (phoneNumberError) phoneNumberError.innerHTML = "";
//     //     if (emailError) emailError.innerHTML = "";
//     //     if (passwordError) passwordError.innerHTML = "";
//     //     if (rePasswordError) rePasswordError.innerHTML = "";
//     //     if (wrongRepass) wrongRepass.innerHTML = "";

//     //     let isValid = true;

//     //     if (!fullName) {
//     //         if (fullNameError) fullNameError.innerHTML = "Bạn chưa nhập tên đăng nhập.";
//     //         isValid = false;
//     //     } else if (fullName.length > 100) {
//     //         if (fullNameError) fullNameError.innerHTML = errorMessages.fullName;
//     //         isValid = false;
//     //     }

//     //     if (!phoneNumber) {
//     //         if (phoneNumberError) phoneNumberError.innerHTML = "Bạn chưa nhập số điện thoại.";
//     //         isValid = false;
//     //     } else if (!/^\d{10,11}$/.test(phoneNumber)) {
//     //         if (phoneNumberError) phoneNumberError.innerHTML = errorMessages.phoneNumber;
//     //         isValid = false;
//     //     }

//     //     if (!email) {
//     //         if (emailError) emailError.innerHTML = errorMessages.email;
//     //         isValid = false;
//     //     }

//     //     if (!password) {
//     //         if (passwordError) passwordError.innerHTML = "Bạn chưa nhập password.";
//     //         isValid = false;
//     //     } else if (password.length < 8 || password.length > 120) {
//     //         if (passwordError) passwordError.innerHTML = errorMessages.password;
//     //         isValid = false;
//     //     }

//     //     if (!rePassword) {
//     //         if (rePasswordError) rePasswordError.innerHTML = errorMessages.rePassword;
//     //         isValid = false;
//     //     }

//     //     if (!isValid) return;

//     //     if (password !== rePassword) {
//     //         if (wrongRepass) wrongRepass.innerHTML = "Mật khẩu chưa khớp. Xin vui lòng nhập lại!";
//     //         return;
//     //     }

//     //     // async function checkEmailExists(email) {
//     //     //     fetch("http://167.99.67.127:8080/forbad/auth/signup")
//     //     //         .then((response) => response.json())
//     //     //         .then((data) => console.log(data))
//     //     //         .catch((error) => console.error("Error:", error));

//     //     //     try {
//     //     //         const response = await axios.post(
//     //     //             `http://167.99.67.127:8080/forbad/auth/signup?email=${email}`
//     //     //         );
//     //     //         return response.data.length > 0;
//     //     //     } catch (error) {
//     //     //         console.error("Error while checking email existence:", error);

//     //     //         return false;
//     //     //     }
//     //     // }
//     //     try {
//     //         // const emailExists = await checkEmailExists(email);
//     //         // if (emailExists) {
//     //         //     alert("Email đã tồn tại trong hệ thống. Vui lòng sử dụng một địa chỉ email khác.");
//     //         //     return;
//     //         // }
//     //         const response = await axios.post("http://localhost:8080/forbad/auth/signup", {
//     //             email,              
//     //             password,
//     //             fullName,
//     //         });
//     //         // console.log("Name: ", fullName);
//     //         // console.log("sdt", phoneNumber);
//     //         // console.log("email ", email);
//     //         // console.log("pwd", password);

//     //         if (response.status === 200) {
//     //             const token = response.data.token;
//     //             localStorage.setItem("token", token);
//     //             alert("Đăng ký thành công!");
//     //             window.location.href = "http://localhost:3003/login";
//     //         }
//     //     } catch (error) {
//     //         console.error("An error occurred while registering:", error);
//     //         if (error.response && error.response.status === 400) {
//     //             alert("Email đã tồn tại trong hệ thống. Vui lòng sử dụng một địa chỉ email khác.");
//     //         } else {
//     //             // Handle other errors if needed
//     //         }
//     //     }
//     // };
//     // login_google = async (event) => {
//     //     fetch("http://167.99.67.127:8080/forbad/auth/google")
//     //         .then((response) => response.json())
//     //         .then((data) => {
//     //             // Redirect to the Google login URL
//     //             window.location.href = data.redirectUrl;
//     //         })
//     //         .catch((error) => console.error(error));
//     // };

//     return (
//             <div className="form">
//                 <div className="header-login-form">
//                     <div className="container d-flex align-items-center justify-content-between">
//                         <div className="header-login-form-left">
//                             <div className="logo-header-login">
//                                 <img src="asserts/img/logo-cau-long-dep-01.png" alt="Logo" />
//                             </div>
//                         </div>
//                         <div className="header-login-form-right m-0">
//                             <a href="/">
//                                 Trở về trang chủ <i className="fa-solid fa-arrow-right" />
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="login-form" id="register-form">
//                     <div className="login-left">
//                         <img src="asserts/img/logo-cau-long-dep-01.png" alt="Logo" />
//                     </div>
//                     <div className="login-right">
//                         <form onSubmit={this.getInformationRegister}>
//                             <div className="input-box" style={{ marginRight: 5 }}>
//                                 <input type="text" className="form-control" placeholder="Họ và tên" id="fullName" />
//                                 <i className="fa-solid fa-user" />
//                                 <p id="fullName-error" className="text-danger"></p>
//                             </div>
//                             <div className="input-box">
//                                 <input type="email" className="form-control" placeholder="Email" id="email" />
//                                 <i className="fa-solid fa-envelope" />
//                                 <p id="email-error" className="text-danger"></p>
//                             </div>
//                             <div className="input-pass" style={{ display: "flex" }}>
//                                 <div className="input-box"  style={{ marginRight: 5 }}>
//                                     <input type="password" className="form-control" placeholder="Mật Khẩu" id="password" ref={this.passwordRef} />
//                                     <i id="lock" className="fa-solid fa-lock" data-target="password" ref={this.lockRef} />
//                                     <p id="password-error" className="text-danger"></p>
//                                 </div>
//                                 <div className="input-box">
//                                     <input type="password" className="form-control" placeholder="Nhập lại mật khẩu" id="re-password" ref={this.rePasswordRef} />
//                                     <i id="lock-re" className="fa-solid fa-lock" data-target="re-password" ref={this.lockReRef} />
//                                     <p id="re-password-error" className="text-danger"></p>
//                                 </div>
//                             </div>
//                             <p id="wrong-repass" className="text-danger text-bold fw-bolder"></p>
//                             <div>
//                                 <button type="submit" className="btn btn-primary p-2">
//                                     Đăng kí
//                                 </button>
//                             </div>
//                             <div className="divider">
//                                 <span>hoặc tiếp tục với</span>
//                             </div>
//                             <div className="login-with">
//                                 <div className="gmail">
//                                     <button className="btn btn-danger p-2" onClick={this.login_google}>
//                                         <i className="fa-brands fa-google" /> Google
//                                     </button>
//                                 </div>
//                             </div>
//                             <div className="register-link">
//                                 <p>
//                                     Bạn đã có tài khoản? <a href="/login">Đăng nhập</a>
//                                 </p>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//                 <Footer />
//             </div>
//         );
// }
// export default Register;

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [rePasswordError, setRePasswordError] = useState("");
    const [fullNameError, setFullNameError] = useState("");

    const navigate = useNavigate();

    const setParams = (event) => {
        if (event.target.name === "email") {
            setEmail(event.target.value);
        } else if (event.target.name === "password") {
            setPassword(event.target.value);
        } else if (event.target.name === "rePassword") {
            setRePassword(event.target.value);
        } else if (event.target.name === "fullName") {
            setFullName(event.target.value);
        }
    };

    const register = (event) => {
        event.preventDefault();

        // Reset previous error messages
        setEmailError("");
        setPasswordError("");
        setRePasswordError("");
        setFullNameError("");

        // Email validation
        if (!email.trim()) {
            setEmailError("Email không được để trống");
            return;
        }

        if (!email.endsWith("@gmail.com")) {
            setEmailError("Email phải có đuôi là @gmail.com");
            return;
        }

        if (email.length > 100) {
            setEmailError("Email không được vượt quá 100 ký tự");
            return;
        }

        // FullName validation
        if (!fullName.trim()) {
            setFullNameError("Họ và tên không được để trống");
            return;
        }

        if (fullName.length > 100) {
            setFullNameError("Họ và tên không được vượt quá 100 ký tự");
            return;
        }

        // Password validation
        if (!password.trim()) {
            setPasswordError("Mật khẩu không được để trống");
            return;
        }

        if (password.length < 8 || password.length > 120) {
            setPasswordError("Mật khẩu phải có từ 8 đến 120 ký tự");
            return;
        }

        if (!rePassword.trim()) {
            setRePasswordError("Mật khẩu không được để trống");
            return;
        }

        if (rePassword.length < 8 || rePassword.length > 120) {
            setRePasswordError("Mật khẩu phải có từ 8 đến 120 ký tự");
            return;
        }

        if (password !== rePassword) {
            setRePasswordError("Mật khẩu nhập lại không khớp");
            return;
        }

        // If validations pass, proceed with login
        fetch("http://localhost:8080/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                fullName: fullName
            }),
        })
            .then((response) => {
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Đăng ký thành công!',
                        text: 'Hãy đăng nhập và trải nghiệm.',
                        timer: 3000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        position: 'top-end',
                        toast: true,
                        customClass: {
                            popup: 'swal2-popup-success'
                        }
                    });
                } else {
                    response.json().then(data => {
                        if (response.status === 400 && data.message === 'Error: Email is already in use!') {
                            Swal.fire({
                                icon: 'error',
                                title: 'Đăng ký không thành công!',
                                text: 'Đã có người đăng ký với email này.',
                                timer: 3000,
                                timerProgressBar: true,
                                showConfirmButton: false,
                                position: 'top-end',
                                toast: true,
                                customClass: {
                                    popup: 'swal2-popup-error'
                                }
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Đăng ký không thành công!',
                                text: 'Vui lòng thử lại.',
                                timer: 3000,
                                timerProgressBar: true,
                                showConfirmButton: false,
                                position: 'top-end',
                                toast: true,
                                customClass: {
                                    popup: 'swal2-popup-error'
                                }
                            });
                        }
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi!',
                    text: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    position: 'top-end',
                    toast: true,
                    customClass: {
                        popup: 'swal2-popup-error'
                    }
                });
            });
    };

    const handleGoogleLogin = (event) => {
        event.preventDefault();

        fetch("http://localhost:8080/auth/google")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi !',
                        text: 'Có lỗi xảy ra. Vui lòng thử lại.',
                        timer: 3000, // Thời gian tự động đóng (ms)
                        timerProgressBar: true, // Thanh tiến độ thời gian
                        showConfirmButton: false, // Không hiển thị nút OK
                        position: 'top-end', // Đặt vị trí thông báo ở góc trên bên phải
                        toast: true, // Thêm tính năng toast để thông báo tự đóng
                        customClass: {
                            popup: 'swal2-popup-error' // Sử dụng lớp CSS tạo thông báo màu đỏ
                        }
                    });
                }
            })
            .then((data) => {
                if (data && data.redirectUrl) {
                    window.location.href = data.redirectUrl;
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi !',
                        text: 'Có lỗi xảy ra. Vui lòng thử lại.',
                        timer: 3000, // Thời gian tự động đóng (ms)
                        timerProgressBar: true, // Thanh tiến độ thời gian
                        showConfirmButton: false, // Không hiển thị nút OK
                        position: 'top-end', // Đặt vị trí thông báo ở góc trên bên phải
                        toast: true, // Thêm tính năng toast để thông báo tự đóng
                        customClass: {
                            popup: 'swal2-popup-error' // Sử dụng lớp CSS tạo thông báo màu đỏ
                        }
                    });
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
                    "http://localhost:8080/auth/google/callback",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ code }),
                    }
                );

                if (!response.ok) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi !',
                        text: 'Kết nối không ổn định. Vui lòng thử lại.',
                        timer: 3000, // Thời gian tự động đóng (ms)
                        timerProgressBar: true, // Thanh tiến độ thời gian
                        showConfirmButton: false, // Không hiển thị nút OK
                        position: 'top-end', // Đặt vị trí thông báo ở góc trên bên phải
                        toast: true, // Thêm tính năng toast để thông báo tự đóng    
                        customClass: {
                            popup: 'swal2-popup-error' // Sử dụng lớp CSS tạo thông báo màu đỏ
                        }
                    });
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
                } else {
                    window.location.href = "/";
                }
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
            <HeaderLoginForm />
            <div className="login-form" id="Login-form">
                <div className="login-left">
                    <img src="asserts/img/logo-cau-long-dep-01.png" alt="Logo" />
                </div>
                <div className="login-right">
                    <form onSubmit={register}>
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
                                type="text"
                                name="fullName"
                                className="form-control"
                                placeholder="Họ và tên"
                                id="fullName"
                                value={fullName}
                                onChange={setParams}
                            />
                            <i className="fa-solid fa-lock" />
                        </div>
                        {fullNameError && (
                            <p className="text-danger">{fullNameError}</p>
                        )}
                        <div>
                            <div className="row">
                                <div className="col-md-6">
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
                                </div>
                                <div className="col-md-6">
                                    <div className="input-box">
                                        <input
                                            type="password"
                                            name="rePassword"
                                            className="form-control"
                                            placeholder="Nhập lại mật khẩu"
                                            id="rePassword"
                                            value={rePassword}
                                            onChange={setParams}
                                        />
                                        <i className="fa-solid fa-lock" />
                                    </div>
                                    {rePasswordError && (
                                        <p className="text-danger">{rePasswordError}</p>
                                    )}
                                </div>
                            </div>
                            <button className="btn btn-primary p-2" type="submit">
                                Đăng ký
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
                                Bạn đã có tài khoản? <a href="/login">Đăng nhập</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
