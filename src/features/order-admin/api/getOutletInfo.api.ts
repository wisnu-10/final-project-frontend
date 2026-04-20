import axiosInstance from "@/utils/axiosInstance";

export const getOutletInfoApi = async () => {
  const { data } = await axiosInstance.get("/order-admin/outlet-info");
  return data;
};
