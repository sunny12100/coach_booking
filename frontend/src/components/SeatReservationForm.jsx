import React, { useState } from "react";

const SeatReservationForm = ({ onReserveSeats }) => {
  const [seatCount, setSeatCount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onReserveSeats(seatCount);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="flex flex-row gap-3 mt-3">
        <label className="text-lg font-medium" htmlFor="seatCount">
          Number of Seats to Reserve:
        </label>
        <input
          className="text-lg font-medium border-black border-b-2  focus:outline-none"
          type="number"
          id="seatCount"
          value={seatCount}
          onChange={(e) => setSeatCount(Number(e.target.value))}
          min="1"
          max="7"
        />
      </div>

      <button
        className="text-white mt-4 bg-black w-52 rounded-md h-12 hover:text-gray-300"
        type="submit"
      >
        Reserve Seats
      </button>
    </form>
  );
};

export default SeatReservationForm;
