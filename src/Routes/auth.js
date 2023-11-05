import express from "express";
import { registerUser } from "../Controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);

export default router;
