import express from "express";
import adminController from "../controllers/adminController";

const router = express.Router();

router.post("/api/v1/admins/login", adminController.loginAdmin);

export default router;
