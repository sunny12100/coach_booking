const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const seatRoutes = require("./routes/seatRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/seats", seatRoutes);

module.exports = app;
