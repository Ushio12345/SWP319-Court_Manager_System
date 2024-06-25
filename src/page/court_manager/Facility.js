import React, { useState, useEffect } from "react";
import axios from "axios";
import { showAlert } from "../../utils/alertUtils";
import { handleTokenError } from "../../utils/tokenErrorHandle";
import axiosInstance from "../../config/axiosConfig";

const Facility = ( {globalCourtId} ) => {
    const [facilities, setFacilities] = useState([]);
    const [facilitiesOfCourt, setfacilitiesOfCourt] = useState([]);

    useEffect(() => {
        if (globalCourtId) {
            fetchFacilitiesOfCourt(globalCourtId);
            fetchFacilities();
        }
    }, [globalCourtId]);


    const fetchFacilitiesOfCourt = (courtId) => {
        if (!globalCourtId) return;

        axiosInstance
        .get(`/court/facilities-of-court/${courtId}`)
            .then((response) => {
                setfacilitiesOfCourt(response.data);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401 && error.response.data.message === 'Token không hợp lệ hoặc đã hết hạn.') {
                    handleTokenError();
                } else {
                    showAlert('error', 'Lỗi !', 'Lấy dữ liệu không thành công', 'top-end');
                }
                handleRequestError(error);
            });
    };

    const fetchFacilities = () => {
        axiosInstance
            .get("/facility/all")
            .then((response) => {
                setFacilities(response.data);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401 && error.response.data.message === 'Token không hợp lệ hoặc đã hết hạn.') {
                    handleTokenError();
                } else {
                    showAlert('error', 'Lỗi !', 'Lấy dữ liệu không thành công', 'top-end');
                }
                handleRequestError(error);
            });
    };

    const handleAddFacilityToCourt = (facilityId) => {
        axiosInstance
            .post("/facility/all")
            .then((response) => {
                setFacilities(response.data);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401 && error.response.data.message === 'Token không hợp lệ hoặc đã hết hạn.') {
                    handleTokenError();
                } else {
                    showAlert('error', 'Lỗi !', 'Lấy dữ liệu không thành công', 'top-end');
                }
                handleRequestError(error);
            });
    };

    const handleDeleteFacilityFromCourt = () => {
        axiosInstance
            .delete("/facility/all")
            .then((response) => {
                setFacilities(response.data);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401 && error.response.data.message === 'Token không hợp lệ hoặc đã hết hạn.') {
                    handleTokenError();
                } else {
                    showAlert('error', 'Lỗi !', 'Lấy dữ liệu không thành công', 'top-end');
                }
                handleRequestError(error);
            });
    };

    // const handleCheckboxChange = (event) => {
    //     const facilityId = event.target.value;
    //     setSelectedFacilities((prevSelectedFacilities) => {
    //         if (prevSelectedFacilities.includes(facilityId)) {
    //             return prevSelectedFacilities.filter((id) => id !== facilityId);
    //         } else {
    //             return [...prevSelectedFacilities, facilityId];
    //         }
    //     });
    // };

    // const handleCourtChange = (event) => {
    //     const courtId = event.target.value;
    //     const court = courts.find((court) => court.id === courtId);
    //     setSelectedCourt(courtId);
    //     setSelectedCourtName(court ? court.name : "");
    //     const selectedFacilities = JSON.parse(localStorage.getItem(`selectedFacilities_${courtId}`)) || [];
    //     setSelectedFacilities(selectedFacilities);
    // };

    // const saveFacilitiesForCourt = () => {
    //     if (!selectedCourt) {
    //         showAlert("error", "Lỗi !", "Vui lòng chọn cơ sở", "top-end");
    //         return;
    //     }

    //     if (selectedFacilities.length === 0) {
    //         showAlert("error", "Lỗi !", "Vui lòng chọn ít nhất một tiện ích", "top-end");
    //         return;
    //     }

    //     axios
    //         .post(`/api/court/${selectedCourt}/facilities`, {
    //             facilities: selectedFacilities,
    //         })
    //         .then((response) => {
    //             showAlert("success", "Thành công", "Đã lưu các tiện ích vào cơ sở.", "top-end");
    //         })
    //         .catch((error) => {
    //             handleRequestError(error);
    //         });
    // };

    const handleRequestError = (error) => {
        if (error.response && error.response.status === 401 && error.response.data.message === 'Token không hợp lệ hoặc đã hết hạn.') {
            handleTokenError();
            showAlert('error', 'Lỗi !', 'Token hết hạn', 'top-end');
        } else {
            console.error("Lỗi từ server:", error.response?.data);
        }
    };

    // const renderFacilitiesSelectedOption = () => {
    //     if (selectedFacilities.length === 0) {
    //         return <p>Không có dịch vụ nào được chọn.</p>;
    //     }

    //     return (
    //         <ul>
    //             {selectedFacilities.map((facilityId) => {
    //                 const facility = facilities.find((fac) => fac.id === facilityId);
    //                 if (!facility) {
    //                     return null; // Handle the missing facility case appropriately
    //                 }
    //                 return (
    //                     <li key={facilityId}>
    //                         {facility.name}
    //                     </li>
    //                 );
    //             })}
    //         </ul>
    //     );
    // };

    // const renderFacilityCheckboxes = () => {
    //     return facilities.map((facility) => (
    //         <div key={facility.id}>
    //             <input
    //                 type="checkbox"
    //                 id={facility.id}
    //                 value={facility.id}
    //                 checked={selectedFacilities.includes(facility.id)}
    //                 onChange={handleCheckboxChange}
    //             />
    //             <label htmlFor={facility.id}>{facility.name}</label>
    //         </div>
    //     ));
    // };

    return (
        <div className="facilities-for-court">
            <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tiện ích</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facilitiesOfCourt.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center">Cơ sở chưa có tiện ích nào</td>
                            </tr>
                        ) : (
                            facilitiesOfCourt.map((facility, index) => (
                                <tr className="" key={facility.facilityId}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{facility.facilityName}</td>
                                    <td className="d-flex btn-action">
                                        <button className="btn btn-danger" onClick={() => handleDeleteFacilityFromCourt(facility.facilityId)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
        </div>
    );
};

export default Facility;
