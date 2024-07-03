import React from "react";

export default function NewCourtItem() {
    const newCourts = [
        {
            fullName: "Sân cầu lông Thành An",
            address: "123 Đường A, Phường B, Quận C",
            avatarUrl: "https://i.pravatar.cc/150?img=4",
            rating: 4.5,
        },
        {
            fullName: "Sân cầu lông Zen",
            address: "456 Đường D, Phường E, Quận F",
            avatarUrl: "https://i.pravatar.cc/150?img=5",
            rating: 3.8,
        },
        {
            fullName: "Sân cầu lông Phú Thành",
            address: "789 Đường G, Phường H, Quận I",
            avatarUrl: "https://i.pravatar.cc/150?img=10",
            rating: 4.0,
        },
        {
            fullName: "Sân cầu lông ACC",
            address: "101 Đường J, Phường K, Quận L",
            avatarUrl: "https://i.pravatar.cc/150?img=12",
            rating: 4.2,
        },
        {
            fullName: "Sân cầu lông Sport Life",
            address: "202 Đường M, Phường N, Quận O",
            avatarUrl: "https://i.pravatar.cc/150?img=15",
            rating: 3.5,
        },
    ];

    const getRatingColor = (rating) => {
        if (rating >= 4.5) {
            return "lightgreen";
        } else if (rating >= 4.0) {
            return "lightblue";
        } else if (rating >= 3.5) {
            return "lightgoldenrodyellow";
        } else {
            return "lightcoral";
        }
    };

    return (
        <div className="">
            {newCourts.map((court) => (
                <div
                    key={court.address}
                    className="newCourt-body-item"
                    style={{ margin: "5px", padding: "5px", border: "1px solid #ccc", borderRadius: "5px" }}
                >
                    <div className="newCourt-body-right" style={{ display: "flex", alignItems: "center" }}>
                        <div className="newCourt-avatar" style={{ marginRight: "10px" }}>
                            <img src={court.avatarUrl} alt="Court Avatar" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                        </div>
                        <div className="newCourt-body-infoCourt">
                            <div className="newCourt-fullName" style={{ fontWeight: "bold" }}>
                                {court.fullName}
                            </div>
                            <div className="newCourt-address" style={{ color: "gray" }}>
                                {court.address}
                            </div>
                        </div>
                    </div>
                    <div
                        className="newCourt-rating"
                        style={{
                            backgroundColor: getRatingColor(court.rating),
                            padding: "5px 10px",
                            borderRadius: "5px",
                            textAlign: "center",
                            marginTop: "10px",
                        }}
                    >
                        {court.rating} ⭐
                    </div>
                </div>
            ))}
        </div>
    );
}
