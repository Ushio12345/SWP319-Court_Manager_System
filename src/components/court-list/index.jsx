import React, { useState, useEffect } from "react";
import CardYard from "../CardYard";
import "../court-list/index.css";
import "../../App.css";
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

    return (
        <section className="yard">
            <h1 className="m-4">CÁC SÂN CẦU LÔNG ĐƯỢC YÊU THÍCH</h1>
            <div className="container w-4/5">
                <div className="list-yard grid lg:grid-cols-4 md:grid-cols-3 gap-4 sm:lg:grid-cols-2">
                    {courts.slice(0, 4).map((court) => (
                        <CardYard key={court.courtId} court={court} />
                    ))}
                </div>
            </div>
            <h1 className="m-4">CÁC SÂN CẦU LÔNG MỚI</h1>
            <div className="container w-4/5">
                <div className="list-yard grid lg:grid-cols-4 md:grid-cols-3 gap-4 sm:lg:grid-cols-2">
                    {latestCourts.slice(0, 4).map((court) => (
                        <CardYard key={court.courtId} court={court} />
                    ))}
                </div>
            </div>
            <h1 className="m-4">TẤT CẢ SÂN CẦU LÔNG</h1>
            <div className="container w-4/5">
                <div className="list-yard grid lg:grid-cols-4 md:grid-cols-3 gap-4 sm:lg:grid-cols-2">
                    {courts.map((court) => (
                        <CardYard
                            key={court.courtId} // Đảm bảo mỗi CardYard có key duy nhất
                            court={court} // Truyền thông tin sân vào CardYard
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CourtList;
