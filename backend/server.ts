import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes";
require("dotenv").config();
import fileUpload from "express-fileupload";

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI: any = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// MongoDB Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    // Define a simple route for the root URL
    app.get("/", (req, res) => {
      res.send("Welcome to the eCommerce backend!");
    });

    // Use category routes
    app.use(categoryRoutes);

    // Start Server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
