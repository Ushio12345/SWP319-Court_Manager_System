import React, { Component } from "react";
import axios from "axios";

export default class Yard extends Component {
    state = {
        yards: [],
        yardOb: {
            yard_name: "",
            court_id: "",
            slots: [],
        },
        courts: [],
        slots: [],
        selectedSlotId: "",
        selectedCourtId: this.props.selectedCourtId,
    };

    componentDidMount() {
        this.fetchCourts();
        this.fetchYards();
        this.fetchSlots();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedCourtId !== this.props.selectedCourtId) {
            this.setState({ selectedCourtId: this.props.selectedCourtId }, () => {
                this.fetchYards();
                this.fetchSlots();
            });
        }
    }

    fetchSlots = () => {
        const { selectedCourtId } = this.state;
        axios
            .get(`http://localhost:3001/slot?court_id=${selectedCourtId}`)
            .then((res) => {
                this.setState({ slots: res.data });
            })
            .catch((err) => {
                alert("Không thể lấy dữ liệu từ API");
            });
    };

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

    fetchYards = () => {
        const { selectedCourtId } = this.state;
        axios
            .get(`http://localhost:3001/yard?court_id=${selectedCourtId}`)
            .then((res) => {
                this.setState({ yards: res.data });
            })
            .catch((err) => {
                console.error("Error fetching yards:", err);
                alert("Không thể lấy dữ liệu từ API");
            });
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            yardOb: {
                ...prevState.yardOb,
                [name]: value,
            },
        }));
    };

    handleAddYard = (e) => {
        e.preventDefault();
        const { yardOb, selectedCourtId } = this.state;
        yardOb.court_id = selectedCourtId;
        axios
            .post("http://localhost:3001/yard", yardOb)
            .then((res) => {
                this.fetchYards(); // Refresh the list of yards
                this.setState({
                    yardOb: { yard_name: "", court_id: "", slots: [] }, // Reset the form
                });
            })
            .catch((err) => {
                console.error("Error adding yard:", err);
                alert("Không thể thêm sân mới");
            });
    };

    handleSelectChange = (e) => {
        this.setState({ selectedSlotId: e.target.value });
    };

    handleAddSlotToYard = (yardId) => {
        const { selectedSlotId, yards, slots } = this.state;
        if (!selectedSlotId) {
            alert("Vui lòng chọn slot");
            return;
        }

        const yardIndex = yards.findIndex((yard) => yard.id === yardId);
        if (yardIndex !== -1) {
            const yard = yards[yardIndex];
            const selectedSlot = slots.find((slot) => slot.id === selectedSlotId);
            if (selectedSlot && !yard.slots.some((slot) => slot.id === selectedSlotId)) {
                yard.slots.push(selectedSlot);
                const updatedYards = [...yards];
                updatedYards[yardIndex] = yard;
                this.setState({ yards: updatedYards }, () => {
                    // Lưu slots của yard vào API
                    axios
                        .put(`http://localhost:3001/yard/${yardId}`, yard)
                        .then((res) => {
                            alert("Slot đã được thêm thành công vào sân và lưu vào API");
                        })
                        .catch((err) => {
                            console.error("Error updating yard slots in API:", err);
                            alert("Không thể lưu slot vào API");
                        });
                });
            } else {
                alert("Slot đã tồn tại trong sân");
            }
        } else {
            alert("Không tìm thấy sân để thêm slot");
        }
    };

    handleDeleteYard = (yardId) => {
        const confirmation = window.confirm("Bạn có chắc chắn muốn xóa sân này?");
        if (confirmation) {
            axios
                .delete(`http://localhost:3001/yard/${yardId}`)
                .then((res) => {
                    this.fetchYards(); // Refresh the list of yards
                })
                .catch((err) => {
                    console.error("Error deleting yard:", err);
                    alert("Không thể xóa sân");
                });
        }
    };

    handleDeleteSlot = (yardId, slotId) => {
        const { yards } = this.state;
        const yardIndex = yards.findIndex((yard) => yard.id === yardId);
        if (yardIndex !== -1) {
            const yard = yards[yardIndex];
            yard.slots = yard.slots.filter((slot) => slot.id !== slotId);
            this.setState({ yards }, () => {
                // Lưu slots của yard vào API
                axios
                    .put(`http://localhost:3001/yard/${yardId}`, yard)
                    .then((res) => {
                        alert("Slot đã được xóa khỏi sân và lưu vào API");
                    })
                    .catch((err) => {
                        console.error("Error updating yard slots in API:", err);
                        alert("Không thể lưu slot vào API");
                    });
            });
        }
    };

    renderNameYard = () => {
        const { yards } = this.state;
        return yards.map((yard, index) => (
            <li className="nav-item" role="presentation" key={yard.id}>
                <button
                    className={`nav-link ${index === 0 ? "active" : ""}`}
                    id={`yard-tab-${yard.id}`}
                    data-bs-toggle="tab"
                    data-bs-target={`#yard-${yard.id}`}
                    type="button"
                    role="tab"
                    aria-controls={`yard-${yard.id}`}
                    aria-selected={index === 0}
                >
                    {yard.yard_name}
                </button>
            </li>
        ));
    };

    renderNameSlot = () => {
        return this.state.slots.map((slot) => (
            <option key={slot.id} value={slot.id}>
                {slot.slot_name}
            </option>
        ));
    };

    renderTableSlotForYard = () => {
        const { yards } = this.state;

        return yards.map((yard, index) => (
            <div
                key={yard.id}
                className={`tab-pane fade ${index === 0 ? "show active" : ""}`}
                id={`yard-${yard.id}`}
                role="tabpanel"
                aria-labelledby={`yard-tab-${yard.id}`}
            >
                <div className="addSlot d-flex" style={{ alignItems: "center" }}>
                    <select onChange={this.handleSelectChange} className="my-3" style={{ border: "1px solid black", height: "40px" }}>
                        <option value="" className="">
                            Chọn slot
                        </option>
                        {this.renderNameSlot()}
                    </select>
                    <button
                        className="btn btn-success mx-2"
                        style={{ border: "1px solid black", height: "40px", width: "200px" }}
                        onClick={() => this.handleAddSlotToYard(yard.id)}
                    >
                        Thêm slot cho sân
                    </button>
                    <button
                        className="btn btn-danger "
                        style={{ border: "1px solid black", height: "40px", width: "200px" }}
                        onClick={() => this.handleDeleteYard(yard.id)}
                    >
                        Xóa sân
                    </button>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th colSpan={5}>Danh sách slot trong sân</th>
                        </tr>
                        <tr>
                            <th>STT</th>
                            <th>Tên Slot</th>
                            <th>Thời gian</th>
                            <th>Giá tiền</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderSlots(yard)}</tbody>
                </table>
            </div>
        ));
    };

    renderSlots = (yard) => {
        return yard.slots.map((slot, index) => (
            <tr key={slot.id}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{slot.slot_name}</td>
                <td className="text-center">
                    {slot.start_time} - {slot.end_time}
                </td>
                <td className="text-center">{slot.price}</td>
                <td className="text-center">
                    <button className="btn btn-danger w-50" onClick={() => this.handleDeleteSlot(yard.id, slot.id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        ));
    };

    render() {
        const { yardOb } = this.state;
        return (
            <div>
                <div className="w-50 m-auto">
                    <form onSubmit={this.handleAddYard}>
                        <div className="form-group">
                            <label htmlFor="yard_name">Tên sân:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="yard_name"
                                name="yard_name"
                                value={yardOb.yard_name}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Thêm sân
                        </button>
                    </form>
                </div>
                <div>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        {this.renderNameYard()}
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        {this.renderTableSlotForYard()}
                    </div>
                </div>
            </div>
        );
    }
}
