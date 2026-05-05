import axiosInstance from "@/utils/axiosInstance";

export const rejectBypassRequestApi = async (id: string) => {
  const response = await axiosInstance.patch(
    `/bypass-request/${id}/reject`,
  );
  return response.data;
};
