import { Request, Response } from "express";
import CompanyDetails, { ICompanyDetails } from "../models/CompanyDetails";
import { UploadedFile } from "express-fileupload";
import { isValidImageType } from "../utils/imageUtils";

export const createCompanyDetails = async (req: Request, res: Response) => {
  try {
    const { name, email, address, phone, pan } = req.body;
    let logo: Buffer | undefined;

    if (req.files && req.files.logo) {
      const logoFile = req.files.logo as UploadedFile;

      if (!isValidImageType(logoFile.mimetype)) {
        return res.status(400).json({
          error: "Invalid file type. Please upload a JPEG or PNG image.",
        });
      }

      logo = logoFile.data;
    }

    const newCompanyDetails: ICompanyDetails = new CompanyDetails({
      name,
      email,
      address,
      phone,
      pan,
      logo,
    });

    await newCompanyDetails.save();

    console.log("New Company Details added:", newCompanyDetails);
    res.status(201).json(newCompanyDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get company details
export const getCompanyDetails = async (req: Request, res: Response) => {
  try {
    const CompanyDetail = await CompanyDetails.find();
    res.json(CompanyDetail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//update company details
export const updateCompanyDetails = async (req: Request, res: Response) => {
  try {
    const cId = req.params.id;
    if (!cId) {
      return res.status(400).json({
        error: "Company Id is required:",
      });
    }

    const company = await CompanyDetails.findById(cId);
    if (!company) {
      return res.status(404).json({ error: "Company not found." });
    }

    const companyUpdate: any = {};
    for (const key in req.body) {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        companyUpdate[key] = req.body[key];
      }
    }

    if (req.files && req.files.logo) {
      const imageFile = req.files.logo as UploadedFile;

      if (!isValidImageType(imageFile.mimetype)) {
        return res.status(400).json({
          error: "Invalid file type. Please upload a JPEG or PNG image.",
        });
      }

      companyUpdate.logo = imageFile.data;
    }

    const updatedCompany = await CompanyDetails.findByIdAndUpdate(
      cId,
      { $set: companyUpdate },
      { new: true }
    );

    if (!updatedCompany) {
      return res
        .status(500)
        .json({ error: "Failed to update company details" });
    }

    res.status(200).json({
      message: "Company details updated successfully!!",
      updatedDetails: updatedCompany,
    });
  } catch (error) {
    console.error("Error updating company details", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
