import { ApiResponse } from "@/types/api"
import axiosInstance from "@/utils/axiosInstance"

export async function verifyPasswordApi(oldPassword: string){
    try{
        const res = await axiosInstance.post<ApiResponse<any>>("/profile/verify-password", {oldPassword})

        return res.data.data
    }catch (error) {
        throw error
    }
}