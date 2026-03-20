import mongoose from "mongoose";

import bcrypt from "bcryptjs";

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

    specialization: { type: String },
    specialFields: [String],
    qualifications: [String],

    experiences: [String],

    bio: { type: String, maxLength: 50 },
    about: { type: String },
    timeSlots: [
      {
        start: { type: String, required: true },
        end: { type: String, required: true },
        days: [String],
      },
    ],
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
  },
  { timestamps: true },
);

DoctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

DoctorSchema.methods.isPasswordCorrect = async function (password) {
  const matched = await bcrypt.compare(password, this.password);

  return matched;
};

export default mongoose.model("Doctor", DoctorSchema);
