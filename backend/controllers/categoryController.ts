import { Request, Response } from "express";
import category from "../models/Category";
import path from "path";
import { UploadedFile } from "express-fileupload";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await category.find();
    res.json(categories);
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

    const newCategory: any = new category({ name, image: imageUrl });
    await newCategory.save();

    console.log("New category added:", newCategory);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
