import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res, next) => {
    try {
        const users  = await User.find();
        res.status(200).json({success: true, data: users});
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      // 1️⃣ Find the user
      const user = await User.findById(req.params.id);
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      // 2️⃣ Update fields
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;

      // 3️⃣ Hash the password if provided
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }
      await user.save();
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
};

export const createUser = async (req, res, next) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(409)
          .json({ success: false, message: "Email already in use" });
      }
      // hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      next(error);
    }
};



