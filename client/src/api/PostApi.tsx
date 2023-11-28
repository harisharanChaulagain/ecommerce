import axios from "axios";
import { useMutation } from "react-query";

//create category
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

//create product
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

//create user
export const useUserCreate = () => {
  const postRequest = async (data: FormData) => {
    try {
      const response = await axios.post("http://localhost:3001/users", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response from API:", response.data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const mutation = useMutation(postRequest);

  return { mutation };
};

//login user
export const useUserLogin = () => {
  const postRequest = async (data: FormData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/users/login",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  };

  const mutation = useMutation(postRequest);

  return { mutation };
};
