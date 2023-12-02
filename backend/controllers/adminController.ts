import { Request, Response } from "express";
import Admin from "../models/Admin";
import jwt from "jsonwebtoken";
require("dotenv").config();

const SECRET_KEY: any = process.env.SECRET_KEY;

const AdminController = {
  loginAdmin: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const admin = await Admin.findOne({ username });

      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      if (password !== admin.password) {
        return res.status(401).json({ error: "Invalid password" });
      }

      // Generate JWT token for admin
      const adminToken = jwt.sign({ adminId: admin._id }, SECRET_KEY, {
        expiresIn: "1h",
      });

      // Set the token in a cookie
      res.cookie("adminToken", adminToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });

      res.status(200).json({ message: "Admin login successful", adminToken });
    } catch (error) {
      console.error("Error logging in as admin:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default AdminController;
