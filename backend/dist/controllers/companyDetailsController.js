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
exports.updateCompanyDetails = exports.getCompanyDetails = exports.createCompanyDetails = void 0;
const CompanyDetails_1 = __importDefault(require("../models/CompanyDetails"));
const imageUtils_1 = require("../utils/imageUtils");
const createCompanyDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, address, phone, pan } = req.body;
        let logo;
        if (req.files && req.files.logo) {
            const logoFile = req.files.logo;
            if (!(0, imageUtils_1.isValidImageType)(logoFile.mimetype)) {
                return res.status(400).json({
                    error: "Invalid file type. Please upload a JPEG or PNG image.",
                });
            }
            logo = logoFile.data;
        }
        const newCompanyDetails = new CompanyDetails_1.default({
            name,
            email,
            address,
            phone,
            pan,
            logo,
        });
        yield newCompanyDetails.save();
        console.log("New Company Details added:", newCompanyDetails);
        res.status(201).json(newCompanyDetails);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createCompanyDetails = createCompanyDetails;
//get company details
const getCompanyDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const CompanyDetail = yield CompanyDetails_1.default.find();
        res.json(CompanyDetail);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getCompanyDetails = getCompanyDetails;
//update company details
const updateCompanyDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cId = req.params.id;
        if (!cId) {
            return res.status(400).json({
                error: "Company Id is required:",
            });
        }
        const company = yield CompanyDetails_1.default.findById(cId);
        if (!company) {
            return res.status(404).json({ error: "Company not found." });
        }
        const companyUpdate = {};
        for (const key in req.body) {
            if (Object.prototype.hasOwnProperty.call(req.body, key)) {
                companyUpdate[key] = req.body[key];
            }
        }
        if (req.files && req.files.logo) {
            const imageFile = req.files.logo;
            if (!(0, imageUtils_1.isValidImageType)(imageFile.mimetype)) {
                return res.status(400).json({
                    error: "Invalid file type. Please upload a JPEG or PNG image.",
                });
            }
            companyUpdate.logo = imageFile.data;
        }
        const updatedCompany = yield CompanyDetails_1.default.findByIdAndUpdate(cId, { $set: companyUpdate }, { new: true });
        if (!updatedCompany) {
            return res
                .status(500)
                .json({ error: "Failed to update company details" });
        }
        res.status(200).json({
            message: "Company details updated successfully!!",
            updatedDetails: updatedCompany,
        });
    }
    catch (error) {
        console.error("Error updating company details", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateCompanyDetails = updateCompanyDetails;
