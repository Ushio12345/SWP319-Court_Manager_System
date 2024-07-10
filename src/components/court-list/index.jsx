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
    const [searchKeyword, setSearchKeyword] = useState(""); // State để lưu từ khóa tìm kiếm
    const [starFilter, setStarFilter] = useState(null);
    const [openingHoursFilter, setOpeningHoursFilter] = useState(null);

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
                setLatestCourts(response.data); // Lưu danh sách sân mới nhất vào state
            })
            .catch((error) => {
                console.error("Error fetching latest courts:", error);
            });
    };

    const handleSearchChange = (event) => {
        setSearchKeyword(event.target.value); // Cập nhật từ khóa tìm kiếm khi người dùng nhập vào input
    };

    const handleStarFilterChange = (value) => {
        setStarFilter(value);
    };

    const handleOpeningHoursFilterChange = (value) => {
        setOpeningHoursFilter(value);
    };

    const filteredCourts = courts.filter((court) => {
        let matches = true;
        if (starFilter !== null && court.star !== starFilter) {
            matches = false;
        }
        if (openingHoursFilter !== null && court.openingHours !== openingHoursFilter) {
            matches = false;
        }
        return matches && court.courtName.toLowerCase().includes(searchKeyword.toLowerCase());
    });

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                    arrows: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true,
                    arrows: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: true,
                },
            },
        ],
    };

    const settingForShowAllYard = {
        infinite: false,
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
                    slidesToShow: 2,
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
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    rows: 3,
                    slidesPerRow: 1,
                },
            },
        ],
    };

    return (
        <section className="yard" id="court-list">
            <h1 className="m-4">CÁC SÂN CẦU LÔNG MỚI</h1>
            <div className="container ">
                <Slider {...settings} className="list-yard showNewYard">
                    {latestCourts.slice(0, 10).map((court) => (
                        <CardYard key={court.courtId} court={court} />
                    ))}
                </Slider>
                <br />
            </div>
            <h1 className="m-4">TẤT CẢ SÂN CẦU LÔNG</h1>
            <div className="filter">
                <div className="search-container flex-grow-1">
                    <input
                        type="text"
                        className="form-control"
                        name="searchCourt"
                        id="searchCourt"
                        placeholder="Tìm kiếm theo tên sân"
                        value={searchKeyword}
                        onChange={handleSearchChange}
                    />
                </div>
                {/* <div className="filter-options">
                    <label htmlFor="starFilter">Số sao:</label>
                    <select
                        id="starFilter"
                        onChange={(e) => handleStarFilterChange(parseInt(e.target.value))}
                        value={starFilter || ""}
                    >
                        <option value="">Tất cả</option>
                        <option value="1">1 sao</option>
                        <option value="2">2 sao</option>
                        <option value="3">3 sao</option>
                        <option value="4">4 sao</option>
                        <option value="5">5 sao</option>
                    </select>
                    <label htmlFor="openingHoursFilter">Giờ mở cửa:</label>
                    <select
                        id="openingHoursFilter"
                        onChange={(e) => handleOpeningHoursFilterChange(e.target.value)}
                        value={openingHoursFilter || ""}
                    >
                        <option value="">Tất cả</option>
                        <option value="08:00 - 12:00">08:00 - 12:00</option>
                        <option value="13:00 - 17:00">13:00 - 17:00</option>
                        <option value="18:00 - 22:00">18:00 - 22:00</option>
                    </select>
                </div> */}
            </div>
            <div className="container w-4/5">
                <Slider {...settingForShowAllYard} className="list-yard showAllYard">
                    {filteredCourts.map((court) => (
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
