import express from "express";
import {
  deleteUser,
  findAllUsers,
  findUserById,
  getMyAppointments,
  getUserProfile,
  updateUser,
} from "../Controllers/userController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/", findAllUsers);
router.get("/:id", authenticate, restrict(["patient"]), findUserById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/profile/me", authenticate, restrict(["patient"]), getUserProfile);
router.get(
  "/appointmnets/my-appointments",
  authenticate,
  restrict(["patient"]),
  getMyAppointments
);
export default router;
