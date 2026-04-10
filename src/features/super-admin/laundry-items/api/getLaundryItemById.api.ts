import axiosInstance from "@/utils/axiosInstance";

export const getLaundryItemByIdApi = async (id: string) => {
  const response = await axiosInstance.get(`/laundry-items/${id}`);
  return response.data;
};
