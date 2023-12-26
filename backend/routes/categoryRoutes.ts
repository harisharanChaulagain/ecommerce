import express from "express";
import * as categoryController from "../controllers/categoryController";

const router = express.Router();

router.get("/categories", categoryController.getAllCategories);
router.post("/categories", categoryController.createCategory);
router.delete("/categories/:id", categoryController.deleteCategoryById);
router.put("/categories/:id", categoryController.updateCategory);

export default router;
