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

//checkout
export const updateProductQuantities = async (req: Request, res: Response) => {
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
      const product = await Product.findById(_id);
      if (!product) {
        return res
          .status(404)
          .json({ error: `Product not found with ID: ${_id}` });
      }

      // Update the quantity in the database
      product.units -= quantity;
      await product.save();
    }

    res
      .status(200)
      .json({ message: "Product quantities updated successfully." });
  } catch (error) {
    console.error("Error updating product quantities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
