import express from "express";
import UserController from "../controllers/UserController";

const router = express.Router();

router.post("/api/v1/users", UserController.createUser);
router.post("/api/v1/users/login", UserController.loginUser);
router.get("/api/v1/user/details", UserController.getUserDetails);

export default router;
