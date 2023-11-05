import express from "express";
import {
  deleteUser,
  findAllUsers,
  findUserById,
  updateUser,
} from "../Controllers/userController.js";

const router = express.Router();

router.get("/", findAllUsers);
router.get("/:id", findUserById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
export default router;