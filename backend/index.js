import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./Routes/user.routes.js";
import reviewRoute from "./Routes/review.routes.js";
import appointmentRoute from "./Routes/appoinment.routes.js";
import doctorRoute from "./Routes/doctor.routes.js";
import authRoute from "./Routes/auth.routes.js";
import Doctor from "./models/DoctorSchema.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: true,
};

app.get("/api", async (req, res) => {
  const doctors = [
    {
      email: "cardio1@medicare.com",
      password: "hashedpassword",
      name: "Dr. Ethan Carter",
      phone: 9876543210,
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
      ticketPrice: 700,
      role: "doctor",
      specialization: "Cardiology",
      specialFields: ["Heart Failure", "Coronary Artery Disease"],
      qualifications: ["MBBS", "MD Cardiology"],
      experiences: ["10 years at Apollo Hospital"],
      bio: "Heart specialist",
      about:
        "Experienced cardiologist specializing in heart diseases and preventive care.",
      timeSlots: [{ start: "09:00 AM" }, { end: "01:00 PM" }],
      averageRating: 4.5,
      totalRating: 120,
      isApproved: "approved",
    },

    {
      email: "neuro1@medicare.com",
      password: "hashedpassword",
      name: "Dr. Olivia Bennett",
      phone: 9876543211,
      photo: "https://images.unsplash.com/photo-1594824475317-3c7e1a4c42e6",
      ticketPrice: 900,
      role: "doctor",
      specialization: "Neurology",
      specialFields: ["Stroke", "Epilepsy"],
      qualifications: ["MBBS", "DM Neurology"],
      experiences: ["12 years neurological practice"],
      bio: "Brain specialist",
      about: "Expert neurologist focused on neurological disorders.",
      timeSlots: [{ start: "10:00 AM" }, { end: "03:00 PM" }],
      averageRating: 4.7,
      totalRating: 200,
      isApproved: "approved",
    },

    {
      email: "derma1@medicare.com",
      password: "hashedpassword",
      name: "Dr. Sophia Martinez",
      phone: 9876543212,
      photo: "https://images.unsplash.com/photo-1580281657527-47dca1c49c02",
      ticketPrice: 500,
      role: "doctor",
      specialization: "Dermatology",
      specialFields: ["Skin Allergies", "Acne Treatment"],
      qualifications: ["MBBS", "MD Dermatology"],
      experiences: ["8 years skin clinic practice"],
      bio: "Skin specialist",
      about: "Dermatologist helping patients with skin care and treatment.",
      timeSlots: [{ start: "11:00 AM" }, { end: "04:00 PM" }],
      averageRating: 4.4,
      totalRating: 90,
      isApproved: "approved",
    },

    {
      email: "ortho1@medicare.com",
      password: "hashedpassword",
      name: "Dr. Daniel Walker",
      phone: 9876543213,
      photo: "https://images.unsplash.com/photo-1612349316228-5942a9b489c2",
      ticketPrice: 650,
      role: "doctor",
      specialization: "Orthopedics",
      specialFields: ["Joint Replacement", "Sports Injuries"],
      qualifications: ["MBBS", "MS Orthopedics"],
      experiences: ["11 years orthopedic surgery"],
      bio: "Bone specialist",
      about: "Orthopedic surgeon specializing in bones and joints.",
      timeSlots: [{ start: "08:00 AM" }, { end: "12:00 PM" }],
      averageRating: 4.6,
      totalRating: 150,
      isApproved: "approved",
    },

    {
      email: "pedia1@medicare.com",
      password: "hashedpassword",
      name: "Dr. Emily Johnson",
      phone: 9876543214,
      photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54",
      ticketPrice: 400,
      role: "doctor",
      specialization: "Pediatrics",
      specialFields: ["Child Care", "Vaccination"],
      qualifications: ["MBBS", "MD Pediatrics"],
      experiences: ["9 years child health practice"],
      bio: "Child specialist",
      about: "Pediatrician caring for infants and children.",
      timeSlots: [{ start: "09:30 AM" }, { end: "01:30 PM" }],
      averageRating: 4.8,
      totalRating: 210,
      isApproved: "approved",
    },

    {
      email: "ent1@medicare.com",
      password: "hashedpassword",
      name: "Dr. Michael Anderson",
      phone: 9876543215,
      photo: "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
      ticketPrice: 550,
      role: "doctor",
      specialization: "ENT",
      specialFields: ["Sinus Treatment", "Hearing Disorders"],
      qualifications: ["MBBS", "MS ENT"],
      experiences: ["10 years ENT practice"],
      bio: "ENT specialist",
      about: "Treats ear, nose and throat disorders.",
      timeSlots: [{ start: "02:00 PM" }, { end: "06:00 PM" }],
      averageRating: 4.5,
      totalRating: 110,
      isApproved: "approved",
    },

    {
      email: "psy1@medicare.com",
      password: "hashedpassword",
      name: "Dr. William Scott",
      phone: 9876543216,
      photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7",
      ticketPrice: 600,
      role: "doctor",
      specialization: "Psychiatry",
      specialFields: ["Depression", "Anxiety"],
      qualifications: ["MBBS", "MD Psychiatry"],
      experiences: ["13 years mental health practice"],
      bio: "Mental health specialist",
      about: "Helps patients manage mental health disorders.",
      timeSlots: [{ start: "11:00 AM" }, { end: "05:00 PM" }],
      averageRating: 4.7,
      totalRating: 180,
      isApproved: "approved",
    },

    {
      email: "gastro1@medicare.com",
      password: "hashedpassword",
      name: "Dr. Benjamin Harris",
      phone: 9876543217,
      photo: "https://images.unsplash.com/photo-1584467735871-8e3a9fcd0a5e",
      ticketPrice: 750,
      role: "doctor",
      specialization: "Gastroenterology",
      specialFields: ["Liver Disease", "Digestive Disorders"],
      qualifications: ["MBBS", "DM Gastroenterology"],
      experiences: ["14 years digestive treatment"],
      bio: "Digestive system specialist",
      about: "Treats stomach and digestive system problems.",
      timeSlots: [{ start: "09:00 AM" }, { end: "02:00 PM" }],
      averageRating: 4.6,
      totalRating: 160,
      isApproved: "approved",
    },

    {
      email: "urology1@medicare.com",
      password: "hashedpassword",
      name: "Dr. Christopher Lewis",
      phone: 9876543218,
      photo: "https://images.unsplash.com/photo-1551190822-a9333d879b1f",
      ticketPrice: 650,
      role: "doctor",
      specialization: "Urology",
      specialFields: ["Kidney Stones", "Urinary Disorders"],
      qualifications: ["MBBS", "MS Urology"],
      experiences: ["12 years urology practice"],
      bio: "Kidney specialist",
      about: "Expert in urinary and kidney related diseases.",
      timeSlots: [{ start: "01:00 PM" }, { end: "05:00 PM" }],
      averageRating: 4.5,
      totalRating: 130,
      isApproved: "approved",
    },

    {
      email: "oncology1@medicare.com",
      password: "hashedpassword",
      name: "Dr. Alexander Clark",
      phone: 9876543219,
      photo: "https://images.unsplash.com/photo-1584515933487-779824d29309",
      ticketPrice: 950,
      role: "doctor",
      specialization: "Oncology",
      specialFields: ["Cancer Treatment", "Chemotherapy"],
      qualifications: ["MBBS", "DM Oncology"],
      experiences: ["15 years oncology treatment"],
      bio: "Cancer specialist",
      about: "Experienced oncologist treating various cancers.",
      timeSlots: [{ start: "10:00 AM" }, { end: "03:00 PM" }],
      averageRating: 4.9,
      totalRating: 300,
      isApproved: "approved",
    },
  ];

  await Doctor.insertMany(doctors);

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
