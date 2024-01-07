import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
require("dotenv").config();
import jwt from "jsonwebtoken";

const SECRET_KEY: any = process.env.SECRET_KEY;

export const createUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, dob, password } = req.body;

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      dob,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    const userId = user._id;
    res.cookie("userId", userId, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", token, userId });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//user count
export const getTotalUserCounts = async (req: Request, res: Response) => {
  try {
    const userCount = await User.countDocuments();
    res.status(200).json({ userCount });
  } catch (error) {
    console.error("Error getting user count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// user details
export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const Users = await User.find();
    res.json(Users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
