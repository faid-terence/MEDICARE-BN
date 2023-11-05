import express from "express";
import {
  deleteDoctor,
  findAllDoctors,
  findDoctorById,
  updateDoctor,
} from "../Controllers/doctorController.js";

const router = express.Router();

router.get("/", findAllDoctors);
router.get("/:id", findDoctorById);
router.patch("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);
export default router;
