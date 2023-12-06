import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

// Delete product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const deleteRequest = async (productId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/products/${productId}`
      );

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
