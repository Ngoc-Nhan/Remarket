import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

import MenuDropdown from "./MenuDropdown";
import RegionSelector from "./RegionSelector";
import SearchBar from "./SearchBar";
import IconsGroup from "./IconsGroup";
import UserMenu from "./UserMenu";

export default function Navbar({ searchTerm, setSearchTerm }) {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="navbar top-0 fixed w-full z-50 bg-base-100 shadow-sm gap-2 justify-center mx-auto">
            <MenuDropdown />

            <div>
                <a className="btn btn-ghost text-xl">
                    <img src="./logo.png" className="w-15" alt="logo" />
                </a>
            </div>

            <RegionSelector />
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <IconsGroup />
            <UserMenu user={user} navigate={navigate} dispatch={dispatch} logout={logout} />
        </div>
    );
}
