import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: string;
  units: number;
  price: number;
  description: string;
  image: Buffer;
  ratings: number[];
  averageRating: number;
}

const productSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  units: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: Buffer, required: true },
  ratings: { type: [Number], default: [] },
  averageRating: { type: Number, default: 0 },
});

export default mongoose.model<IProduct>("Product", productSchema);
