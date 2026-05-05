import { AddressCustomerDTO } from "@/types/addressCustomer"
import { ApiResponse } from "@/types/api"
import axiosInstance from "@/utils/axiosInstance"

type CreateAddressRequest = Omit<AddressCustomerDTO, "id">;

interface AddressResponse {
  addresses: AddressCustomerDTO[];
}
export async function createAddressApi(data: CreateAddressRequest) {
    try {
        const res = await axiosInstance.post<ApiResponse<AddressResponse>>("/address/create", data)

        return res.data.data.addresses
    }catch(error){
        throw error
    }
}