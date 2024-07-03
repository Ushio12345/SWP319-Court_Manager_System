import React from "react";

export default function NewUserItem({ newUser }) {
    const getRoleBackgroundColor = (role) => {
        switch (role) {
            case "Khách":
                return "lightgreen";
            case "Chủ sân":
                return "lightcoral";
            default:
                return "lightgray";
        }
    };

    return (
        <div>
            <div>
                <div className="newUser-body-item">
                    <div className="newUser-body-right">
                        <div className="newUser-avatar">
                            <img src={newUser.avatarUrl} alt="User Avatar" />
                        </div>
                        <div className="newUser-body-infoUser">
                            <div className="newUser-name">{newUser.name}</div>
                            <div className="newUser-email">{newUser.email}</div>
                        </div>
                    </div>
                    <div
                        className="newUser-role"
                        style={{ backgroundColor: getRoleBackgroundColor(newUser.role), padding: "5px", borderRadius: "5px" }}
                    >
                        {newUser.role}
                    </div>
                </div>
            </div>
        </div>
    );
}
