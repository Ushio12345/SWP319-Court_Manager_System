import React, { Component } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Banner from "../../components/banner";
import "../guest/index.css";
import CourtList from "../../components/court-list";
import "../../App.css";

class GuestPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: {
                username: "",
                avatar: "",
            },
        };
    }

    componentDidMount() {
        // Check localStorage or other storage to get user info
        const userId = localStorage.getItem("userId");
        const username = localStorage.getItem("fullName");
        const avatar = localStorage.getItem("imageUrl");

        if (userId && username && avatar) {
            this.setState({
                isLoggedIn: true,
                user: {
                    username: username,
                    avatar: avatar,
                },
            });
        }
    }

    handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem("userId");
        localStorage.removeItem("fullName");
        localStorage.removeItem("imageUrl");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("tokenExpiration");

        // Update logout state
        this.setState({
            isLoggedIn: false,
            user: {
                username: "",
                avatar: "",
            },
        });

        // Redirect to login page
        window.location.href = "/";
    };

    render() {
        const { isLoggedIn, user } = this.state;

        return (
            <div className="GuestPage">
                <section className="header">
                    <Header isLoggedIn={isLoggedIn} user={user} handleLogout={this.handleLogout} />
                </section>
                <Banner />
                <div className="filter">
                    <div className="locGio">
                        <p>Giờ hoạt động</p>
                        <ul className="filter-time">
                            <li>
                                <a href="login.html">7:00 - 12:00</a>
                            </li>
                            <li>
                                <a href="login.html">9:00 - 23:00</a>
                            </li>
                            <li>
                                <a href="login.html">7:00 - 24:00</a>
                            </li>
                            <li>
                                <a href="login.html">10:00 - 20:00</a>
                            </li>
                        </ul>
                    </div>
                    <div className="sort">
                        {/* drop down sắp xếp các sân */}
                        <select id="sorted" name>
                            <option value>Sắp xếp theo</option>
                            <option value={1}>Từ A - Z</option>
                            <option value={2}>Từ Z - A</option>
                            <option value={3}>Giá tăng dần</option>
                            <option value={4}>Giá giảm dần</option>
                        </select>
                    </div>
                </div>
                <CourtList />
                <Footer />
            </div>
        );
    }
}

export default GuestPage;
