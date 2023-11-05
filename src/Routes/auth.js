import express from "express";
import { Login, registerUser } from "../Controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", Login);

export default router;
