import React, { Component } from "react";
import logo from '../../assets/images/forbad_logo.png';
import '../footer/index.css';
import '../../App.css';

export default class Footer extends Component {
    render() {
        return (
            <div>
                <section className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="dinner col-lg-4 col-md-6">
                                <img src={logo} alt="Logo" />

                                <p className="mb-3">
                                    Hãy liên hệ với chúng tôi để biết thêm thông tin và đặt sân ngay hôm nay. Chúng tôi rất hân hạnh được đón tiếp
                                    bạn!
                                </p>
                                <div className="social-media">
                                    <a href="https://www.facebook.com/">
                                        <i className="fa-brands fa-facebook-f" />
                                    </a>
                                    <a href="https://twitter.com/i/flow/login">
                                        <i className="fa-brands fa-twitter" />
                                    </a>
                                    <a href="https://www.instagram.com/accounts/login/?hl=en">
                                        <i className="fa-brands fa-instagram" />
                                    </a>
                                    <a href="https://vn.linkedin.com/">
                                        <i className="fa-brands fa-linkedin-in" />
                                    </a>
                                </div>
                            </div>
                            <div className="category col-lg-2 col-md-6 col-sm-6">
                                <h2>Khu vực</h2>
                                <a href>Bình Thạnh</a>
                                <br />
                                <a href>Tân Phú</a>
                                <br />
                                <a href>Quận 7</a>
                                <br />
                                <a href>TP. Thủ Đức</a>
                            </div>
                            <div className="archieve col-lg-2 col-md-6 col-sm-6">
                                <h2>Liên hệ</h2>
                                <p>
                                    <i className="fa-solid fa-phone" />
                                    <br />
                                    0123456789
                                </p>
                                <p>
                                    <i className="fa-solid fa-envelope" /> forbadbooking@gmail.com
                                </p>
                            </div>
                            <div className="contact col-lg-4 col-md-6">
                                <h2>Đăng kí ngay để cảm nhận</h2>
                                <p className="mb-4">
                                    Vui lòng nhập email của bạn <br />
                                    chúng tôi sẽ liên hệ trong thời gian sớm nhất
                                </p>
                                <input type="text" placeholder="Email của bạn" />
                                <br />
                                <button>Hoàn tất</button>
                            </div>
                        </div>
                        <br />
                        <hr />
                        <br />
                        <p>© Tháng 5 2024 - Babminton Court Managerment System Team 4 - SWP391</p>
                    </div>
                </section>
            </div>
        );
    }
}
