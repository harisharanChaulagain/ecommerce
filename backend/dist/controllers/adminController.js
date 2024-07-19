"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Admin_1 = __importDefault(require("../models/Admin"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
const AdminController = {
    loginAdmin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const admin = yield Admin_1.default.findOne({ username });
            if (!admin) {
                return res.status(404).json({ error: "Admin not found" });
            }
            if (password !== admin.password) {
                return res.status(401).json({ error: "Invalid password" });
            }
            // Generate JWT token for admin
            const adminToken = jsonwebtoken_1.default.sign({ adminId: admin._id }, SECRET_KEY, {
                expiresIn: "1h",
            });
            // Set the token in a cookie
            res.cookie("adminToken", adminToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
            });
            res.status(200).json({ message: "Admin login successful", adminToken });
        }
        catch (error) {
            console.error("Error logging in as admin:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
};
exports.default = AdminController;
