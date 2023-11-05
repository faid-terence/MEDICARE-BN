import ReviewSchema from "../Models/ReviewSchema.js";
import Doctor from "../Models/DoctorSchema.js";

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewSchema.find();

    return res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Reviews not found" });
  }
};

export const createReview = async (req, res) => {
  if (!req.body.doctor) req.body.doctor = req.params.doctorId;
  if (!req.body.user) req.body.user = req.params.userId;

  const newReview = new ReviewSchema(req.body);

  try {
    const savedReview = await newReview.save();
    await Doctor.findByIdAndUpdate(req.body.doctor, {
      $push: { reviews: savedReview._id },
    });
    return res
      .status(200)
      .json({ success: true, message: "Review SUbmitted", savedReview });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
