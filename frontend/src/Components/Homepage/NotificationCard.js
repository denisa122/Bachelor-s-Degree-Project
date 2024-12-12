import React from "react";

const NotificationCard = ({ text }) => {
    return (
        <div className="notificationCard mt-4 mb-2 border rounded px-2 py-4 border-[#252D3B] bg-[#E3DFE5] text-sm">
            <p>{text}</p>
        </div>
    );
};

export default NotificationCard;