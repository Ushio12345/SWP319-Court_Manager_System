import React from "react";

export default function NewUserItem() {
    // Sample user data directly within the component
    const newUsers = [
        {
            name: "Hoàng Mạnh Dũng",
            email: "dunghoangne@gmail.com",
            avatarUrl: "https://i.pravatar.cc/150?img=4",
            role: "Khách",
        },
        {
            name: "Lê Ngọc Ánh",
            email: "anhngocLe@gmail.com",
            avatarUrl: "https://i.pravatar.cc/150?img=5",
            role: "Chủ sân",
        },
        {
            name: "Nguyễn Văn Bách",
            email: "nguyenbach123@gmail.com",
            avatarUrl: "https://i.pravatar.cc/150?img=10",
            role: "Khách",
        },
        {
            name: "Phạm Thị Hồng",
            email: "hongpham@gmail.com",
            avatarUrl: "https://i.pravatar.cc/150?img=12",
            role: "Khách",
        },
        {
            name: "Trần Quốc Tuấn",
            email: "quoc.tuan@gmail.com",
            avatarUrl: "https://i.pravatar.cc/150?img=15",
            role: "Chủ sân",
        },
    ];

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
        <div className="">
            {newUsers.map((user) => (
                <div
                    key={user.email}
                    className="newUser-body-item"
                    style={{ margin: "5px", padding: "5px", border: "1px solid #ccc", borderRadius: "5px" }}
                >
                    <div className="newUser-body-right" style={{ display: "flex", alignItems: "center" }}>
                        <div className="newUser-avatar" style={{ marginRight: "10px" }}>
                            <img src={user.avatarUrl} alt="User Avatar" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                        </div>
                        <div className="newUser-body-infoUser">
                            <div className="newUser-name" style={{ fontWeight: "bold" }}>
                                {user.name}
                            </div>
                            <div className="newUser-email" style={{ color: "gray" }}>
                                {user.email}
                            </div>
                        </div>
                    </div>
                    <div
                        className="newUser-role"
                        style={{
                            backgroundColor: getRoleBackgroundColor(user.role),
                            padding: "5px 10px",
                            borderRadius: "5px",
                            textAlign: "center",
                            marginTop: "10px",
                        }}
                    >
                        {user.role}
                    </div>
                </div>
            ))}
        </div>
    );
}
