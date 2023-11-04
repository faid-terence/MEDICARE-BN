import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

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

app.listen(PORT, () => {
  dbConnect(), console.log(`Server listening on PORT ${PORT}`);
});
