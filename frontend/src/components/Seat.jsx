import React from "react";

const Seat = ({ seat, onClick, isReserved }) => {
  return (
    <div
      className={`w-10 h-10 flex items-center justify-center cursor-pointer 
        ${
          isReserved
            ? "bg-red-500 hover:bg-red-700"
            : "bg-green-500 hover:bg-green-700"
        } rounded`}
      onClick={onClick}
    >
      {(seat.row_number - 1) * 7 + seat.seat_number}
    </div>
  );
};

export default Seat;
