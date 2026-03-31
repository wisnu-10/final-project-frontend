import { ApiResponse } from "@/types/api";
import { LoginDTO } from "@/types/auth.dto";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";

export async function loginApi(values: LoginDTO) {
  try {
    const res = await axiosInstance.post<ApiResponse<any>>("/auth/login", {
      email: values.email,
      password: values.password,
    });

    return res.data.data;
  } catch (error: any) {
    throw error;
  }
}
