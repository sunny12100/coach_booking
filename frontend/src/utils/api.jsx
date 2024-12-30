import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const signupUser = (data) => api.post("/auth/signup", data);
export const loginUser = (data) => api.post("/auth/login", data);
export const fetchSeats = () => api.get("/seats");
export const reserveSeats = (seatCount, token) =>
  api.post(
    "/seats/reserve",
    { seatCount }, // This is the data you want to send in the request body
    {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in the headers
      },
    }
  );
export const resetSeats = async (token) => {
  const response = await api.post(
    "/seats/reset",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
