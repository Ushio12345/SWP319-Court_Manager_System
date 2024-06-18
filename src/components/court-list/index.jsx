import React from "react";
import CardYard from "../CardYard";
import '../court-list/index.css';
import '../../App.css';

const CourtList = () => {
    return (
        <section className="yard">
            <h1 className="m-4">DANH SÁCH CÁC SÂN CẦU LÔNG</h1>
            <div className="container w-4/5">
                <div className="list-yard grid lg:grid-cols-4 md:grid-cols-3 gap-4 sm:lg:grid-cols-2">
                    <CardYard />
                    <CardYard />
                    <CardYard />
                    <CardYard />
                    <CardYard />
                    <CardYard />
                    <CardYard />
                    <CardYard />
                </div>
            </div>
            <h1 className="m-4">DANH SÁCH CÁC SÂN CẦU LÔNG MỚI</h1>
            <div className="container w-4/5">
                <div className="grid grid-cols-3 gap-4 ">
                    <CardYard />
                    <CardYard />
                    <CardYard />
                </div>
            </div>
            <h1 className="m-4">DANH SÁCH CÁC SÂN CẦU LÔNG ĐƯỢC YÊU THÍCH</h1>
            <div className="container w-4/5">
                <div className="grid grid-cols-3 gap-4 ">
                    <CardYard />
                    <CardYard />
                    <CardYard />
                </div>
            </div>
        </section>
    );
};

export default CourtList;
