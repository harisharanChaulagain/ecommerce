"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvoiceDetails = exports.rateProduct = exports.updateProduct = exports.deleteProductById = exports.updateProductQuantities = exports.searchProducts = exports.createProduct = exports.getAllProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const imageUtils_1 = require("../utils/imageUtils");
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Products = yield Product_1.default.find();
        res.json(Products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getAllProducts = getAllProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, category, units, price, description } = req.body;
        let image;
        if (req.files && req.files.image) {
            const imageFile = req.files.image;
            if (!(0, imageUtils_1.isValidImageType)(imageFile.mimetype)) {
                return res.status(400).json({
                    error: "Invalid file type. Please upload a JPEG or PNG image.",
                });
            }
            image = imageFile.data;
        }
        const newProduct = new Product_1.default({
            name,
            category,
            units,
            price,
            description,
            image,
            ratings: [],
        });
        yield newProduct.save();
        console.log("New Product added:", newProduct);
        res.status(201).json(newProduct);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createProduct = createProduct;
//product search
const searchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productName } = req.query;
        if (!productName) {
            return res
                .status(400)
                .json({ error: "Product name is required for search." });
        }
        // Perform a case-insensitive search for products
        const products = yield Product_1.default.find({
            name: { $regex: new RegExp(productName, "i") },
        });
        res.json(products);
    }
    catch (error) {
        console.error("Error searching products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.searchProducts = searchProducts;
//checkout
const updateProductQuantities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { products } = req.body;
        // Validate the request
        if (!Array.isArray(products)) {
            return res.status(400).json({
                error: "Invalid request format. Expected an array of products.",
            });
        }
        // Update product quantities in the database
        for (const { _id, quantity } of products) {
            const product = yield Product_1.default.findById(_id);
            if (!product) {
                return res
                    .status(404)
                    .json({ error: `Product not found with ID: ${_id}` });
            }
            // Update the quantity in the database
            product.units -= quantity;
            yield product.save();
        }
        res
            .status(200)
            .json({ message: "Product quantities updated successfully." });
    }
    catch (error) {
        console.error("Error updating product quantities:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateProductQuantities = updateProductQuantities;
//delete products by _id
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({ error: "Product id is required:" });
        }
        const product = yield Product_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found." });
        }
        yield Product_1.default.deleteOne({ _id: productId });
        res.status(200).json({ message: "Product deleted successfully." });
    }
    catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteProductById = deleteProductById;
//Update product details
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({
                error: "Product id is required:",
            });
        }
        const product = yield Product_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found." });
        }
        const productUpdate = {};
        for (const key in req.body) {
            if (Object.prototype.hasOwnProperty.call(req.body, key)) {
                productUpdate[key] = req.body[key];
            }
        }
        if (req.files && req.files.image) {
            const imageFile = req.files.image;
            if (!(0, imageUtils_1.isValidImageType)(imageFile.mimetype)) {
                return res.status(400).json({
                    error: "Invalid file type. Please upload a JPEG or PNG image.",
                });
            }
            productUpdate.image = imageFile.data;
        }
        const updatedCompany = yield Product_1.default.findByIdAndUpdate(productId, { $set: productUpdate }, { new: true });
        res.status(200).json({
            message: "Product updated successfully!!",
            updatedProduct: product,
        });
    }
    catch (error) {
        console.error("Error updating products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateProduct = updateProduct;
//rating products
const rateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const { rating } = req.body;
        if (!productId || !rating) {
            return res
                .status(400)
                .json({ error: "Product id and ratings are required" });
        }
        const product = (yield Product_1.default.findById(productId));
        if (!product) {
            return res.status(400).json({ error: "Product not found" });
        }
        product.ratings.push(rating);
        const totalRating = product.ratings.reduce((sum, r) => sum + r, 0);
        const averageRating = product.ratings.length > 0 ? totalRating / product.ratings.length : 0;
        product.averageRating = averageRating;
        yield product.save();
        res.status(200).json({ averageRating });
    }
    catch (error) {
        console.error("Error rating product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.rateProduct = rateProduct;
//invoice details
const getInvoiceDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { products } = req.query;
        let productIds = products;
        if (!productIds || !Array.isArray(productIds)) {
            if (typeof productIds === "string") {
                productIds = productIds.split(",");
            }
            else {
                return res.status(400).json({
                    error: "Invalid request. Please provide an array of product ids.",
                });
            }
        }
        const invoiceDetails = yield Product_1.default.find({
            _id: { $in: productIds },
        }).select("name units price");
        res.json(invoiceDetails);
    }
    catch (error) {
        console.error("Error fetching invoice details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getInvoiceDetails = getInvoiceDetails;
