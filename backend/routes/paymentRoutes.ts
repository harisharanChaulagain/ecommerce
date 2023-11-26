// paymentRoutes.ts
import express from "express";
import paymentController from "../controllers/paymentController";

const router = express.Router();

// Define the payment verification route
router.post("/verify-payment", paymentController.verifyPayment);

export default router;
