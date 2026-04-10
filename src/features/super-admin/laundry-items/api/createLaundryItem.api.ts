import axiosInstance from "@/utils/axiosInstance";

export const createLaundryItemApi = async (data: {
  name: string;
  pricingType: string;
  price: number;
}) => {
  const response = await axiosInstance.post("/laundry-items", data);
  return response.data;
};
