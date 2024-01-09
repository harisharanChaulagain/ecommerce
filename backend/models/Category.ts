import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  image: Buffer;
}

const categorySchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: Buffer, required: false },
});

export default mongoose.model<ICategory>("Category", categorySchema);
