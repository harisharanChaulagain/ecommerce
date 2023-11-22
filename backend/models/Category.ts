import mongoose, { Schema, Document } from "mongoose";

interface ICategory extends Document {
  name: string;
  image: string;
}

const categorySchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
});

export default mongoose.model<ICategory>("Category", categorySchema);
