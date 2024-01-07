import React, { useEffect, useContext } from "react";
import "./NewProfile.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePostCompanyDetails } from "../../../../api/PostApi";
import { useCompanyDetails } from "../../../../api/GetApi";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import { Context } from "../../../../utils/context";
import { useUpdateCompanyDetails } from "../../../../api/PutApi";

const NewProfile = ({
  isUpdate,
  cId,
}: {
  isUpdate?: boolean;
  cId?: string | null;
}) => {
  const { setUpdateCompanyDetails }: any = useContext(Context);
  const { mutation } = usePostCompanyDetails();
  const { putMutation }: any = useUpdateCompanyDetails();
  const { data: existingCompanyDetails } = useCompanyDetails();

  useEffect(() => {
    if (
      isUpdate &&
      existingCompanyDetails &&
      existingCompanyDetails.length > 0
    ) {
      const dataToUpdate = existingCompanyDetails.find(
        (companyDetail: any) => companyDetail._id === cId
      );
      if (dataToUpdate) {
        formik.setValues({
          companyName: dataToUpdate.name || "",
          companyAddress: dataToUpdate.address || "",
          companyEmail: dataToUpdate.email || "",
          companyNumber: dataToUpdate.phone || "",
          companyPan: dataToUpdate.pan || "",
          description: dataToUpdate.description || "",
          logo: null,
        });
      }
    }
  }, []);

  const validationSchema = isUpdate
    ? Yup.object({
        companyName: Yup.string()
          .min(3, "Company Name must be at least 3 characters")
          .required("Company Name is required"),
        companyAddress: Yup.string().required("Address is required"),
        companyEmail: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        companyNumber: Yup.string()
          .matches(/^[0-9]{10}$/, "Invalid phone number")
          .required("Phone number is required"),
        companyPan: Yup.string()
          .matches(/^[0-9]{10}$/, "Invalid pan number")
          .required("Pan number is required"),
        description: Yup.string().test(
          "min-words",
          "About Company must contain at least 5 words",
          (value: any) => value && value.split(/\s+/).length >= 5
        ),
      })
    : Yup.object({
        companyName: Yup.string()
          .min(3, "Company Name must be at least 3 characters")
          .required("Company Name is required"),
        companyAddress: Yup.string().required("Address is required"),
        companyEmail: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        companyNumber: Yup.string()
          .matches(/^[0-9]{10}$/, "Invalid phone number")
          .required("Phone number is required"),
        companyPan: Yup.string()
          .matches(/^[0-9]{10}$/, "Invalid pan number")
          .required("Pan number is required"),
        description: Yup.string().test(
          "min-words",
          "About Company must contain at least 5 words",
          (value: any) => value && value.split(/\s+/).length >= 5
        ),
        logo: Yup.mixed().required("Logo is required"),
      });

  const onSubmit = async (
    values: any,
    { resetForm }: { resetForm: () => void }
  ) => {
    const formData = new FormData();
    formData.append("name", values.companyName);
    formData.append("email", values.companyEmail);
    formData.append("phone", values.companyNumber);
    formData.append("address", values.companyAddress);
    formData.append("pan", values.companyPan);
    formData.append("description", values.description);
    if (values.logo) {
      formData.append("logo", values.logo);
    }

    try {
      if (isUpdate) {
        if (existingCompanyDetails && cId) {
          await putMutation.mutate(
            {
              _id: cId,
              data: formData,
            },
            {
              onSuccess: () => {
                toast.success("Company Details Updated Successfully!");
                resetForm();
              },
              onError: (error: any) => {
                console.error("Error updating company details:", error);
              },
            }
          );
        } else {
          console.error("Error: Company data or _id is undefined");
        }
      } else {
        await mutation.mutate(formData);
        toast.success("Company details added successfully!");
        resetForm();
      }
    } catch (error) {
      console.error(
        `Error ${isUpdate ? "updating" : "creating"} product:`,
        error
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      companyName: "",
      companyAddress: "",
      companyEmail: "",
      companyNumber: "",
      companyPan: "",
      description: "",
      logo: null,
    },
    validationSchema,
    onSubmit,
  });

  const handleImageChange = (e: any) => {
    if (e.target.files) {
      formik.setFieldValue("logo", e.target.files[0]);
    }
  };

  return (
    <div className="new-profile-overlay">
      <div className="new-profile-main">
        <div className="main-text">
          <span>{isUpdate ? "Update" : "Add "} Company Details</span>
          {isUpdate && (
            <MdClose
              className="close-icon"
              onClick={() => setUpdateCompanyDetails(false)}
            />
          )}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="input-fields">
            <div>
              <div>Company Name</div>
              <input
                type="text"
                autoFocus
                placeholder="Add Company Name"
                name="companyName"
                value={formik.values.companyName}
                onChange={formik.handleChange}
              />
              {formik.touched.companyName && formik.errors.companyName ? (
                <div className="error">{formik.errors.companyName}</div>
              ) : null}
            </div>
            <div>
              <div>Address</div>
              <input
                type="text"
                autoFocus
                placeholder="Add Company Address"
                name="companyAddress"
                value={formik.values.companyAddress}
                onChange={formik.handleChange}
              />
              {formik.touched.companyAddress && formik.errors.companyAddress ? (
                <div className="error">{formik.errors.companyAddress}</div>
              ) : null}
            </div>
          </div>
          <div className="input-fields">
            <div>
              <div>Email</div>
              <input
                type="email"
                autoFocus
                placeholder="Add Email Address"
                name="companyEmail"
                value={formik.values.companyEmail}
                onChange={formik.handleChange}
              />
              {formik.touched.companyEmail && formik.errors.companyEmail ? (
                <div className="error">{formik.errors.companyEmail}</div>
              ) : null}
            </div>
            <div>
              <div>Phone</div>
              <input
                type="text"
                autoFocus
                placeholder="Add Phone Number"
                name="companyNumber"
                value={formik.values.companyNumber}
                onChange={formik.handleChange}
              />
              {formik.touched.companyNumber && formik.errors.companyNumber ? (
                <div className="error">{formik.errors.companyNumber}</div>
              ) : null}
            </div>
          </div>
          <div className="input-fields">
            <div>
              <div>Pan</div>
              <input
                type="text"
                autoFocus
                placeholder="Add Pan Number"
                name="companyPan"
                value={formik.values.companyPan}
                onChange={formik.handleChange}
              />
              {formik.touched.companyPan && formik.errors.companyPan ? (
                <div className="error">{formik.errors.companyPan}</div>
              ) : null}
            </div>
            <div>
              <div>Logo</div>
              <input
                type="file"
                accept=".png, .jpeg, .jpg"
                onChange={handleImageChange}
              />
              {formik.touched.logo && formik.errors.logo ? (
                <div className="error">{formik.errors.logo}</div>
              ) : null}
            </div>
          </div>
          <div className="input-fields">
            <div>
              <div>About Company</div>
              <div>
                <textarea
                  rows={4 as number}
                  cols={20 as number}
                  style={{ resize: "none" }}
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
                {formik.touched.description && formik.errors.description ? (
                  <div className="error">{formik.errors.description}</div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="button-main">
            <button type="submit" className="save-btn">
              {isUpdate ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProfile;
