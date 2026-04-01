import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axiosInstance";

export async function UpdatePasswordApi(newPassword: string) {
    
  try {
    const res = await axiosInstance.patch<ApiResponse<any>>("/profile/update-password", {
      newPassword: newPassword,
    });
    

    return res.data.data
  } catch (error) {
    throw error;
  }
}
