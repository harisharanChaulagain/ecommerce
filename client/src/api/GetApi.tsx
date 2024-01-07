import { useQuery } from "react-query";
import { Axios } from "../lib/Axios";

const fetchCategoryData = async (): Promise<any> => {
  try {
    const response = await Axios.get("/api/v1/categories");
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
    const response = await Axios.get("/api/v1/products");
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
    const response = await Axios.get(
      `/api/v1/products/search?productName=${productName}`
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

// usersCounts
const fetchUsersCountData = async (): Promise<any> => {
  try {
    const response = await Axios.get("/api/v1/user/counts");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user data from API");
  }
};

export const useUsersCount = () => {
  return useQuery<any>("usersCountsData", fetchUsersCountData);
};

//company details
const fetchCompanyData = async (): Promise<any> => {
  try {
    const response = await Axios.get("/api/v1/company-details");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch company details from API");
  }
};
export const useCompanyDetails = () => {
  return useQuery<any>("companyDetailsData", fetchCompanyData);
};

// userDetails
const fetchUsersDetails = async (): Promise<any> => {
  try {
    const response = await Axios.get("/api/v1/user-details");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user details from API");
  }
};
export const useUsersDetails = () => {
  return useQuery<any>("userDetailsData", fetchUsersDetails);
};
