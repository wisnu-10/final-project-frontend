import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axiosInstance";
import { useParams } from "next/navigation";

export async function resetPasswordApi(values: any, token: string) {
  try {
    await axiosInstance.post<ApiResponse<any>>(
      "/auth/reset-password",
      {
        password: values.password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    throw error;
  }
}
