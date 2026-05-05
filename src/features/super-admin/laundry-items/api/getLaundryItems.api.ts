import axiosInstance from "@/utils/axiosInstance";

export const getLaundryItemsApi = async (params?: {
  search?: string;
  pricingType?: string;
  page?: number;
  limit?: number;
}) => {
  const response = await axiosInstance.get("/laundry-items", { params });
  return response.data;
};
