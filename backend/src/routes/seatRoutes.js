const express = require("express");
const {
  fetchSeats,
  reserveSeats,
  resetSeats,
} = require("../controllers/seatController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const router = express.Router();

router.get("/", fetchSeats);
router.post("/reserve", authMiddleware, reserveSeats);
router.post("/reset", authMiddleware, resetSeats);

module.exports = router;
