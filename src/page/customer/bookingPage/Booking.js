import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import "slick-carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from "../../../components/header/index";
import Footer from "../../../components/footer";
import SelectCourt from "./SelectedCourt";
import NapGio from "./formBooking/NapGio";
import Slot from "./formBooking/Slot";
import "../bookingPage/booking.css";
import CardYard from "../../../components/CardYard";
import Feedback from "../bookingPage/feedback/feedback";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../../config/axiosConfig";
import { showAlert } from "../../../utils/alertUtils";

export default function Booking() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({
        username: "",
        avatar: "",
        roles: [],
    });

    const [latestCourts, setLatestCourts] = useState([]);
    const listYardRef = useRef(null);

    const location = useLocation();
    const { court } = location.state || {};

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            setIsLoggedIn(true);
            setUser({
                username: user.fullName,
                avatar: user.imageUrl,
                roles: user.roles,
            });
        }

        axiosInstance
            .get("/court/latest-courts")
            .then((response) => {
                setLatestCourts(response.data);
            })
            .catch((error) => {
                showAlert("error", "Lỗi", "Lấy dữ liệu không thành công. Vui lòng thử lại !", "top-end");
                console.error("There was an error fetching the amenities!", error);
            });
    }, []);

    useEffect(() => {
        const initializeSlick = () => {
            if (listYardRef.current && !$(listYardRef.current).hasClass("slick-initialized")) {
                $(listYardRef.current).slick({
                    centerMode: true,
                    centerPadding: "60px",
                    slidesToShow: 3,
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                arrows: false,
                                centerMode: true,
                                centerPadding: "40px",
                                slidesToShow: 3,
                            },
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                arrows: false,
                                centerMode: true,
                                centerPadding: "40px",
                                slidesToShow: 2,
                            },
                        },
                    ],
                });
            }
        };

        const timer = setTimeout(() => {
            initializeSlick();
        }, 500);

        return () => {
            clearTimeout(timer);
            if (listYardRef.current && $(listYardRef.current).hasClass("slick-initialized")) {
                $(listYardRef.current).slick("unslick");
            }
        };
    }, [latestCourts]);

    if (!court) {
        return <div>No court information available</div>;
    }

    const handleLogout = () => {
        localStorage.removeItem("user");

        setIsLoggedIn(false);
        setUser({
            username: "",
            avatar: "",
            roles: [],
        });

        window.location.href = "/";
    };

    return (
        <div className="bookingPage">
            <Header isLoggedIn={isLoggedIn} user={user} handleLogout={handleLogout} />
            <SelectCourt court={court} />
            <section className="form-booking">
                <div className="booking row">
                    <div className="col-lg-4">
                        <NapGio />
                    </div>
                    <div className="col-lg-8">
                        <Slot court={court} />
                    </div>
                </div>
            </section>
            <section className="feedback container w-50">
                <Feedback />
            </section>
            <section>
                <div className="container">
                    <h1 className="mt-5">SÂN MỚI - TRẢI NGHIỆM MỚI</h1>
                    <section className="yard">
                        <div className="container w-4/5">
                            <div className="list-yard" ref={listYardRef}>
                                {latestCourts.slice(0, 10).map((court) => (
                                    <CardYard key={court.courtId} court={court} />
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </section>
            <Footer />
        </div>
    );
}
