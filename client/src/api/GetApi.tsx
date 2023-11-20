import { useQuery } from "react-query";
import axios from "axios";

const fetchCategoryData = async (): Promise<any> => {
  try {
    const response = await axios.get("http://localhost:3001/categories");
    console.log("Response from API:", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch category data from API");
  }
};

export const useCategory = () => {
  return useQuery<any>("categoryData", fetchCategoryData);
};
