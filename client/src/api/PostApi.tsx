import axios from "axios";
import { useMutation } from "react-query";

const usePostApi = () => {
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

export default usePostApi;
