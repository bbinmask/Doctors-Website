import Appoinment from "../models/AppointmentSchema.model.js";
import Doctor from "../models/DoctorSchema.js";
export const getAppoinment = async (req, res) => {};

export const makeAnAppoinment = async (req, res) => {
  const { name, bloodType, desease, oldPatient, phone, doctorId, date } =
    req.body;

  try {
    if (!name || !bloodType || !desease || !phone || !doctorId || !date) {
      return res
        .status(404)
        .json({ success: false, message: "All fields required!" });
    }
    const patientDetails = {
      name,
      bloodType,
      desease,
      oldPatient,
      phone,
    };
    const appointment = await Appoinment.bookAppointment(
      req.userId,
      doctorId,
      date,
      patientDetails,
    );

    if (!appointment.success) {
      return res
        .status(404)
        .json({ success: false, message: "Could not booked appointment" });
    }

    await Doctor.findByIdAndUpdate(
      doctorId,
      {
        $push: { appoinemnts: appointment.appointment._id },
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Appointment Booked",
      data: appointment.appointment,
    });
  } catch (error) {
    console.log({ error: error.message });
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!" });
  }
};

export const deleteAppointment = async (req, res) => {
  const id = req.params.id;

  try {
    await Appoinment.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "Appointment Cancelled!" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!" });
  }

  res.send("Good");
};

export const updateAppointment = async (req, res) => {};

export const checkAppointmentStatus = async (req, res) => {};
