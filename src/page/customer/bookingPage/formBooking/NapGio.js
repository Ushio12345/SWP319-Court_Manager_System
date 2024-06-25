import React, { Component } from "react";
import "../booking.css";

export default class NapGio extends Component {
    render() {
        return (
            <div className="nap-gio ">
                <h2 class="text-center">NẠP GIỜ CHƠI</h2>
                <p class="text-center">(Chỉ dành cho người chơi đăng kí lịch linh hoạt)</p>
                <div class="input-gio">
                    <label for="inputgio">Nhập giờ: </label>
                    <input type="number" id="inputgio" placeholder="Nhập số giờ muốn nạp" />
                    <p>Giá tiền:</p>
                    <button class="btn btn-success w-25">Nạp</button>
                </div>
            </div>
        );
    }
}
