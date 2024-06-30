import React, { Component } from "react";
import "./style.css";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import { Link } from "react-router-dom";
export default class GioiThieu extends Component {
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
    render() {
        const { isLoggedIn, user, errors } = this.state;
        return (
            <div>
                <Header isLoggedIn={isLoggedIn} user={user} handleLogout={this.handleLogout} />
                <div className="aboutUs">
                    <section className="aboutUs-story">
                        <div className="container">
                            <div className="aboutUs-story-title">
                                <h3>Giới thiệu</h3>
                                <h2>Một số điều về ForBadminton</h2>
                            </div>
                            <div className="form-aboutUs row">
                                <div className="aboutUs-story-left col-lg-6">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnBQikXnWyLEnOM7x6Cb9i8ogBo7KafAumOA&s" />
                                </div>
                                <div className="aboutUs-story-right col-lg-6">
                                    <h2>Chúng tôi đã tìm thấy không gian mới lạ dành cho bạn.</h2>
                                    <p>
                                        Bạn có đam mê cầu lông và đang tìm kiếm một địa điểm để thỏa sức tung hoành? 4BaD chính là sự lựa chọn hoàn
                                        hảo dành cho bạn. Chúng tôi tự hào là nền tảng đặt sân cầu lông hàng đầu, cung cấp các dịch vụ tiện ích và
                                        chất lượng nhằm mang đến trải nghiệm tuyệt vời cho mọi người chơi.
                                    </p>
                                    <p>
                                        Với mong muốn mang lại cho khách hàng một phương thức đặt sân mới lạ, tiện lợi cho những người yêu thích thể
                                        thao.
                                    </p>
                                    <button>
                                        <Link to="/">Trải nghiệm ngay</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="we-do row">
                                <div className="we-do-title col-lg-3 col-md-6">
                                    <h2>Tại sao lại chọn 4BaD?</h2>
                                </div>
                                <div className="we-do-title col-lg-3 col-md-6">
                                    <h2>Đa dạng sân bãi</h2>
                                    <p>Liên kết được nhiều sân bãi uy tín, trải rộng khắp khu vực.</p>
                                </div>
                                <div className="we-do-title col-lg-3 col-md-6">
                                    <h2>Đặt sân dễ dàng</h2>
                                    <p>Giao diện thân thiện, dễ dàng tìm kiếm và đặt sân chỉ trong vài phút.</p>
                                </div>
                                <div className="we-do-title col-lg-3 col-md-6">
                                    <h2>Giá cả cạnh tranh</h2>
                                    <p>Giá cả công khai, và nhiều chương trình khuyến mãi dành cho khách hàng thân thiết</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* skills */}
                    <section className="skill">
                        <div className="container">
                            <div className="row">
                                <div className="skill-left col-lg-6">
                                    <h3>Tự đánh giá</h3>
                                    <h2>
                                        Một số điểm nổi bật
                                        <br />
                                        mà trang web mang lại
                                    </h2>
                                    <p>Chúng tôi tự hào mang đến cho bạn những tính năng ưu việt và trải nghiệm tuyệt vời nhất.</p>
                                    <div className="progress-item">
                                        <h3>Độ tin cậy</h3>
                                        <div className="progress" style={{ height: 7 }}>
                                            <div className="progress-bar" style={{ width: "80%" }} />
                                        </div>
                                    </div>
                                    <div className="progress-item">
                                        <h3>Giao diện thân thiện</h3>
                                        <div className="progress" style={{ height: 7 }}>
                                            <div className="progress-bar" style={{ width: "95%" }} />
                                        </div>
                                    </div>
                                    <div className="progress-item">
                                        <h3>Dịch vụ khách hàng</h3>
                                        <div className="progress" style={{ height: 7 }}>
                                            <div className="progress-bar" style={{ width: "90%" }} />
                                        </div>
                                    </div>
                                    <div className="progress-item">
                                        <h3>Giá cả cạnh tranh</h3>
                                        <div className="progress" style={{ height: 7 }}>
                                            <div className="progress-bar" style={{ width: "85%" }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="skill-right col-lg-6 ">
                                    <div className="skill-right-img ">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWj2LjwKy8Akf86CZ_QRwmnsRGYtQTxv2nkw&s" alt />
                                    </div>
                                    <div className="skill-right-img ">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9JYfZ0hqiXCg20_39M2PHg6fz5cEarERr3g&s" alt />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* cheft */}
                    <section className="chefs">
                        <div className="container">
                            <div className="chefs-title">
                                <h3>Nhóm chúng tôi</h3>
                                <h2>Các thành viên</h2>
                            </div>
                            <div className="chef-list row">
                                <div className="chef-item col-lg-4 col-md-6">
                                    <div className="chef-img">
                                        <img src="https://i.pravatar.cc/300" alt />
                                        <div className="chef-contact">
                                            <a href="https://www.facebook.com/">
                                                <i className="fa-brands fa-facebook-f" />
                                            </a>
                                            <a href="https://twitter.com/i/flow/login">
                                                <i className="fa-brands fa-twitter" />
                                            </a>
                                            <a href="https://www.instagram.com/accounts/login/?hl=en">
                                                <i className="fa-brands fa-instagram" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="chef-name">
                                        <h3>Nguyễn Vân A</h3>
                                        <p>Admin</p>
                                    </div>
                                </div>
                                <div className="chef-item col-lg-4 col-md-6">
                                    <div className="chef-img">
                                        <img src="https://i.pravatar.cc/150" alt />
                                        <div className="chef-contact">
                                            <a href="https://www.facebook.com/">
                                                <i className="fa-brands fa-facebook-f" />
                                            </a>
                                            <a href="https://twitter.com/i/flow/login">
                                                <i className="fa-brands fa-twitter" />
                                            </a>
                                            <a href="https://www.instagram.com/accounts/login/?hl=en">
                                                <i className="fa-brands fa-instagram" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="chef-name">
                                        <h3>Huỳnh Thị A</h3>
                                        <p>Admin</p>
                                    </div>
                                </div>
                                <div className="chef-item col-lg-4 col-md-6 col-sm-12">
                                    <div className="chef-img">
                                        <img src="https://i.pravatar.cc/200" alt />
                                        <div className="chef-contact">
                                            <a href="https://www.facebook.com/">
                                                <i className="fa-brands fa-facebook-f" />
                                            </a>
                                            <a href="https://twitter.com/i/flow/login">
                                                <i className="fa-brands fa-twitter" />
                                            </a>
                                            <a href="https://www.instagram.com/accounts/login/?hl=en">
                                                <i className="fa-brands fa-instagram" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="chef-name">
                                        <h3>Trương Văn A</h3>
                                        <p>Admin</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        );
    }
}
