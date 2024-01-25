import html2canvas from "html2canvas";
import Cookies from "js-cookie";
import jsPDF from "jspdf";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useCompanyDetails, useUsersDetails } from "../../api/GetApi";
import { bufferToDataURL } from "../../utils/imageUtils";
import {
  companyDetails,
  UserDetails,
} from "../Header/ProfileDetails/ProfileDetails";
import "./Invoice.scss";
import InvoiceTable from "./InvoiceTable/InvoiceTable";

const Invoice = () => {
  const [loader, setLoader] = useState(false);
  const { data: companyData } = useCompanyDetails();
  const { data: userData } = useUsersDetails();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const userId = Cookies.get("userId");
  const filteredUserData = userData?.filter(
    (user: UserDetails) => user?._id === userId
  );

  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const currentDay = currentDate.getDate().toString().padStart(2, "0");
  const formattedDate = `${currentYear}/${currentMonth}/${currentDay}`;

  const downloadPDF = () => {
    const capture = document.querySelector(".invoice-main") as HTMLElement;
    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save("receipt.pdf");
      localStorage.removeItem("productQuantities");
      localStorage.removeItem("productIds");
      navigate("/");
    });
  };

  const getProductIdsFromLocalStorage = () => {
    const storedIds = localStorage.getItem("productIds");
    return storedIds ? JSON.parse(storedIds) : [];
  };
  const storedProductIds = getProductIdsFromLocalStorage();

  const getProductQuantitiesFromLocalStorage = () => {
    const storedQuantities = localStorage.getItem("productQuantities");
    return storedQuantities ? JSON.parse(storedQuantities) : [];
  };
  const storedProductQuantities = getProductQuantitiesFromLocalStorage();

  const updateTotal = (newTotal: number) => {
    setTotal(newTotal);
  };

  const handleCancel = () => {
    localStorage.removeItem("productQuantities");
    localStorage.removeItem("productIds");
    navigate("/");
  };

  return (
    <div className="invoice-overlay">
      <div className="overlay-main">
        <div className="download-btn">
          <span onClick={downloadPDF}>
            <button className="download-btn-content" disabled={loader}>
              <FaArrowDown />
              {loader ? <span>Downloading</span> : <span>Download </span>}
            </button>
          </span>
          <span onClick={handleCancel}>
            <button className="cancel-btn-content">
              <ImCross />
              <span>Cancel </span>
            </button>
          </span>
        </div>
        <div className="invoice-main">
          {companyData?.map((detail: companyDetails) => (
            <div className="company-details" key={detail?._id}>
              <span className="logo">
                {detail?.logo?.data && (
                  <img
                    src={bufferToDataURL(detail?.logo?.data)}
                    alt={detail.name}
                  />
                )}
              </span>
              <div className="company-name">{detail?.name}</div>
              <div className="other-details">
                <div>
                  Address:
                  <span> {detail?.address}</span>
                </div>
                <div>
                  Phone: <span>{detail?.phone}</span>
                </div>
                <div>
                  Email: <span>{detail?.email}</span>
                </div>
              </div>
            </div>
          ))}
          {filteredUserData?.map((detail: UserDetails) => (
            <div className="invoice-details" key={detail?._id}>
              <div className="first">Invoice Details</div>
              <hr />
              <div className="second">
                <div className="date">
                  <div>
                    Date:
                    <span> {formattedDate}</span>
                  </div>
                  <div>
                    Invoice No:.
                    <span># fkd443RFdf</span>
                  </div>
                </div>
                <div>
                  Customer Name: <span>{detail?.fullName}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="particulars">
            <InvoiceTable
              storedProductIds={storedProductIds}
              storedProductQuantities={storedProductQuantities}
              updateTotal={updateTotal}
            />
          </div>
          <div className="footer">
            <div className="first">
              <span> Total: </span>
              <span>&#8377; {total}</span>
            </div>
            <hr />
            <div className="second">Thank You!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
