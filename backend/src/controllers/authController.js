const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/userModel.js");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, email, hashedPassword);

    res
      .status(201)
      .json({ message: "User created successfully", userId: user.id });
  } catch (error) {
    console.error("Signup error: ", error); // Log the error for better debugging
    res
      .status(500)
      .json({ error: "Failed to create user", details: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide email and password" });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Login error: ", error); // Log the error for better debugging
    res.status(500).json({ error: "Login failed", details: error.message });
  }
};

module.exports = { signup, login };
