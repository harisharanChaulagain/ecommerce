import { Request, Response } from "express";
import Category from "../models/Category";
import path from "path";
import { UploadedFile } from "express-fileupload";
import Product from "../models/Product";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();

    const categoriesWithItemCount = await Promise.all(
      categories.map(async (category) => {
        const itemCount = await Product.countDocuments({
          category: category.name,
        });
        return { ...category.toObject(), itemCount };
      })
    );

    res.json(categoriesWithItemCount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    let imageUrl: string | undefined;

    if (req.files && req.files.image) {
      const image = req.files.image as UploadedFile;

      const imagePath = path.join(__dirname, "../../client/public/category");
      const imageName = `${Date.now()}_${image.name}`;
      image.mv(path.join(imagePath, imageName));

      // Set the image URL
      imageUrl = `/images/${imageName}`;
    }

    const newCategory: any = new Category({ name, image: imageUrl });
    await newCategory.save();

    console.log("New category added:", newCategory);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//delete category by _id
export const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    if (!categoryId) {
      return res.status(400).json({ error: "Category id is requires" });
    }
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }
    await Category.deleteOne({ _id: categoryId });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ erroe: "Internal server error" });
  }
};

//Update category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const updates = req.body;

    if (!categoryId) {
      return res.status(400).json({
        error: "Category id is required",
      });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }
    for (const key in updates) {
      if (Object.prototype.hasOwnProperty.call(updates, key)) {
        (category as any)[key] = updates[key];
      }
    }
    await category.save();
    res.status(200).json({
      message: "Category updated successfully!!",
      updatedcategory: category,
    });
  } catch (error) {
    console.error("Error updating products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
