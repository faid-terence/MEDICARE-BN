import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./src/Routes/auth.js";
import userRoutes from "./src/Routes/user.js";
import doctorRoutes from "./src/Routes/doctor.js";
import reviewRoutes from "./src/Routes/review.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

const corsOption = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("Welcome to Medicare APIS BY TERENCE FAID");
});

//Database Connection
mongoose.set("strictQuery", false);
const dbConnect = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("DB connected successful..");
  } catch (error) {
    console.log("DB Connection Failed");
  }
};
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/reviews", reviewRoutes);

app.listen(PORT, () => {
  dbConnect(), console.log(`Server listening on PORT ${PORT}`);
});
