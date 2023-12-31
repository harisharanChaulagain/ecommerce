import { useQuery } from "react-query";
import axios from "axios";

const fetchCategoryData = async (): Promise<any> => {
  try {
    const response = await axios.get("http://localhost:3001/api/v1/categories");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch category data from API");
  }
};

export const useCategory = () => {
  return useQuery<any>("categoryData", fetchCategoryData);
};

const fetchProductData = async (): Promise<any> => {
  try {
    const response = await axios.get("http://localhost:3001/api/v1/products");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch products data from API");
  }
};

export const useProduct = () => {
  return useQuery<any>("productData", fetchProductData);
};

const fetchSearchProductData = async (productName: string): Promise<any> => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/v1/products/search?productName=${productName}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch products data for ${productName} from API`
    );
  }
};

export const useSearchProduct = (productName: string) => {
  return useQuery<any>(
    ["searchProductData", productName],
    () => fetchSearchProductData(productName),
    {
      enabled: Boolean(productName),
    }
  );
};

// userDetails
const fetchUserData = async (): Promise<any> => {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/v1/user/details"
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user data from API");
  }
};

export const useUserDetails = () => {
  return useQuery<any>("userDetailsData", fetchUserData);
};
