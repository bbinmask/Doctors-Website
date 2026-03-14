import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: Number },
    photo: { type: String },
    ticketPrice: { type: Number },
    role: {
      type: String,
    },

    // Fields for doctors only
    specialization: { type: String },
    specialFields: [String],
    qualifications: [String],

    experiences: [String],

    bio: { type: String, maxLength: 50 },
    about: { type: String },
    timeSlots: [{ time: { type: String } }, { exp: { type: String } }],
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
    averageRating: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    isApproved: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    appointments: [
      { date: { type: String } },
      {
        appointments: {
          type: mongoose.Types.ObjectId,
          ref: "Appointment",
        },
      },
    ],
    appointmentsToday: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
    completedAppointments: [
      {
        date: { type: String },
      },
      {
        appointments: {
          type: mongoose.Types.ObjectId,
          ref: "Appointment",
        },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Doctor", DoctorSchema);
