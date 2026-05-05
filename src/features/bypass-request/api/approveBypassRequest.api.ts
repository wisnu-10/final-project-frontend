import axiosInstance from "@/utils/axiosInstance";

export const approveBypassRequestApi = async (id: string) => {
  const response = await axiosInstance.patch(
    `/bypass-request/${id}/approve`,
  );
  return response.data;
};
