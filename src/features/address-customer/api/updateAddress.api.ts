import { AddressCustomerDTO } from "@/types/addressCustomer";
import axiosInstance from "@/utils/axiosInstance";

export async function updateAddressApi(id: string, data: Omit<AddressCustomerDTO, "id">) {
    console.log("INI DATA", id)
    try{
        const res = await axiosInstance.put(`/address/update/${id}`, data)

        return res.data.data
    }catch(error){
        throw error
    }
}
