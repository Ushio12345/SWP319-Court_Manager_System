import React, { useState, useEffect } from "react";
import { showAlert, showConfirmAlert } from "../../../../../utils/alertUtils";
import axiosInstance from "../../../../../config/axiosConfig";
import { handleTokenError } from "../../../../../utils/tokenErrorHandle";

export default function FacilityList() {
    const [facilities, setFacilities] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [facilitiesPerPage] = useState(5);

    useEffect(() => {
        fetchAllFacilities();
    }, []);

    const fetchAllFacilities = () => {
        axiosInstance
            .get("/court/all")
            .then((res) => {
                if (res.status === 200) {
                    setFacilities(res.data);
                } else {
                    showAlert("error", "Lỗi !", "Không lấy được dữ liệu", "top-end");
                    console.error("Response không thành công:", res.status);
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 401 && error.response.data.message === "Token không hợp lệ hoặc đã hết hạn.") {
                    handleTokenError();
                }
                handleRequestError(error);
            });
    };

    const handleRequestError = (error) => {
        console.error("Đã xảy ra lỗi:", error);
        showAlert("error", "Lỗi !", "Đã xảy ra lỗi khi lấy dữ liệu", "top-end");
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastFacility = currentPage * facilitiesPerPage;
    const indexOfFirstFacility = indexOfLastFacility - facilitiesPerPage;
    const currentFacilities = facilities.slice(indexOfFirstFacility, indexOfLastFacility);

    return (
        <div className="container">
            <h3 className="text-center p-3">Danh sách các cơ sở cầu lông</h3>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th className="text-center">Ảnh</th>
                        <th className="text-center">ID</th>
                        <th>Tên cơ sở</th>
                        <th>Địa chỉ</th>
                        <th>Giờ hoạt động</th>
                        <th>Đánh giá</th>
                        <th>Số sân</th>
                    </tr>
                </thead>
                <tbody>
                    {currentFacilities.map((facility, index) => (
                        <tr key={facility.courtId}>
                            <td className="text-center">{indexOfFirstFacility + index + 1}</td>
                            <td>
                                <img src={facility.imageUrl} alt={facility.courtName} style={{ width: "100px", height: "auto" }} />
                            </td>
                            <td>{facility.courtId}</td>
                            <td>{facility.courtName}</td>
                            <td>{facility.address}</td>
                            <td>
                                {facility.openTime} - {facility.closeTime}
                            </td>
                            <td>{facility.rate}</td>
                            <td>{facility.yards ? facility.yards.length : 0}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-link" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    {[...Array(Math.ceil(facilities.length / facilitiesPerPage)).keys()].map((number) => (
                        <li key={number + 1} className={`page-item ${currentPage === number + 1 ? "active" : ""}`}>
                            <button onClick={() => paginate(number + 1)} className="page-link">
                                {number + 1}
                            </button>
                        </li>
                    ))}
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === Math.ceil(facilities.length / facilitiesPerPage)}
                        >
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
