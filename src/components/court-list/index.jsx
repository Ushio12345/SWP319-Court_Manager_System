import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import CardYard from "../CardYard";
import "../court-list/index.css";
import "../../App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import axiosInstance from "../../config/axiosConfig";

const CourtList = () => {
    const [courts, setCourts] = useState([]);
    const [latestCourts, setLatestCourts] = useState([]);
    const [favoriteCourts, setFavoriteCourts] = useState([]);

    useEffect(() => {
        fetchCourts();
        fetchLatestCourts();
    }, []);

    const fetchCourts = () => {
        axiosInstance
            .get("/court/all")
            .then((response) => {
                setCourts(response.data); // Lưu danh sách sân vào state
            })
            .catch((error) => {
                console.error("Error fetching courts:", error);
            });
    };

    const fetchLatestCourts = () => {
        axiosInstance
            .get("/court/latest-courts")
            .then((response) => {
                setLatestCourts(response.data); // Lưu danh sách sân vào state
            })
            .catch((error) => {
                console.error("Error fetching courts:", error);
            });
    };

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const settingForShowAllYard = {
        infinite: true,
        dot: true,
        rows: 3,
        slidesPerRow: 1,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    rows: 3,
                    slidesPerRow: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    rows: 3,
                    slidesPerRow: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rows: 3,
                    slidesPerRow: 1,
                },
            },
        ],
    };

    return (
        <section className="yard">
            <h1 className="m-4">CÁC SÂN CẦU LÔNG MỚI</h1>
            <div className="container w-4/5">
                <Slider {...settings} className="list-yard showNewYard">
                    {latestCourts.slice(0, 10).map((court) => (
                        <CardYard key={court.courtId} court={court} />
                    ))}
                </Slider>
            </div>
            <h1 className="m-4">TẤT CẢ SÂN CẦU LÔNG</h1>
            <div className="container w-4/5">
                <Slider {...settingForShowAllYard} className="list-yard showAllYard">
                    {courts.map((court) => (
                        <div className="card-container" key={court.courtId}>
                            <CardYard court={court} />
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default CourtList;
