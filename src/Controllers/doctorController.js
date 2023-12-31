import DoctorSchema from "../Models/DoctorSchema.js";
import BookingSchema from "../Models/BookingSchema.js";

export const findAllDoctors = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;
    if (query) {
      doctors = await DoctorSchema.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      });
    }
    doctors = await DoctorSchema.find({ isApproved: "approved" }).select(
      "-password"
    );
    return res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const findDoctorById = async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await DoctorSchema.findById(id)
      .populate("reviews")
      .select("-password");
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor Not Found" });
    }
    return res.status(200).json({ success: true, doctor });
  } catch (error) {}
};

export const updateDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await DoctorSchema.findById(id);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor Not Found" });
    }
    if (req.body.name) doctor.name = req.body.name;
    if (req.body.role) doctor.role = req.body.role;
    if (req.body.gender) doctor.gender = req.body.gender;
    if (req.body.photo) doctor.photo = req.body.photo;

    const updatedDoctor = await doctor.save();
    res.status(202).json({ success: true, updatedDoctor });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error " });
  }
};

export const deleteDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await DoctorSchema.findByIdAndDelete(id);
    if (!doctor) {
      return res
        .status(401)
        .json({ success: false, message: "doctor Not Found" });
    }
    res
      .status(410)
      .json({ success: true, message: "Doctor Deleted Successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error " });
  }
};

export const getDoctorProfile = async (req, res) => {
  const doctorId = req.doctorId;
  try {
    const doctor = await DoctorSchema.findById(doctorId);
    if (!doctor) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor Not Found" });
    }
    const { password, ...rest } = doctor._doc;
    const appointments = await BookingSchema.find({ doctor: doctorId });
    return res.status(200).json({
      success: true,
      message: "Doctor Profile Available",
      data: { ...rest, appointments },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server ERROR!" });
  }
};
