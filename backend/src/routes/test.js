const express = require("express");
const pool = require("../config/db.js");

const router = express.Router();

router.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res
      .status(200)
      .json({ message: "Database connected!", time: result.rows[0].now });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Database connection failed", details: err.message });
  }
});

module.exports = router;
