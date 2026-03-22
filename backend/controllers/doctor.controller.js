import Appointment from "../models/AppointmentSchema.model.js";
import Doctor from "../models/DoctorSchema.js";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true },
    );
    return res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedDoctor,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Failed to update" });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteDoctor = await Doctor.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Successfully deleted" });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Failed to delete" });
  }
};

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id)
      .select("-password")
      .populate("reviews")
      .lean();
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "No Doctor found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Doctor found", data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: "No Doctor found" });
  }
};

export const getAllDoctor = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;

    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
          { bio: { $regex: query, $options: "i" } },
          { specialFields: { $regex: query, $options: "i" } },
          { role: { $regex: query, $options: "i" } },
        ],
      })
        .select("-password")
        .lean();
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password",
      );
    }
    return res
      .status(200)
      .json({ success: true, message: "Doctor found", data: doctors });
  } catch (error) {
    return res.status(404).json({ success: false, message: "No Doctor found" });
  }
};

export const getInitDoctor = async (_, res) => {
  try {
    const doctor = await Doctor.find({ isApproved: "approved" })
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(3);
    if (doctor.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Doctor found",
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Doctor found", data: doctor });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "No Doctor found",
      error: error.message,
    });
  }
};

export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    const { password, ...rest } = doctor._doc;
    const appointments = await Appointment.find({ doctor: doctorId });
    return res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: { ...rest, appointments },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong, cannot get the doctor info!",
    });
  }
};

export const getDoctorReviews = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id)
      .select("-password")
      .populate("reviews");

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "No Doctor found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Doctor found", data: doctor.reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: "No Doctor found" });
  }
};

export const getAppointments = async (req, res) => {
  const doctorId = req.userId;

  try {
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate(["user"])
      .lean();

    return res.status(200).json({
      message: "Appointments found",
      success: true,
      data: appointments,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong!", success: false });
  }
};
