import Cookies from "js-cookie";
import React from "react";
import { FaArrowDown } from "react-icons/fa";
import { useCompanyDetails, useUsersDetails } from "../../api/GetApi";
import { bufferToDataURL } from "../../utils/imageUtils";
import {
  companyDetails,
  UserDetails,
} from "../Header/ProfileDetails/ProfileDetails";
import "./Invoice.scss";
import InvoiceTable from "./InvoiceTable/InvoiceTable";

const Invoice = () => {
  const { data: companyData } = useCompanyDetails();
  const { data: userData } = useUsersDetails();

  const userId = Cookies.get("userId");
  const filteredUserData = userData?.filter(
    (user: UserDetails) => user?._id === userId
  );

  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const currentDay = currentDate.getDate().toString().padStart(2, "0");

  const formattedDate = `${currentYear}/${currentMonth}/${currentDay}`;

  return (
    <div className="invoice-main">
      {companyData?.map((detail: companyDetails) => (
        <>
          <span className="download-btn">
            <div className="download-btn-content">
              <FaArrowDown />
              Download
            </div>
          </span>
          <div className="company-details">
            <span className="logo">
              {detail?.logo?.data && (
                <img
                  src={bufferToDataURL(detail?.logo?.data)}
                  alt={detail.name}
                />
              )}
            </span>
            <span className="company-name">{detail?.name}</span>
            <span className="other-details">
              <span className="small-title">{detail?.address}</span>
              <span className="small-title">{detail?.phone}</span>
              <span className="small-title">{detail?.email}</span>
            </span>
          </div>
        </>
      ))}
      <hr />
      {filteredUserData?.map((detail: UserDetails) => (
        <div className="invoice-details">
          <span className="first">Invoice Details</span>
          <span className="second">
            <span className="date">
              <span>Date: {formattedDate}</span>
              <span>Invoice No:.# fkd443RFdf</span>
            </span>
            <span className="name">Customer Name: {detail?.fullName}</span>
          </span>
        </div>
      ))}
      <div className="particulars">
        <div>Particular</div>
        <InvoiceTable />
      </div>
      <div className="footer">Footer</div>
    </div>
  );
};

export default Invoice;
