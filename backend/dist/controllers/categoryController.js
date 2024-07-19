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
exports.updateCategory = exports.deleteCategoryById = exports.createCategory = exports.getAllCategories = void 0;
const Category_1 = __importDefault(require("../models/Category"));
const Product_1 = __importDefault(require("../models/Product"));
const imageUtils_1 = require("../utils/imageUtils");
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.default.find();
        const categoriesWithItemCount = yield Promise.all(categories.map((category) => __awaiter(void 0, void 0, void 0, function* () {
            const imageBase64 = category.image.toString("base64");
            const itemCount = yield Product_1.default.countDocuments({
                category: category.name,
            });
            return Object.assign(Object.assign({}, category.toObject()), { image: { type: "Buffer", data: [...category.image] }, itemCount });
        })));
        res.json(categoriesWithItemCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getAllCategories = getAllCategories;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
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
        const newCategory = new Category_1.default({ name, image });
        yield newCategory.save();
        console.log("New category added:", newCategory);
        res.status(201).json(newCategory);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createCategory = createCategory;
//delete category by _id
const deleteCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.id;
        if (!categoryId) {
            return res.status(400).json({ error: "Category id is requires" });
        }
        const category = yield Category_1.default.findById(categoryId);
        if (!category) {
            return res.status(404).json({ error: "Category not found." });
        }
        yield Category_1.default.deleteOne({ _id: categoryId });
        res.status(200).json({ message: "Category deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteCategoryById = deleteCategoryById;
//Update category
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.id;
        if (!categoryId) {
            return res.status(400).json({ error: "Category id is required" });
        }
        const existingCategory = yield Category_1.default.findById(categoryId);
        if (!existingCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        const categoryUpdate = {};
        if (req.body.name) {
            categoryUpdate.name = req.body.name;
        }
        if (req.files && req.files.image) {
            const imageFile = req.files.image;
            if (!(0, imageUtils_1.isValidImageType)(imageFile.mimetype)) {
                return res.status(400).json({
                    error: "Invalid file type. Please upload a JPEG or PNG image.",
                });
            }
            categoryUpdate.image = imageFile.data;
        }
        const updatedCategory = yield Category_1.default.findByIdAndUpdate(categoryId, { $set: categoryUpdate }, { new: true });
        if (!updatedCategory) {
            return res.status(500).json({ error: "Failed to update category" });
        }
        res.status(200).json({
            message: "Category updated successfully!!",
            updatedCategory,
        });
    }
    catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateCategory = updateCategory;
