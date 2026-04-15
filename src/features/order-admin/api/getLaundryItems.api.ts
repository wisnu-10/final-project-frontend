import axiosInstance from "@/utils/axiosInstance";

export const getLaundryItemsApi = async () => {
  const response = await axiosInstance.get("/laundry-items");
  return response.data;
};
