import UserSchema from "../Models/UserSchema.js";
import BookingSchema from "../Models/BookingSchema.js";
import DoctorSchema from "../Models/DoctorSchema.js";

export const findAllUsers = async (req, res) => {
  try {
    const users = await UserSchema.find().select("-password");
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const findUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserSchema.findById(id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {}
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserSchema.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    if (req.body.name) user.name = req.body.name;
    if (req.body.role) user.role = req.body.role;
    if (req.body.gender) user.gender = req.body.gender;
    if (req.body.photo) user.photo = req.body.photo;

    const updatedUser = await user.save();
    res.status(202).json({ success: true, updatedUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error " });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserSchema.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User Not Found" });
    }
    res.status(410).json({ success: true, message: "User Deleted Successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error " });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await UserSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...rest } = user._doc;
    return res.status(200).json({
      success: true,
      message: "Getting Profile info",
      data: { ...rest },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server ERROR!" });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    // Retrieve appointments from booking for a specific user
    const boookings = await BookingSchema.find({ user: req.userId });

    //extract doctor ids from appointment bookings

    const doctorIds = boookings.map((el) => el.doctorId);

    // retieve doctors using doctor ids

    const doctors = await DoctorSchema.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );

    return res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    return res.status(500).json({ message: "Server ERROR!" });
  }
};
