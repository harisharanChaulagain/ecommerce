import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import categoryRoutes from "./src/routes/categoryRoutes";
import productRoutes from "./src/routes/productRoutes";
require("dotenv").config();
import fileUpload from "express-fileupload";
import paymentRoutes from "./src/routes/paymentRoutes";
import userRoutes from "./src/routes/userRoutes";
import adminRoutes from "./src/routes/adminRoutes";
import companyDetailsRoute from "./src/routes/companyDetailsRoute";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI: any = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());

// MongoDB Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    // Define a simple route for the root URL
    app.get("/", (req, res) => {
      res.send("Welcome to the eCommerce backend!");
    });

    // routes
    app.use(categoryRoutes);
    app.use(productRoutes);
    app.use(paymentRoutes);
    app.use(userRoutes);
    app.use(adminRoutes);
    app.use(companyDetailsRoute);

    // Start Server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
