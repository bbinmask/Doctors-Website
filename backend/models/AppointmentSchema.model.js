import mongoose from "mongoose";
import Doctor from "./DoctorSchema.js";

const AppointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: { type: String, required: true },
    bloodType: { type: String, required: true },
    desease: { type: String, required: true },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    appointmentDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "delayed", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

AppointmentSchema.statics.bookAppointment = async function (
  userId,
  doctorId,
  date,
  patientDetails,
) {
  const Appointment = this;

  // Check if the doctor is available today
  const today = new Date();
  const doctor = await Doctor.findById(doctorId);
  if (!doctor)
    return {
      success: false,
      message: "Doctor is not found!",
    };
  if (new Date(date).toDateString() === today.toDateString()) {
    if (!doctor || doctor.isApproved !== "approved") {
      return {
        success: false,
        message: "Doctor is not available today.",
      };
    }
  }

  // Count existing appointments for the doctor on the specified date

  const appointmentCount = await Appointment.countDocuments({
    doctor: doctorId,
    appointmentDate: date,
  });

  if (appointmentCount >= 10) {
    // Mark the appointment as delayed
    const delayedAppointment = await Appointment.create({
      ...patientDetails,
      user: userId,
      doctor: doctorId,
      ticketPrice: doctor.ticketPrice,
      appointmentDate: new Date(date),
      status: "delayed",
    });

    return {
      success: true,
      message:
        "Doctor is fully booked for the day. Appointment marked as delayed.",
      appointment: delayedAppointment,
    };
  }

  // Book the appointment
  const newAppointment = await Appointment.create({
    ...patientDetails,
    doctor: doctorId,
    appointmentDate: new Date(date),
    status: "confirmed",
  });

  return {
    message: "Appointment confirmed.",
    appointment: newAppointment,
    success: true,
  };
};

export default mongoose.model("Appointment", AppointmentSchema);
