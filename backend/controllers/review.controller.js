import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";

// get all reviews

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res
      .status(200)
      .json({ success: true, message: "Successfull", data: reviews });
  } catch (error) {
    return res.status(404).json({ success: false, message: "Not found" });
  }
};

export const createReview = async (req, res) => {
  if (!req.body.doctor) req.body.doctor = req.params.doctorId;
  if (!req.body.user) req.body.user = req.params.userId;

  const { doctor: doctorId } = req.body;

  const newReview = new Review(req.body);

  try {
    const savedReview = await newReview.save();
    const newDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      {
        $push: { reviews: savedReview },
      },
      { new: true }
    ).populate("reviews");

    return res.status(200).json({
      success: true,
      message: "Review submitted",
      data: newDoctor,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
