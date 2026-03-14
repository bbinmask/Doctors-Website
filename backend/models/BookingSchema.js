import mongoose from "mongoose";
import Doctor from "./DoctorSchema";

const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: { type: String, required: true },
    appointmentDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

bookingSchema.statics.bookAppointment = async function (
  doctorId,
  date,
  patientDetails,
) {
  const Appointment = this;

  // Check if the doctor is available on date
  const today = new Date();
  if (new Date(date).toDateString() === today.toDateString()) {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor || doctor.isApproved !== "approved") {
      return {
        success: false,
        message: "Doctor is not available on the date.",
      };
    }
  }

  // Count existing appointments for the doctor on the date

  const appointmentCount = await Appointment.countDocuments({
    doctor: doctorId,
    appointmentDate: date,
  });

  if (appointmentCount >= 10) {
    // Mark the appointment as delayed
    const delayedAppointment = await Appointment.create({
      ...patientDetails,
      doctor: doctorId,
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

export default mongoose.model("Booking", bookingSchema);
