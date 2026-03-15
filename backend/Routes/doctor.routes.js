import {
  updateDoctor,
  getAllDoctor,
  getSingleDoctor,
  deleteDoctor,
  getDoctorProfile,
  getInitDoctor,
  getDoctorReviews,
} from "../controllers/doctor.controller.js";
import { authenticate, restrict } from "../auth/verifyToken.auth.js";
import { Router } from "express";
import reviewRoute from "../routes/review.routes.js";

const router = Router();

// Nested route
router.use("/:doctorId/reviews", reviewRoute);
router.get("/search/:id", getSingleDoctor);
router.get("/reviews/:id", getDoctorReviews);
router.get("/", getAllDoctor);
router.get("/initial-doctors", getInitDoctor);
router.get("/:id", authenticate, restrict(["doctor"]), updateDoctor);
router.get("/:id", authenticate, restrict(["doctor"]), deleteDoctor);
router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);

export default router;
