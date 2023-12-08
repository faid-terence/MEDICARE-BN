import express from "express";
import {
  deleteDoctor,
  findAllDoctors,
  findDoctorById,
  getDoctorProfile,
  updateDoctor,
} from "../Controllers/doctorController.js";
import reviewRouter from "./review.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

// nested route
router.use("/:doctorId/reviews", reviewRouter);

router.get("/", findAllDoctors);
router.get("/:id", findDoctorById);
router.patch("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);
router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);


export default router;
