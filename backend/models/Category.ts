import mongoose, { Schema, Document } from "mongoose";

interface ICategory extends Document {
  name: string;
}

const categorySchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
});

export default mongoose.model<ICategory>("Category", categorySchema);
