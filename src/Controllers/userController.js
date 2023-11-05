import UserSchema from "../Models/UserSchema.js";

export const findAllUsers = async (req, res) => {
  try {
    const users = await UserSchema.find();
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const findUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserSchema.findById(id);
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
