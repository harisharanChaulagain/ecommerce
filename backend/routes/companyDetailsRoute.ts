import express from "express";
import * as companyDetailsController from "../controllers/companyDetailsController";

const router = express.Router();

router.post(
  "/api/v1/company-details",
  companyDetailsController.createCompanyDetails
);
router.get(
  "/api/v1/company-details",
  companyDetailsController.getCompanyDetails
);
router.put(
  "/api/v1/company-details/:id",
  companyDetailsController.updateCompanyDetails
);

export default router;
