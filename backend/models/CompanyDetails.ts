import mongoose, { Schema, Document } from "mongoose";

export interface ICompanyDetails extends Document {
  name: string;
  email: string;
  address: string;
  phone: string;
  pan: string;
  logo: Buffer;
}

const companyDtailsSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  pan: { type: String, required: true },
  logo: { type: Buffer },
});

export default mongoose.model<ICompanyDetails>(
  "CompantDetails",
  companyDtailsSchema
);
