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
router.post("/your-req/:id", deleteAppointment);
router.get("/:id", getAppoinment);
router.post("/:id", updateAppointment);
router.get("/check/:id", checkAppointmentStatus);
export default router;
