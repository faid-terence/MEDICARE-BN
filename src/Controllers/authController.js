import User from "../Models/UserSchema.js";
import Doctor from "../Models/DoctorSchema.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;
  try {
    if (!name || !email || !password || !role || !gender || !photo) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Inputs" });
    }

    let user;

    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

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
    } else if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    } else {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    await user.save();

    res.status(200).json({ success: true, message: "Registration Successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const Login = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email || !req.body.password) {
      res.status(401).json({ message: "Invalid Inputs!" });
    }
    let user = null;
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });
    if (patient) user = patient;
    if (doctor) user = doctor;
    if (!user)
      res.status(401).json({ success: false, message: "Invalid Credentials" });

    //Compare password with Hashed Password
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      res.status(401).json({ success: false, message: "Invalid Cedentials" });
    }
    //Generate Token
    const token = generateToken(user);

    const { password, role, appointments, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      data: { ...rest },
      role,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
    console.log(error);
  }
};
