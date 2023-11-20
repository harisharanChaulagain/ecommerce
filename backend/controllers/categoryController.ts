import { Request, Response } from "express";
import category from "../models/category";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await category.find();
    console.log("Categories from MongoDB:", categories);
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
