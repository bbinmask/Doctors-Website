import {
  updateUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  getMyAppointments,
  getUserProfile,
  changePassword,
  checkPassword,
} from "../controllers/user.controller.js";

import { authenticate, restrict } from "../auth/verifyToken.auth.js";
import express from "express";

const router = express.Router();

router.get("/:id", authenticate, restrict(["patient"]), getSingleUser);
router.get("/", authenticate, restrict(["admin"]), getAllUser);
router.post(
  "/check-password/:id",
  authenticate,
  restrict(["patient"]),
  checkPassword
);
router.put("/:id", authenticate, restrict(["patient"]), updateUser);
router.put(
  "/change-password/:id",
  authenticate,
  restrict(["patient"]),
  changePassword
);
router.delete("/:id", authenticate, restrict(["patient"]), deleteUser);
router.get("/profile/me", authenticate, restrict(["patient"]), getUserProfile);
router.get(
  "/appointments/my-appointments",
  authenticate,
  restrict(["patient"]),
  getMyAppointments
);

export default router;
