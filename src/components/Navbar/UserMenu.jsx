import React from "react";
import { ChevronDown } from "lucide-react";

export default function UserMenu({ user, navigate, dispatch, logout }) {
    return (
        <div className="flex items-center gap-2 ml-3">
            {user ? (
                <>
                    <button
                        className="btn btn-sm rounded-full bg-green-300 mx-1"
                        onClick={() => navigate("/ManagePost")}
                    >
                        Quản lý tin
                    </button>
                    <button
                        className="btn btn-sm rounded-full bg-yellow-300 mx-1"
                        onClick={() => {
                            if (!user) {
                                alert("Vui lòng đăng nhập để tiếp tục");
                                navigate("/login");
                            } else navigate("/PostNews");
                        }}
                    >
                        Đăng tin
                    </button>

                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn m-1 justify-center items-center gap-2 rounded-full text-xl"
                        >
                            <img
                                src={user.picture}
                                alt="avatar"
                                className="w-8 h-8 rounded-full"
                            />
                            <ChevronDown className="w-5 h-5" />
                        </div>

                        <div className="dropdown-content z-50">
                            <ul className="menu bg-base-100 rounded-box w-52 p-2 shadow-sm">
                                <li>
                                    <a>Trang cá nhân</a>
                                </li>
                                <li>
                                    <a>Cài đặt</a>
                                </li>
                                <li>
                                    <button
                                        onClick={() => dispatch(logout())}
                                        className="w-full text-left"
                                    >
                                        Đăng xuất
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <button
                        className="btn btn-sm rounded-full mx-1"
                        onClick={() => navigate("/login")}
                    >
                        Đăng nhập
                    </button>
                    <button
                        className="btn btn-sm rounded-full bg-yellow-300 mx-1"
                        onClick={() => navigate("/post")}
                    >
                        Đăng tin
                    </button>
                </>
            )}
        </div>
    );
}
