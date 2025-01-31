import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.routes.js";
import userRoute from "./Routes/user.routes.js";
import reviewRoute from "./Routes/review.routes.js";
import appointmentRoute from "./Routes/appoinment.routes.js";
import doctorRoute from "./Routes/doctor.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("Api is working");
});

// database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.warn("MongoDB database connected successfully.");
  } catch (error) {
    console.error(error);
  }
};

// middlewares

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/appointment", appointmentRoute);

app.listen(port, () => {
  connectDB();
  console.warn("Server is running: ", port);
});
