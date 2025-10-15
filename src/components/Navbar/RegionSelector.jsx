import React from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { provinces } from "../../constant/constant";

export default function RegionSelector() {
    return (
        <div className="dropdown">
            <div
                tabIndex={0}
                role="button"
                className="btn m-1 justify-center items-center gap-2 rounded-full"
            >
                <MapPin className="w-5 h-5 text-yellow-400" />
                Chọn khu vực
                <ChevronDown className="w-5 h-5" />
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm max-h-64 overflow-y-auto grid grid-flow-row"
            >
                {provinces.map((province, index) => (
                    <li key={index}>
                        <a>{province}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
