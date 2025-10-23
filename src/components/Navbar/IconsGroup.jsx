import React from "react";
import { MessagesSquare } from 'lucide-react';
import { Bell } from 'lucide-react';
import { Heart } from 'lucide-react';
export default function IconsGroup() {
    return (
        <div className="flex gap-3 text-xl">
            <Heart />
            <MessagesSquare />
            <Bell />
        </div>
    );
}
