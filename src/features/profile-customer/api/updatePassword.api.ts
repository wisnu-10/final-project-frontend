import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axiosInstance";

export async function UpdatePasswordApi(oldPassword: string, newPassword: string) {
    
  try {
    const res = await axiosInstance.patch<ApiResponse<any>>("/profile/update-password", {
      oldPassword: oldPassword,
      newPassword: newPassword
    });
    

    return res.data.data
  } catch (error) {
    throw error;
  }
}
