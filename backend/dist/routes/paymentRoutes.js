"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// paymentRoutes.ts
const express_1 = __importDefault(require("express"));
const paymentController_1 = __importDefault(require("../controllers/paymentController"));
const router = express_1.default.Router();
// Define the payment verification route
router.post("/api/v1/verify-payment", paymentController_1.default.verifyPayment);
exports.default = router;
