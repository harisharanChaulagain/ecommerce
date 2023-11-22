import { Request, Response } from "express";
import Product from "../models/Product";
import path from "path";
import { UploadedFile } from "express-fileupload";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const Products = await Product.find();
    res.json(Products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, category, units, price, description } = req.body;
    let imageUrl: string | undefined;

    if (req.files && req.files.image) {
      const image = req.files.image as UploadedFile;

      const imagePath = path.join(__dirname, "../../client/public/product");
      const imageName = `${Date.now()}_${image.name}`;
      image.mv(path.join(imagePath, imageName));

      // Set the image URL
      imageUrl = `/images/${imageName}`;
    }

    const newProduct: any = new Product({
      name,
      category,
      units,
      price,
      description,
      image: imageUrl,
    });
    await newProduct.save();

    console.log("New Product added:", newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
