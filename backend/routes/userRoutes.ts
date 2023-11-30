import express from "express";
import userController from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/users", authenticateToken, userController.createUser);
router.post("/users/login", userController.loginUser);

export default router;
