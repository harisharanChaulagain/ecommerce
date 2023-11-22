import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  category: string;
  units: number;
  price: number;
  description: string;
  image: string;
}

const productSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  units: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.model<IProduct>("Product", productSchema);
