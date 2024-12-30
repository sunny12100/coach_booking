const pool = require("../config/db.js");

const createUser = async (username, email, password) => {
  const query = `INSERT INTO users(username,email,password) VALUES ($1,$2,$3) RETURNING id`;
  const values = [username, email, password];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email=$1`;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};
module.exports = { createUser, findUserByEmail };
