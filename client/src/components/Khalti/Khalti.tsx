import React from "react";
import "./Khalti.scss";
import KhaltiCheckout from "khalti-checkout-web";
import config from "./KhaltiConfig";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

const Khalti = () => {
  const navigate = useNavigate();
  let checkout = new KhaltiCheckout(config());
  const { id }: any = useParams<{ id: string }>();
  return (
    <div className="main">
      <div className="opac-layer"></div>
      <div className="khalti-main">
        <span className="close-container" onClick={() => navigate("/")}>
          <MdClose />
          <span>Cancel</span>
        </span>
        <button
          onClick={() => {
            checkout.show({ amount: parseInt(id) });
            navigate("/");
          }}
          className="pay-btn"
        >
          Pay Via Khalti
        </button>
      </div>
    </div>
  );
};

export default Khalti;
