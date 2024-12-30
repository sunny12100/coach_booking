const pool = require("../config/db.js");

const getSeats = async () => {
  const query = `SELECT * FROM seats ORDER BY row_number , seat_number`;
  const result = await pool.query(query);
  return result.rows;
};

const reserveSeats = async (seatIds, userId) => {
  const query = `UPDATE seats SET is_reserved = true , reserved_by = $1 where id = ANY($2::int[])`;
  const values = [userId, seatIds];
  await pool.query(query, values);
};

const resetReservation = async (seatId) => {
  const query = `UPDATE seats SET is_reserved = false, reserved_by = NULL WHERE id = $1`;
  await pool.query(query, [seatId]);
};

module.exports = { getSeats, reserveSeats, resetReservation };
