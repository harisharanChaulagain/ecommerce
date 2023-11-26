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

//product search
export const searchProducts = async (req: Request, res: Response) => {
  try {
    const { productName } = req.query;

    if (!productName) {
      return res
        .status(400)
        .json({ error: "Product name is required for search." });
    }

    // Perform a case-insensitive search for products
    const products = await Product.find({
      name: { $regex: new RegExp(productName as string, "i") },
    });

    res.json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
