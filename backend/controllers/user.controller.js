import User from "../models/UserSchema.js";
import Appointment from "../models/AppointmentSchema.model.js";
import Doctor from "../models/DoctorSchema.js";
import bcrypt from "bcryptjs";
export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true },
    );
    return res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Failed to update" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteUser = await User.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Successfully deleted" });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Failed to delete" });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");
    return res
      .status(200)
      .json({ success: true, message: "User found", data: user });
  } catch (error) {
    return res.status(404).json({ success: false, message: "No user found" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    return res
      .status(200)
      .json({ success: true, message: "User found", data: users });
  } catch (error) {
    return res.status(404).json({ success: false, message: "No user found" });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { password, ...rest } = user._doc;

    return res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: { ...rest },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong, cannot get the user info!",
    });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const appoinments = await Appointment.find({ user: req.userId }).populate(
      "doctor",
      "user",
    );

    return res.status(200).json({
      success: true,
      message: "Appointments found!",
      data: appoinments,
    });
  } catch (error) {
    console.log({ error: error.message });
    return res.status(500).json({
      success: false,
      message: "Something went wrong, cannot get the appointments!",
    });
  }
};

export const changePassword = async (req, res) => {
  const userId = req.params.id;
  const { newPassword } = req.body;

  try {
    // if (!oldPassword) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "Old Password is not correct" });
    // }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: { password: hashPassword },
      },
      { new: true },
    );
    // const isPasswordCorrect = user.isPasswordCorrect(oldPassword);

    const updatedUser = await user.updateOne(
      { $set: { password: hashPassword } },
      { new: true },
    );

    if (updatedUser) {
      return res
        .status(200)
        .json({ success: true, message: "Password changed successfully." });
    }

    return res
      .status(404)
      .json({ success: false, message: "Old Password is not correct" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!" });
  }
};

export const checkPassword = async (req, res) => {
  const userId = req.params.id;
  const { oldPassword } = req.body;

  try {
    if (!oldPassword) {
      return res
        .status(404)
        .json({ success: false, message: "Old Password is not correct" });
    }

    const user = await User.findById(userId);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (isPasswordCorrect) {
      return res
        .status(200)
        .json({ success: true, message: "Password matched." });
    }

    return res
      .status(404)
      .json({ success: false, message: "Old Password is not correct" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!" });
  }
};
