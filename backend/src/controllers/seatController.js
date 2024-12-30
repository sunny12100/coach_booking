const pool = require("../config/db");

const fetchSeats = async (req, res) => {
  try {
    const query = "SELECT * FROM seats ORDER BY row_number, seat_number";
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch seats", details: err.message });
  }
};

const reserveSeats = async (req, res) => {
  const { seatCount } = req.body;
  const userId = req.user.userId; // Extracted from authMiddleware

  // Validate seat count
  if (seatCount > 7) {
    return res
      .status(400)
      .json({ error: "Cannot reserve more than 7 seats at a time." });
  }

  try {
    // Step 1: Fetch all unreserved seats
    const query = `
      SELECT * FROM seats 
      WHERE is_reserved = FALSE 
      ORDER BY row_number, seat_number
      FOR UPDATE;
    `;
    const result = await pool.query(query);
    const availableSeats = result.rows;

    // Step 2: Ensure enough seats are available
    if (availableSeats.length < seatCount) {
      return res.status(400).json({ error: "Not enough seats available." });
    }

    const rowCount = 12;

    // Step 3: Attempt to reserve seats in the same row
    for (let row = 1; row <= rowCount; row++) {
      const rowSeats = availableSeats.filter((seat) => seat.row_number === row);
      const availableInRow = rowSeats.filter((seat) => !seat.is_reserved);

      if (availableInRow.length >= seatCount) {
        const seatsToReserve = availableInRow.slice(0, seatCount);
        const reservedSeats = seatsToReserve.map((seat) => seat.id);

        // Update the seats as reserved
        const updateQuery = `
          UPDATE seats 
          SET is_reserved = TRUE, reserved_by = $1 
          WHERE id = ANY($2::int[])
        `;
        await pool.query(updateQuery, [userId, reservedSeats]);

        return res.status(200).json({
          message: "Seats reserved successfully.",
          reservedSeats: seatsToReserve,
        });
      }
    }

    // Step 4: Book seats in different nearby rows if not enough in the same row
    const rowSeatsAvailability = [];

    for (let row = 1; row <= rowCount; row++) {
      const rowSeats = availableSeats.filter((seat) => seat.row_number === row);
      const availableInRow = rowSeats.filter(
        (seat) => !seat.is_reserved
      ).length;
      rowSeatsAvailability.push(availableInRow);
    }

    let minLength = Infinity;
    let minStart = -1;
    let minEnd = -1;
    let start = 0;
    let end = 0;
    let sum = 0;

    // Find nearby rows that together can accommodate the seat count
    while (end < rowSeatsAvailability.length) {
      sum += rowSeatsAvailability[end];

      while (sum >= seatCount) {
        let length = end - start + 1;
        if (length < minLength) {
          minLength = length;
          minStart = start;
          minEnd = end;
        }
        sum -= rowSeatsAvailability[start];
        start++;
      }
      end++;
    }

    // Step 5: Allocate seats from the nearby rows
    let finalSeats = [];
    for (let row = minStart + 1; row <= minEnd + 1; row++) {
      const rowSeats = availableSeats.filter(
        (seat) => seat.row_number === row && !seat.is_reserved
      );
      finalSeats = finalSeats.concat(rowSeats);
    }

    // Slice the final seats to the required count
    finalSeats = finalSeats.slice(0, seatCount);

    // Update the seats as reserved
    const reservedSeats = finalSeats.map((seat) => seat.id);
    const updateQuery = `
      UPDATE seats 
      SET is_reserved = TRUE, reserved_by = $1 
      WHERE id = ANY($2::int[])
    `;
    await pool.query(updateQuery, [userId, reservedSeats]);

    // Return the successfully reserved seats
    return res.status(200).json({
      message: "Seats reserved successfully across nearby rows.",
      reservedSeats: finalSeats,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to reserve seats", details: err.message });
  }
};

const resetSeats = async (req, res) => {
  const userId = req.user.userId; // Get user ID from the auth token

  try {
    // Update seats reserved by the user and set them back to unreserved
    const updateQuery = `
      UPDATE seats 
      SET is_reserved = FALSE, reserved_by = NULL 
      WHERE reserved_by = $1;
    `;
    await pool.query(updateQuery, [userId]);

    res.status(200).json({ message: "Seats reset successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to reset seats", details: err.message });
  }
};

module.exports = { resetSeats, fetchSeats, reserveSeats };
