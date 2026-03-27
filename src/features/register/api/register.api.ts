import { ApiResponse } from "@/app/types/api";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import { RegisterDTO } from "@/types/auth.dto";

export async function registerApi({
  firstName,
  lastName,
  email,
  phoneNumber,
  role,
}: RegisterDTO) {
  try {
    const res = await axiosInstance.post<ApiResponse<any>>("/auth/register", {
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
    });

    return res.data.data
  } catch (error: any) {
    throw error
  }
}
