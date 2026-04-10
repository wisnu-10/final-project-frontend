import axiosInstance from "@/utils/axiosInstance";

export const deleteLaundryItemApi = async (id: string) => {
  const response = await axiosInstance.delete(`/laundry-items/${id}`);
  return response.data;
};
