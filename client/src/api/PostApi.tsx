import axios from "axios";
import { useMutation } from "react-query";
import Cookies from "js-cookie";

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
      const token = response.data.token;
      Cookies.set("token", token, { expires: 1 / 24 });
      return response;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  };

  const mutation = useMutation(postRequest);

  return { mutation };
};

//admin login
export const useAdminLogin = () => {
  const postRequest = async (data: FormData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/admins/login",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const adminToken = response.data.adminToken;
      Cookies.set("adminToken", adminToken, { expires: 1 / 24 });
      return response;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  };

  const mutation = useMutation(postRequest);

  return { mutation };
};

// Update product quantities after checkout
export const useUpdateProductQuantities = () => {
  const updateRequest = async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/products/checkout",
        data
      );

      console.log("Response from API:", response.data);
    } catch (error) {
      console.error("Error updating product quantities:", error);
      throw error;
    }
  };

  const mutation = useMutation(updateRequest);

  return { mutation };
};
