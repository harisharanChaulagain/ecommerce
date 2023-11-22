import express from "express";
import * as productController from "../controllers/productController";

const router = express.Router();

router.get("/products", productController.getAllProducts);
router.post("/products", productController.createProduct);

export default router;