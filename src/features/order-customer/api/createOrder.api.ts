import { ApiResponse } from "@/types/api"
import axiosInstance from "@/utils/axiosInstance"

interface CreteOrderDTO {
  pickupAddressId: string;
  deliveryAddressId: string;
  scheduleTime: string;
}

export async function createOrderApi(data: CreateOrderDTO) {
    try {
        const res = await axiosInstance.post<ApiResponse<CreateOrderDTO>>(
          "/order/create-pickup",
          data,
        );

        return res.data.data
    } catch (error) {
        throw error
    }
}