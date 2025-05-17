import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Function to create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    // Create JWT token
    const token = createToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });
    res
      .json({ success: true, token, message: "User logged in successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  Route for logout user
const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });
  res.json({ success: true, message: "Logged out successfully" });
};
const logoutAdmin = (req, res) => {
  res.clearCookie("AdminToken", {
    httpOnly: true,
    sameSite: "lax",
  });
  res.json({ success: true, message: "Logged out successfully" });
};

//Route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({ message: "Invalid email address" });
    }

    // Validate password
    // if (!validator.isStrongPassword(password)) {
    //minlength-8, lowercase-1, uppercase-1, symbol-1
    if (password.length < 8) {
      return res.json({ message: "Weak password" });
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

    const token = createToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });
    res.json({ success: true, token, message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message:error.message });
  }
};

//Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Create JWT token
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.cookie("AdminToken", token, {
        httpOnly: true,
        sameSite: "lax",
      });
      return res.json({ success: true, token, message: "Login successful" });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



const check = (req, res, next) => {
const token = req.cookies.token

 if (!token) return res.json({ success: false ,message:"Unauthorized Access!"});
  try {
   const token_decoded= jwt.verify(token, process.env.JWT_SECRET);
    if(token_decoded){
      return res.json({success:true})
    }
    next();
  } catch (error) {
    console.log("Error in adminAuth middleware:",error.message);
    return res.status(500).json({ success:false,message: error.message });
  }
  }



export { loginUser, registerUser, adminLogin, logoutUser,logoutAdmin,check };
