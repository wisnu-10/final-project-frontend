import axiosInstance from "@/utils/axiosInstance";

export const updateLaundryItemApi = async (
  id: string,
  data: {
    name?: string;
    pricingType?: string;
    price?: number;
  },
) => {
  const response = await axiosInstance.put(`/laundry-items/${id}`, data);
  return response.data;
};
