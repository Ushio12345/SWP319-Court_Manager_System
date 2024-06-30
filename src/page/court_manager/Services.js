import React, { Component } from "react";
import axios from "axios";
import { showAlert } from "../../utils/alertUtils";
import axiosInstance from "../../config/axiosConfig";
import { handleTokenError } from "../../utils/tokenErrorHandle";

export default class Services extends Component {
    state = {
        services: [],
        selectedServices: [],
        selectedCourt: "",
        selectedCourtName: "",
        courts: [],
        activityLog: [],
    };

    componentDidMount() {
        this.fetchServices();
        this.fetchCourts();
    }

    fetchCourts = () => {
        axiosInstance
            .get("/court/courts-of-owner")
            .then((res) => {
                if (res.status === 200) {
                    this.setState({ courts: res.data });
                } else {
                    this.setState({ courts: [] });
                    showAlert("error", "Lỗi !", "Không lấy được dữ liệu", "top-end");
                    console.error("Response không thành công:", res.status);
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 401 && error.response.data.message === "Token không hợp lệ hoặc đã hết hạn.") {
                    handleTokenError();
                }
                this.handleRequestError(error);
            });
    };

    fetchServices = () => {
        axios
            .get("http://localhost:3001/services")
            .then((res) => {
                this.setState({ services: res.data });
            })
            .catch((err) => console.error("Error fetching Services:", err));
    };

    handleCourtChange = (event) => {
        const courtId = event.target.value;
        const courtName = event.target.options[event.target.selectedIndex].text;
        this.setState({
            selectedCourt: courtId,
            selectedCourtName: courtName,
            selectedServices: [],
        });
    };

    handleActionSelectServices = (serviceId) => {
        const { selectedServices, selectedCourt, services, activityLog } = this.state;
        const selectedService = services.find((service) => service.id === serviceId);
        let updatedSelectedServices = [];

        let logMessage = "";

        if (selectedServices.includes(serviceId)) {
            updatedSelectedServices = selectedServices.filter((id) => id !== serviceId);
            logMessage = {
                courtID: selectedCourt,
                services: updatedSelectedServices.map((id) => services.find((service) => service.id === id)),
            };
            console.log("Xóa dịch vụ:", logMessage);
        } else {
            updatedSelectedServices = [...selectedServices, serviceId];
            logMessage = {
                courtID: selectedCourt,
                services: updatedSelectedServices.map((id) => services.find((service) => service.id === id)),
            };
            console.log("Thêm dịch vụ:", logMessage);
        }

        const updatedLog = [...activityLog, logMessage];

        this.setState({
            selectedServices: updatedSelectedServices,
            activityLog: updatedLog,
        });
    };

    renderServices = () => {
        return this.state.services.map((service) => {
            const isSelected = this.state.selectedServices.includes(service.id);
            return (
                <div
                    key={service.id}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                        justifyContent: "space-between",
                        backgroundColor: isSelected ? "#000" : "#f5f5f5",
                        color: isSelected ? "#fff" : "#000",
                        padding: "5px 0",
                    }}
                >
                    <div>
                        <p style={{ margin: "0 10px 0 0" }}>
                            <i className={service.servicesIcon} style={{ marginRight: "20px" }} />
                            {service.servicesName}
                        </p>
                    </div>
                    <div>
                        <button onClick={() => this.handleActionSelectServices(service.id)}>
                            {isSelected ? <i className="fa-solid fa-minus"></i> : <i className="fa-solid fa-plus"></i>}
                        </button>
                    </div>
                </div>
            );
        });
    };

    renderSelectedServices = () => {
        const { selectedServices } = this.state;

        if (selectedServices.length === 0) {
            return <p>Không có dịch vụ nào được chọn.</p>;
        }

        return (
            <ul className="">
                {selectedServices.map((serviceId) => {
                    const service = this.state.services.find((ser) => ser.id === serviceId);
                    return (
                        <div key={serviceId} className="d-flex align-items-center">
                            <i className={service?.servicesIcon}></i> <li className="ms-3">{service?.servicesName}</li>
                        </div>
                    );
                })}
            </ul>
        );
    };

    handleSubmit = () => {
        const { selectedCourt, selectedServices, services } = this.state;

        // Lọc ra các dịch vụ đã chọn từ danh sách services
        const selectedServiceDetails = selectedServices.map((serviceId) => {
            const service = services.find((s) => s.id === serviceId);
            return {
                courtID: selectedCourt,
                servicesID: service.id,
                icon: service.servicesIcon,
                name: service.servicesName,
            };
        });

        console.log("Thông tin dịch vụ được chọn:", selectedServiceDetails);

        // Đưa logic xử lý gửi đi hoặc lưu trữ dữ liệu ở đây
    };

    render() {
        return (
            <div className="services-for-court">
                <h1 className="text-center mb-5">Danh sách các tiện ích</h1>
                <div className="form-group">
                    <select id="courtSelect" className="form-control w-25 m-auto" onChange={this.handleCourtChange}>
                        {this.state.courts.map((court) => (
                            <option key={court.courtId} value={court.courtId}>
                                {court.courtName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="list-services w-50 m-auto" style={{ fontSize: "20px" }}>
                    {this.renderServices()}
                </div>
                <div className="w-25 m-auto">
                    <button onClick={this.handleSubmit} className="btn btn-primary mt-3">
                        Hoàn tất
                    </button>
                </div>

                <div className="mt-3">
                    <h5>
                        Các dịch vụ được sử dụng trong cơ sở: <strong>{this.state.selectedCourtName}</strong>
                    </h5>
                    {this.renderSelectedServices()}
                </div>
            </div>
        );
    }
}
