import express from "express";
import * as userController from "../controllers/UserController";

const router = express.Router();

router.post("/api/v1/users", userController.createUser);
router.post("/api/v1/users/login", userController.loginUser);
router.get("/api/v1/user/counts", userController.getTotalUserCounts);
router.get("/api/v1/user-details", userController.getUserDetails);

export default router;
