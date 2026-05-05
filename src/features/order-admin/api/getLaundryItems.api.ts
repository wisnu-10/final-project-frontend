import axiosInstance from "@/utils/axiosInstance";

export const getLaundryItemsApi = async (params?: { search?: string; limit?: number; page?: number }) => {
  const response = await axiosInstance.get("/laundry-items", { params });
  return response.data;
};
