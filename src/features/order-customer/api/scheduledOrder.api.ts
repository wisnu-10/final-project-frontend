import { ApiResponse } from "@/types/api"
import axiosInstance from "@/utils/axiosInstance"

export async function scheduledOrderApi(data: CreateOrderDTO) {
    try {
        const res = await axiosInstance.post<ApiResponse<CreateOrderDTO>>("/order/scheduled-pickup", data)

        return res.data.data
    } catch (error) {
        throw error
    }
}