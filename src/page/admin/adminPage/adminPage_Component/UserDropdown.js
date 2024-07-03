import React, { useState } from "react";

export default function UserDropdown({ user, handleLogout }) {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <div className="relative">
            <div className="flex items-center ms-3">
                {/* infor admin dropdown */}
                <div>
                    <button
                        type="button"
                        className="infor-userAccount flex text-sm"
                        aria-expanded={dropdownVisible ? "true" : "false"}
                        onClick={toggleDropdown}
                        style={{ alignItems: "center" }}
                    >
                        <span className="sr-only">Open user menu</span>
                        <img
                            className="w-8 h-8 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 me-3"
                            src={user.avatar}
                            alt="user photo"
                        />
                        <div className="userName">{user.username}</div>
                    </button>
                </div>
                {/* infor admin dropdown */}

                {/* dropdown-item */}
                <div
                    className={`z-100 ${
                        dropdownVisible ? "block" : "hidden"
                    } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-0 mt-2 w-180 top-100`}
                    id="dropdown-user"
                >
                    <div className="px-2 py-3" role="none">
                        <p className="text-sm text-gray-900 dark:text-white" role="none">
                            {user.username || "Ushio"}
                        </p>
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                            {user.email || "Ushio@gmail.com"}
                        </p>
                    </div>
                    <ul className="px-2" role="none">
                        <li className="hover:bg-gray-100">
                            <a
                                href="#"
                                className="block py-2 text-sm text-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                role="menuitem"
                            >
                                Hồ sơ
                            </a>
                        </li>
                        <li className="hover:bg-gray-100">
                            <a
                                href="#"
                                className="block py-2 text-sm text-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                role="menuitem"
                            >
                                Xóa tài khoản
                            </a>
                        </li>

                        <li className="hover:bg-gray-100">
                            <a
                                href=""
                                className="flex align-items-center justify-center rounded py-2 text-sm"
                                role="menuitem"
                                style={{ backgroundColor: "#002e86", color: "white" }}
                                onClick={handleLogout}
                            >
                                Đăng xuất
                            </a>
                        </li>
                    </ul>
                </div>
                {/* dropdown-item */}
            </div>
        </div>
    );
}
