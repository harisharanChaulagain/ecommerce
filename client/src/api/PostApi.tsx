import { Axios } from "../lib/Axios";
import { useMutation } from "react-query";
import Cookies from "js-cookie";

//create category
export const usePostCategory = () => {
  const postRequest = async (data: FormData) => {
    try {
      const response = await Axios.post("/api/v1/categories", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
      const response = await Axios.post("/api/v1/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
      const response = await Axios.post("/api/v1/users", data, {
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
      const response = await Axios.post("/api/v1/users/login", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const token = response.data.token;
      const userId = response.data.userId;
      Cookies.set("token", token, { expires: 1 / 24 });
      Cookies.set("userId", userId, { expires: 1 / 24 });
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
      const response = await Axios.post("/api/v1/admins/login", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
      const response = await Axios.post("/api/v1/products/checkout", data);

      console.log("Response from API:", response.data);
    } catch (error) {
      console.error("Error updating product quantities:", error);
      throw error;
    }
  };

  const mutation = useMutation(updateRequest);

  return { mutation };
};

//add company details
export const usePostCompanyDetails = () => {
  const postRequest = async (data: FormData) => {
    try {
      const response = await Axios.post("/api/v1/company-details", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response from API:", response.data);
    } catch (error) {
      console.error("Error creating company details:", error);
    }
  };

  const mutation = useMutation(postRequest);

  return { mutation };
};
