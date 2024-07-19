"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const companyDtailsSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    pan: { type: String, required: true },
    description: { type: String, require: true },
    logo: { type: Buffer },
});
exports.default = mongoose_1.default.model("CompanyDetails", companyDtailsSchema);
