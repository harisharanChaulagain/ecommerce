import { useContext } from "react";
import myKey from "./KhaltiKey";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../../utils/context";
import { useUpdateProductQuantities } from "../../api/PostApi";

const config = (products: any) => {
  const { setProductQuantities, setProductIds }: any = useContext(Context);
  const { mutation: updateProductQuantities } = useUpdateProductQuantities();

  const onSuccess = async () => {
    try {
      if (products && products.length > 0) {
        const productUpdates = products.map((product: any) => ({
          _id: product._id,
          quantity: product.quantity,
        }));

        await updateProductQuantities.mutate({
          products: productUpdates,
        });

        axios
          .post("http://localhost:3001/verify-payment")
          .then((response) => {
            console.log(response.data);
            toast.success("Payment Successful!");
            setProductQuantities([]);
            setProductIds([]);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.warn("No products to update quantities");
      }
    } catch (error) {
      console.error("Error handling payment success:", error);
    }
  };

  return {
    publicKey: myKey.publicTestKey,
    productIdentity: "123766",
    productName: "Hamro Bazar",
    productUrl: "http://localhost:5173/",
    eventHandler: {
      onSuccess,
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
