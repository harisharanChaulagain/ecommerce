import { useContext } from "react";
import myKey from "./KhaltiKey";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../../utils/context";

const config = () => {
  const { setClearCart }: any = useContext(Context);
  return {
    publicKey: myKey.publicTestKey,
    productIdentity: "123766",
    productName: "Hamro Bazar",
    productUrl: "http://localhost:5173/",
    eventHandler: {
      onSuccess() {
        axios
          .post("http://localhost:3001/verify-payment")
          .then((response) => {
            console.log(response.data);
            toast.success("Payment Successful!");
            setClearCart(true);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      onError(error: any) {
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };
};

export default config;
