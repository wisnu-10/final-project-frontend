import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axiosInstance";
import { useParams } from "next/navigation";

export async function accountActivationApi(values: any, token: string) {
  try {
    const res = await axiosInstance.patch<ApiResponse<any>>(
      "/auth/activation",
      {
        password: values.password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data.data;
  } catch (error) {
    throw error;
  }
}
