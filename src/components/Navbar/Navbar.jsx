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
    <div className="navbar fixed top-0 w-full z-50 bg-base-100 shadow-sm px-4 flex items-center justify-between">
      
      {/* Bên trái: menu + logo */}
      <div className="flex items-center gap-3">
        <MenuDropdown />
        <div
          className="cursor-pointer flex items-center gap-2"
          onClick={() => navigate("/")}
        >
          <img src="/logo.png" alt="logo" className="w-8 h-8 object-contain" />
          <span className="font-semibold text-gray-800">SecondHand</span>
        </div>
      </div>

      {/* Giữa: khu vực + search */}
      <div className="flex items-center gap-2 flex-1 justify-center">
        <RegionSelector />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* Bên phải: icon + user */}
      <div className="flex items-center gap-3">
        <IconsGroup />
        <UserMenu
          user={user}
          navigate={navigate}
          dispatch={dispatch}
          logout={logout}
        />
      </div>
    </div>
  );
}

