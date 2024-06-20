import React, { Component } from "react";
import axios from "axios";

export default class Services extends Component {
    state = {
        Services: [],
        selectedServices: [],
        selectedCourt: "",
        selectedCourtName: "",

        courts: [],
        newCourt: {
            court_name: "",
            address: "",
            open_time: "",
            close_time: "",
            rate: "",
            user_id: "",
        },
    };

    componentDidMount() {
        this.fetchSer();
        this.fetchCourts();
    }

    fetchCourts = () => {
        axios
            .get("http://localhost:3001/court")
            .then((res) => {
                this.setState({ courts: res.data });
            })
            .catch((err) => {
                console.error("Error fetching courts:", err);
                alert("Không thể lấy dữ liệu từ API");
            });
    };

    fetchSer = () => {
        axios
            .get("http://localhost:3001/services")
            .then((res) => {
                this.setState({ Services: res.data });
            })
            .catch((err) => console.error("Error fetching Services:", err));
    };

    handleCheckboxChange = (event) => {
        const serviceId = event.target.id;
        this.setState((prevState) => {
            if (prevState.selectedServices.includes(serviceId)) {
                return {
                    selectedServices: prevState.selectedServices.filter((id) => id !== serviceId),
                };
            } else {
                return {
                    selectedServices: [...prevState.selectedServices, serviceId],
                };
            }
        });
    };

    handleCourtChange = (event) => {
        const selectedCourtId = event.target.value;
        const selectedCourt = this.state.courts.find((court) => court.id === selectedCourtId);
        this.setState({
            selectedCourt: selectedCourtId,
            selectedCourtName: selectedCourt ? selectedCourt.court_name : "",
        });
        if (selectedCourt == "") {
            return "Bạn chưa chọn cơ sở.";
        }
    };

    getValueServices = () => {
        console.log(this.state.selectedServices);
    };

    renderSerSelectedOption = () => {
        if (this.state.selectedServices.length === 0) {
            return <p>Không có dịch vụ nào được chọn.</p>;
        }

        return (
            <ul className="">
                <li className="">
                    {this.state.selectedServices.map((serviceId) => {
                        const service = this.state.Services.find((ser) => ser.id === serviceId);
                        return (
                            <div className="d-flex align-items-center ">
                                <i className={service.servicesIcon}></i>{" "}
                                <li key={serviceId} className="ms-3">
                                    {service?.servicesName}
                                </li>
                            </div>
                        );
                    })}
                </li>
            </ul>
        );
    };

    renderSer = () => {
        return this.state.Services.map((ser) => (
            <div
                key={ser.id}
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                    justifyContent: "space-between",
                    backgroundColor: "#f5f5f5",
                    padding: "5px 0",
                }}
            >
                <div>
                    <p style={{ margin: "0 10px 0 0" }}>
                        <i className={ser.servicesIcon} style={{ marginRight: "20px" }} />
                        {ser.servicesName}
                    </p>
                </div>
                <div>
                    <input type="checkbox" className="selectedService" id={ser.id} name={ser.id} onChange={this.handleCheckboxChange} />
                </div>
            </div>
        ));
    };

    render() {
        return (
            <div className="Services-for-court">
                <h1 className="text-center mb-5">Danh sách các tiện ích</h1>
                <div className="form-group">
                    <select id="courtSelect" className="form-control w-25 m-auto" onChange={this.handleCourtChange}>
                        <option value="">Chọn cơ sở</option>
                        {this.state.courts.map((court) => (
                            <option key={court.id} value={court.id}>
                                {court.court_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="list-Services w-50 m-auto" style={{ fontSize: "20px" }}>
                    {this.renderSer()}
                </div>
                <div className="w-25 m-auto">
                    <button onClick={this.getValueServices} className="btn btn-primary mt-3">
                        Hoàn tất
                    </button>
                </div>

                <div className="mt-3">
                    <h5>
                        Các dịch vụ được sử dụng trong cơ sở: <strong>{this.state.selectedCourtName}</strong>
                    </h5>
                    {this.renderSerSelectedOption()}
                </div>
            </div>
        );
    }
}
