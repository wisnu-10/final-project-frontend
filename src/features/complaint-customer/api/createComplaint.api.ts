import { ApiResponse } from "@/types/api";
import { CreateComplaintDTO } from "@/types/createComplain.dto";
import axiosInstance from "@/utils/axiosInstance";

export async function createComplainApi(data: CreateComplaintDTO){
    try {
        const res = await axiosInstance.post<ApiResponse<CreateComplaintDTO>>(
          "/complaint/create-complaint",
          data,
        );

        return res.data.data
    } catch (error) {
        throw error
    }
}