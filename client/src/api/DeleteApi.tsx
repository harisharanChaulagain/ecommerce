import { Axios } from "../lib/Axios";
import { useMutation, useQueryClient } from "react-query";

// Delete product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const deleteRequest = async (productId: string) => {
    try {
      const response = await Axios.delete(`/api/v1/products/${productId}`);

      console.log("Response from API:", response.data);

      queryClient.invalidateQueries("products");
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };

  const mutation = useMutation(deleteRequest);

  return { mutation };
};

//delete category
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const deleteRequest = async (categoryId: string) => {
    try {
      const response = await Axios.delete(`/api/v1/categories/${categoryId}`);

      console.log("Response from API:", response.data);

      queryClient.invalidateQueries("categories");
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  };

  const mutation = useMutation(deleteRequest);

  return { mutation };
};
