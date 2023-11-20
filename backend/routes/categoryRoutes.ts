import express from "express";
import * as categoryController from "../controllers/categoryController";

const router = express.Router();

router.get("/categories", categoryController.getAllCategories);

export default router;
