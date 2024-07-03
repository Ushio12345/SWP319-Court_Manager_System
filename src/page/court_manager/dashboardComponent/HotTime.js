import React, { Component } from "react";

class HotTime extends Component {
    state = {
        hotSlots: [
            {
                slotName: "Slot 1",
                startTime: "7:30",
                endTime: "8:30",
                numberBooked: "3",
            },
            {
                slotName: "Slot 2",
                startTime: "9:00",
                endTime: "10:00",
                numberBooked: "2",
            },
            {
                slotName: "Slot 3",
                startTime: "10:30",
                endTime: "11:30",
                numberBooked: "4",
            },
            {
                slotName: "Slot 4",
                startTime: "13:00",
                endTime: "14:00",
                numberBooked: "1",
            },
            {
                slotName: "Slot 5",
                startTime: "15:30",
                endTime: "16:30",
                numberBooked: "5",
            },
        ],
    };

    render() {
        // Limit to 5 slots
        const limitedSlots = this.state.hotSlots.slice(0, 5);

        return (
            <React.Fragment>
                {limitedSlots.map((slot, index) => (
                    <tr key={index}>
                        <td>{`${slot.slotName} (${slot.startTime} - ${slot.endTime})`}</td>
                        <td className="text-center">{slot.numberBooked}</td>
                    </tr>
                ))}
            </React.Fragment>
        );
    }
}

export default HotTime;
