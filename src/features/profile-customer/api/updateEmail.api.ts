import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axiosInstance";

export async function updateEmailApi(newEmail: string) {
  try {
    const res = await axiosInstance.patch<ApiResponse<any>>(
      "/profile/update-email",
      { newEmail },
    );

    return res.data.data;
  } catch (error) {
    throw error;
  }
}
