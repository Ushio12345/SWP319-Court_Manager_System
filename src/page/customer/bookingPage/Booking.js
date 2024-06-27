import React, { useEffect } from "react";
import $ from "jquery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel";

import Header from "../../../components/header/index";
import Footer from "../../../components/footer";
import SelectCourt from "./SelectedCourt";
import NapGio from "./formBooking/NapGio";
import Slot from "./formBooking/Slot";
import "../bookingPage/booking.css";
import CardYard from "../../../components/CardYard";
import "../bookingPage/booking.css";
import Feedback from "../bookingPage/feedback/feedback";

export default function Booking() {
    useEffect(() => {
        $(".ListcardYard").slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
        });
    }, []);

    return (
        <div className="bookingPage">
            <Header />
            <SelectCourt />
            <section className="form-booking">
                <div className="booking row">
                    <div className="col-lg-4">
                        <NapGio />
                    </div>
                    <div className="col-lg-8">
                        <Slot />
                    </div>
                </div>
            </section>
            <section className="feedback container w-50">
                <Feedback />
            </section>
            <section>
                <div className="container">
                    <h1 className="mt-5">SÂN MỚI - TRẢI NGHIỆM MỚI</h1>
                    <div className="ListcardYard ">
                        <CardYard />
                        <CardYard />
                        <CardYard />
                        <CardYard />
                        <CardYard />
                        <CardYard />
                        <CardYard />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
