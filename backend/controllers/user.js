import User from "../models/user.js";
// import bcrypt from "bcryptjs";
import { generateToken, validateToken } from "../services/user.js";

export const addUser = async (req, res) => {
  try {
    // const { _id } = req.user;
    console.log(req.user)

    const { username, email, role, password } = req.body;

    if ((!username && !email && !role, !password)) {
      return res.status(404).json({
        status: false,
        data: "",
        message: "Please fill all the details",
      });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    const obj = {
      admin_id: _id,
      username,
      email,
      role,
      password: password,
      status: "Pending",
    };

    const user = await User.create(obj);

    if (!user) {
      return res
        .status(505)
        .json({ status: false, data: "", message: "server message" });
    }

    return res
      .status(201)
      .json({ status: true, data: user, message: "user added" });
  } catch (message) {
    console.log("error",message)
    return res.status(505).json({ status: false, data: "", message: message });
  }
};

export const updateUserStatusToApproved = async (req, res) => {
  try {
    const { _id } = req.user;
    const status = "Approved";
    const id = req.params.id;

    const user = await User.findOneAndUpdate(
      { _id: id, admin_id: _id },
      { status: status },
      { new: true }
    );

    if (!user) {
      return res
        .status(505)
        .json({ status: false, data: "", message: "Server Error" });
    }

    return res.status(201).json({
      status: true,
      data: user,
      message: "user status updated to approved",
    });
  } catch (error) {
    return res.status(505).json({ status: false, data: "", message: error });
  }
};

export const updateUserStatusToRejected = async (req, res) => {
  try {
    const { _id } = req.user;
    const { rejection_reason } = req.body;

    const status = "Rejected";
    const id = req.params.id;

    if (!rejection_reason) {
      return res.status(404).json({
        status: false,
        data: "",
        message: "Please provide rejection reason",
      });
    }

    const user = await User.findOneAndUpdate(
      { _id: id, admin_id: _id },
      { status: status, rejection_reason: rejection_reason },
      { new: true }
    );

    if (!user) {
      return res
        .status(505)
        .json({ status: false, data: "", message: "Server Error" });
    }

    return res.status(201).json({
      status: true,
      data: user,
      message: "user status updated to rejected",
    });
  } catch (error) {
    return res.status(505).json({ status: false, data: "", message: error });
  }
};

export const getPendingUser = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.find({ admin_id: _id, status: "Pending" });

    if (!user) {
      return res
        .status(505)
        .json({ status: false, data: "", message: "Server Error" });
    }

    return res
      .status(200)
      .json({ status: true, data: user, message: "success" });
  } catch (error) {
    return res.status(505).json({ status: false, data: "", message: error });
  }
};

export const getApprovedUser = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.find({ admin_id: _id, status: "Approved" });

    if (!user) {
      return res
        .status(505)
        .json({ status: false, data: "", message: "Server Error" });
    }

    return res
      .status(200)
      .json({ status: true, data: user, message: "success" });
  } catch (error) {
    return res.status(505).json({ status: false, data: "", message: error });
  }
};

export const getRejectedUser = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.find({ admin_id: _id, status: "Rejected" });
    if (!user) {
      return res
        .status(505)
        .json({ status: false, data: "", message: "Server Error" });
    }
    return res
      .status(200)
      .json({ status: true, data: user, message: "success" });
  } catch (error) {
    return res.status(505).json({ status: false, data: "", message: error });
  }
};

export const getTotalUserCount = async (req, res) => {
  try {
    const { _id } = req.user;
    const count = await User.countDocuments({ admin_id: _id });

    return res
      .status(200)
      .json({ status: true, data: count, message: "success" });
  } catch (error) {
    return res.status(505).json({ status: false, data: "", message: error });
  }
};

export const getPendingUserCount = async (req, res) => {
  try {
    const { _id } = req.user;
    const count = await User.countDocuments({
      admin_id: _id,
      status: "Pending",
    });
    return res
      .status(200)
      .json({ status: true, data: count, message: "success" });
  } catch (error) {
    return res.status(505).json({ status: false, data: "", message: error });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({ status: false, data: "", message: "User not found" });
    }

    console.log("User found:", user, password); // Debugging line

    const isPasswordCorrect = password === user.password;

    console.log("Is password correct:", isPasswordCorrect); // Debugging line

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ status: false, data: "", message: "Invalid password" });
    }
    const token = generateToken(user);

    console.log("Generated Token:", token); // Debugging line

    res.cookie("user_token", token, {
      
      httpOnly: true,
      secure: true,

    });
    return res.status(200).json({
      status: true,
      data: user,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(505).json({ status: false, data: "", message: error });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await User.findOne({ email: email });
    if (!admin) {
      return res
        .status(401)
        .json({ status: false, data: "", message: "Admin not found" });
    }
    // const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    const isPasswordCorrect = password === admin.password;

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ status: false, data: "", message: "Invalid password" });
    }
    const token = generateToken(admin);
    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: true,
    });
    return res.status(200).json({
      status: true,
      data: admin,
      message: "Admin logged in successfully",
    });
  } catch (error) {
    return res.status(505).json({ status: false, data: "", message: error });
  }
};

export const userLogout = async (req, res) => {
  try {
    res.clearCookie("user_token");
    return res.status(200).json({
      status: true,
      data: "",
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(505).json({ status: false, data: "", message: error });
  }
};

export const adminLogout = async (req, res) => {
  try {
    res.clearCookie("admin_token");
    return res.status(200).json({
      status: true,
      data: "",
      message: "Admin logged out successfully",
    });
  } catch (error) {
    return res.status(505).json({ status: false, data: "", message: error });
  }
};
