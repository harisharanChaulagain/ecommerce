import express from "express";
import * as productController from "../controllers/productController";

const router = express.Router();

router.get("/products", productController.getAllProducts);
router.post("/products", productController.createProduct);
router.get("/products/search", productController.searchProducts);
router.post("/products/checkout", productController.updateProductQuantities);
router.delete("/products/:id", productController.deleteProductById);
router.put("/products/:id", productController.updateProduct);
router.post("/products/:id/rate", productController.rateProduct);

export default router;
