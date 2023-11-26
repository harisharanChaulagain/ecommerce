import myKey from "./KhaltiKey";
import axios from "axios";
import { toast } from "react-toastify";

let config = {
  publicKey: myKey.publicTestKey,
  productIdentity: "123766",
  productName: "Hamro Bazar",
  productUrl: "http://localhost:5173/",
  eventHandler: {
    onSuccess() {
      axios
        .post("http://localhost:3001/verify-payment")
        .then((response: any) => {
          console.log(response.data);
          toast("Payment Successfull!");
        })
        .catch((error: any) => {
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
export default config;
