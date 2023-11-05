import User from "../Models/UserSchema.js";
import Doctor from "../Models/DoctorSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;
  try {
    if (!name || !email || !password || !role || !gender || !photo) {
      res.status(401).json({ message: "Invalid Inputs" });
    }
    let user = null;
    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }
    // If user exists

    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }

    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }

    await user.save();

    res.status(200).json({ success: true, message: "Registration Successful" });
  } catch (error) {}
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(401).json({ message: "Invalid Inputs" });
    }
    const user = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });
    if (!user || !doctor) {
      res.status(401).json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {}
};
