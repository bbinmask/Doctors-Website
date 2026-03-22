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
    appointmentTime: {
      type: String,
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
  const doctor = await Doctor.findById(doctorId).lean();
  if (!doctor)
    return {
      success: false,
      message: "Doctor is not found!",
    };

  const appointmentCount = await Appointment.countDocuments({
    doctor: doctorId,
    appointmentDate: date,
  });

  const getAppointmentTime = (startTime, count) => {
    let [time, modifier] = startTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    const totalMinutes = hours * 60 + minutes + count * 15;

    let newHours = Math.floor(totalMinutes / 60);
    let newMinutes = totalMinutes % 60;

    let newModifier = "AM";
    if (newHours >= 12) {
      newModifier = "PM";
    }

    if (newHours > 12) {
      newHours -= 12;
    }
    if (newHours === 0) {
      newHours = 12;
    }

    newMinutes = newMinutes < 10 ? "0" + newMinutes : newMinutes;
    newHours = newHours < 10 ? "0" + newHours : newHours;

    return `${newHours}:${newMinutes} ${newModifier}`;
  };

  const appointmentTime = getAppointmentTime(
    doctor.timeSlots[0].start,
    appointmentCount,
  );

  if (appointmentCount >= 10) {
    // Mark the appointment as delayed
    const delayedAppointment = await Appointment.create({
      ...patientDetails,
      user: userId,
      doctor: doctorId,
      ticketPrice: doctor.ticketPrice,
      appointmentDate: new Date(date),
      appointmentTime: "NA",
      status: "delayed",
    });

    return {
      success: true,
      message:
        "Doctor is fully booked for the day. Appointment marked as delayed.",
      appointment: delayedAppointment,
    };
  }

  const newAppointment = await Appointment.create({
    ...patientDetails,
    doctor: doctorId,
    user: userId,
    ticketPrice: doctor.ticketPrice,
    appointmentDate: new Date(date),
    appointmentTime,
    status: "confirmed",
  });

  return {
    message: "Appointment confirmed.",
    appointment: newAppointment,
    success: true,
  };
};

export default mongoose.model("Appointment", AppointmentSchema);
