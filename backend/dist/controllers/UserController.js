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
exports.getUserDetails = exports.getTotalUserCounts = exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
require("dotenv").config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, dob, password } = req.body;
        // Hash the password before saving it to the database
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.default({
            fullName,
            email,
            dob,
            password: hashedPassword,
        });
        yield newUser.save();
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, SECRET_KEY, {
            expiresIn: "1h",
        });
        // Set the token in a cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        });
        const userId = user._id;
        res.cookie("userId", userId, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        });
        res.status(200).json({ message: "Login successful", token, userId });
    }
    catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.loginUser = loginUser;
//user count
const getTotalUserCounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCount = yield User_1.default.countDocuments();
        res.status(200).json({ userCount });
    }
    catch (error) {
        console.error("Error getting user count:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getTotalUserCounts = getTotalUserCounts;
// user details
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Users = yield User_1.default.find();
        res.json(Users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getUserDetails = getUserDetails;
