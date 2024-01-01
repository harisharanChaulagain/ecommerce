import { Request, Response } from "express";
import CompanyDetails, { ICompanyDetails } from "../models/CompanyDetails";
import { UploadedFile } from "express-fileupload";

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

const isValidImageType = (mimeType: string): boolean => {
  return (
    mimeType.startsWith("image/jpeg") ||
    mimeType.startsWith("image/png") ||
    mimeType.startsWith("image/jpg")
  );
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
