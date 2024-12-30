import React from "react";
import Seat from "./Seat";

const SeatLayout = ({ seats, onSeatClick }) => {
  if (!Array.isArray(seats) || seats.length === 0) {
    return <div>No seats available.</div>; // Show message when seats are unavailable
  }

  return (
    <div className="grid grid-cols-7 gap-y-2  md:px-32 py-5 bg-gray-100">
      {seats.map((seat) => (
        <Seat
          key={seat.id}
          seat={seat}
          onClick={() => onSeatClick(seat.id)}
          isReserved={seat.is_reserved} // Pass reservation status to each seat
        />
      ))}
    </div>
  );
};

export default SeatLayout;
