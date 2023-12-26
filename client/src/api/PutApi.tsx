import axios from "axios";
import { useMutation } from "react-query";

export const useUpdateProduct = () => {
  const putRequest = async (productId: string, updatedData: any) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/products/${productId}`,
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
