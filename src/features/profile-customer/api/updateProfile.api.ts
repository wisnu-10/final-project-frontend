"use client"

import { ApiResponse } from "@/types/api";
import { ProfileUpdateDTO } from "@/types/profileCustomer.dto";
import axiosInstance from "@/utils/axiosInstance";

export async function updateProfileApi(data: FormData
 ) {
  try {

    const res = await axiosInstance.put<ApiResponse<any>>("/profile/update", data);

    return res.data.data
  } catch (error) {
    throw error;
  }
}
