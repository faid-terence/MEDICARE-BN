import UserSchema from "../Models/UserSchema.js";
import DoctorSchema from "../Models/DoctorSchema.js";

import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  // Get Token from Headers
  const authToken = req.headers.authorization;

  // Check if token exists
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "No Token, Authorization denied" });
  }

  try {
    // Extract the token from the "Bearer" prefix
    const token = authToken.split(" ")[1];

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token is expired" });
    } else {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;

  let user;

  const patient = await UserSchema.findById(userId);
  const doctor = await DoctorSchema.findById(userId);

  if (patient) {
    user = patient;
  }
  if (doctor) {
    user = doctor;
  }
  if (!roles.includes(user.role)) {
    return res
      .status(401)
      .json({ success: false, message: "You're not authorized" });
  }

  next();
};
