import { Request, Response } from "express";
import Product, { IProduct } from "../models/Product";
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
      ratings: [],
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

//delete products by _id
export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({ error: "Product id is required:" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    await Product.deleteOne({ _id: productId });
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Update product details
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const updates = req.body;

    if (!productId) {
      return res.status(400).json({
        error: "Product id is required:",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    for (const key in updates) {
      if (Object.prototype.hasOwnProperty.call(updates, key)) {
        (product as any)[key] = updates[key];
      }
    }
    await product.save();
    res.status(200).json({
      message: "Product updated successfully!!",
      updatedProduct: product,
    });
  } catch (error) {
    console.error("Error updating products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//rating products
export const rateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const { rating } = req.body;

    if (!productId || !rating) {
      return res
        .status(400)
        .json({ error: "Product id and ratings are required" });
    }

    const product = (await Product.findById(productId)) as IProduct | null;
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }

    product.ratings.push(rating);
    const totalRating = product.ratings.reduce((sum, r) => sum + r, 0);
    const averageRating =
      product.ratings.length > 0 ? totalRating / product.ratings.length : 0;

    product.averageRating = averageRating;
    await product.save();

    res.status(200).json({ averageRating });
  } catch (error) {
    console.error("Error rating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
