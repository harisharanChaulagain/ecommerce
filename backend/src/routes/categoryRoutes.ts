import express from "express";
import * as categoryController from "../controllers/categoryController";

const router = express.Router();

router.get("/api/v1/categories", categoryController.getAllCategories);
router.post("/api/v1/categories", categoryController.createCategory);
router.delete("/api/v1/categories/:id", categoryController.deleteCategoryById);
router.put("/api/v1/categories/:id", categoryController.updateCategory);

export default router;
