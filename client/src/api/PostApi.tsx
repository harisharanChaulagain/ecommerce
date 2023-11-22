import axios from "axios";
import { useMutation } from "react-query";

export const usePostCategory = () => {
  const postRequest = async (data: FormData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/categories",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response from API:", response.data);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const mutation = useMutation(postRequest);

  return { mutation };
};

export const usePostProduct = () => {
  const postRequest = async (data: FormData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/products",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response from API:", response.data);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const mutation = useMutation(postRequest);

  return { mutation };
};
