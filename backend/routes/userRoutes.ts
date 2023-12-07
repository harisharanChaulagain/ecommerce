import express from "express";
import UserController from "../controllers/UserController";

const router = express.Router();

router.post("/users", UserController.createUser);
router.post("/users/login", UserController.loginUser);
router.get("/user/details", UserController.getUserDetails);

export default router;
