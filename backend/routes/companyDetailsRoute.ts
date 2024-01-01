import express from "express";
import * as companyDetailsController from "../controllers/companyDetailsController";

const router = express.Router();

router.post(
  "/api/v1/company-details",
  companyDetailsController.createCompanyDetails
);

export default router;
