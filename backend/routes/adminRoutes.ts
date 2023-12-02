import express from "express";
import adminController from "../controllers/adminController";

const router = express.Router();

router.post("/admins/login", adminController.loginAdmin);

export default router;
