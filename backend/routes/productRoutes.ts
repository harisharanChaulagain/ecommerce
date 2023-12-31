import express from "express";
import * as productController from "../controllers/productController";

const router = express.Router();

router.get("/api/v1/products", productController.getAllProducts);
router.post("/api/v1/products", productController.createProduct);
router.get("/api/v1/products/search", productController.searchProducts);
router.post(
  "/api/v1/products/checkout",
  productController.updateProductQuantities
);
router.delete("/api/v1/products/:id", productController.deleteProductById);
router.put("/api/v1/products/:id", productController.updateProduct);

export default router;
