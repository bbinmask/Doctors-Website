import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "15d" },
  );
};

export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    let user = null;

    // Check if user already exists based on role
    if (role == "patient") {
      user = await User.findOne({ email });
    } else if (role == "doctor") {
      user = await Doctor.findOne({ email });
    }

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create new user
    if (role == "patient") {
      user = new User({
        name,
        email,
        password,
        photo,
        gender,
        role,
      });
    } else if (role == "doctor") {
      user = new Doctor({
        name,
        email,
        password,
        photo,
        gender,
        role,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid role specified",
      });
    }

    // Save user to database
    await user.save();

    return res.status(201).json({
      success: true,
      message: "User successfully created",
    });
  } catch (error) {
    console.error("Error in register:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

export const login = async (req, res) => {
  const { password, email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = await Doctor.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Maybe you don't have an account. Sign up first!",
      });
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password.trim());

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Password not matched!",
      });
    }

    const token = generateToken(user);

    const { role, ...rest } = user._doc;

    return res.status(200).json({
      success: true,
      message: "Successfully logged in",
      token,
      data: { ...rest },
      role,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};
