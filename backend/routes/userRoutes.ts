import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

router.post("/users", userController.createUser);
router.post("/users/login", userController.loginUser);

export default router;
