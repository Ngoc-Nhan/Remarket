import React from "react";
import DanhMuc from "../../pages/DanhMuc";

export default function MenuDropdown() {
  return (
    <div className="dropdown">
      <summary
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-square"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </summary>

      <div
        tabIndex={0}
        className="dropdown-content bg-base-100 rounded-box w-[350px] p-4 shadow-lg"
      >
        <DanhMuc />
      </div>
    </div>
  );
}
