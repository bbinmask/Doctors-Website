import express from "express";
import { authenticate } from "../auth/verifyToken.auth.js";
import {
  checkAppointmentStatus,
  deleteAppointment,
  getAppoinment,
  makeAnAppoinment,
  updateAppointment,
} from "../controllers/appoinment.controller.js";

const router = express.Router();

router.post("/new-appointment", authenticate, makeAnAppoinment);
router.delete("/:id", authenticate, deleteAppointment);
router.get("/:id", authenticate, getAppoinment);
router.post("/:id", authenticate, updateAppointment);
router.get("/check/:id", checkAppointmentStatus);
export default router;
