import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

//Route for user login
const loginUser = async (req, res) => {
  res.json({ mssg: "login user" });
};

// Function to create JWT token
const createToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET);
};

//Route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }
    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }
    // Validate password
    if (!validator.isStrongPassword(password)) { //minlength-8, lowercase-1, uppercase-1, symbol-1
    // if (password.length < 8) {
      return res.status(400).json({ error: "Weak password" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    const token = createToken(user._id, user.email);
    res.json({ success: true, token });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Route for admin login
const adminLogin = async (req, res) => {};

export { loginUser, registerUser, adminLogin };
