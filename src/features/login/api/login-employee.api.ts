import axiosInstance from "@/utils/axiosInstance";
import { ApiResponse } from "@/types/api";
import { LoginDTO } from "@/types/auth.dto";

export async function loginEmployeeApi(values: LoginDTO) {
  try {
    const res = await axiosInstance.post<ApiResponse<any>>(
      "/auth-employee/login",
      {
        email: values.email,
        password: values.password,
      },
    );

    return res.data.data;
  } catch (error: any) {
    throw error;
  }
}

export async function sessionEmployeeApi() {
  try {
    const res =
      await axiosInstance.get<ApiResponse<any>>("/auth-employee/session");

    return res.data.data;
  } catch (error: any) {
    throw error;
  }
}

export async function logoutEmployeeApi() {
  try {
    const res =
      await axiosInstance.post<ApiResponse<any>>("/auth-employee/logout");

    return res.data;
  } catch (error: any) {
    throw error;
  }
}
