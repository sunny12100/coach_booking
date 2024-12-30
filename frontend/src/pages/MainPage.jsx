import React, { useEffect, useState } from "react";
import SeatLayout from "../components/SeatLayout";
import SeatReservationForm from "../components/SeatReservationForm";
import { fetchSeats, reserveSeats, resetSeats } from "../utils/api"; // Ensure resetSeats is included
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainPage = ({ user }) => {
  const [seats, setSeats] = useState([]);

  // Load seats data on initial load
  useEffect(() => {
    const loadSeats = async () => {
      try {
        const response = await fetchSeats(); // Fetch seat data from the server
        setSeats(response.data); // Set the fetched seats data to state
      } catch (error) {
        toast.error("Failed to fetch seats");
      }
    };
    loadSeats();
  }, []);

  // Handle clicking a seat (this could be for selecting seats to reserve)
  const handleSeatClick = (seatId) => {
    toast.warning(`Seat ${seatId} clicked!`);
  };

  // Handle reserving seats
  const handleReserveSeats = async (seatCount) => {
    try {
      // Call the API to reserve the seats
      const response = await reserveSeats(
        seatCount,
        localStorage.getItem("authToken")
      );

      // If reservation is successful, update the seats state with the new layout
      if (response.status === 200) {
        const updatedSeats = await fetchSeats(); // Fetch updated seat data from the server
        setSeats(updatedSeats.data); // Update the seat layout with fresh data
        toast.success(`Seat reserved successfully!`);
      } else {
        toast.error("Failed to reserve seats.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Reservation failed");
    }
  };

  // Handle resetting seats
  const handleResetSeats = async () => {
    try {
      // Reset the seats for the logged-in user
      const response = await resetSeats(localStorage.getItem("authToken"));

      // After reset, fetch the updated seat data from the server
      const updatedSeats = await fetchSeats(); // Fetch latest seat data
      setSeats(updatedSeats.data); // Update the seat layout with fresh data

      toast.success("Seats reset successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="flex-1 bg-gray-200 p-4">
        <h2 className="text-3xl font-medium mb-4 ml-24 md:ml-72">
          Seat Layout
        </h2>
        <SeatLayout seats={seats} onSeatClick={handleSeatClick} />
      </div>
      <div className="flex-1 bg-white p-4">
        <h2 className="text-xl font-bold mb-4">Reserve Your Seats</h2>
        <SeatReservationForm onReserveSeats={handleReserveSeats} />
        <button
          onClick={handleResetSeats}
          className="mt-4 p-2 w-52 h-12  bg-red-500 text-white rounded-md hover:text-gray-300"
        >
          Reset My Seats
        </button>
      </div>
    </div>
  );
};

export default MainPage;
