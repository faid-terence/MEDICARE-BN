import express from "express";
import {
  deleteDoctor,
  findAllDoctors,
  findDoctorById,
  updateDoctor,
} from "../Controllers/doctorController.js";
import reviewRouter from "./review.js";

const router = express.Router();

// nested route
router.use("/:doctorId/reviews", reviewRouter);

router.get("/", findAllDoctors);
router.get("/:id", findDoctorById);
router.patch("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);
export default router;
