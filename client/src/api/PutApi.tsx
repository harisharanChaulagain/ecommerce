import { Axios } from "../lib/Axios";
import { useMutation } from "react-query";

//update products
export const useUpdateProduct = () => {
  const putRequest = async (productId: string, updatedData: any) => {
    try {
      const response = await Axios.put(
        `/api/v1/products/${productId}`,
        updatedData
      );

      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  const putMutation = useMutation(
    (variables: { _id: string; data: FormData }) =>
      putRequest(variables._id, variables.data)
  );

  return { putMutation };
};

//update category
export const useUpdateCategory = () => {
  const putRequest = async (categoryId: string, updatedData: any) => {
    try {
      const response = await Axios.put(
        `/api/v1/categories/${categoryId}`,
        updatedData
      );

      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  };

  const putMutation = useMutation(
    (variables: { _id: string; data: FormData }) =>
      putRequest(variables._id, variables.data)
  );

  return { putMutation };
};

//update company details
export const useUpdateCompanyDetails = () => {
  const putRequest = async (cId: string, updatedData: any) => {
    try {
      const response = await Axios.put(
        `/api/v1/company-details/${cId}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      console.error("Error while updateing company details", error);
      throw error;
    }
  };
  const putMutation = useMutation(
    (variables: { _id: string; data: FormData }) =>
      putRequest(variables._id, variables.data)
  );

  return { putMutation };
};
