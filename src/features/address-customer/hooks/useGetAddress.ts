'use client'

import { AddressCustomerDTO } from "@/types/addressCustomer"
import { ApiResponse } from "@/types/api"
import axiosInstance from "@/utils/axiosInstance"
import { get } from "http"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

interface AddressResponse {
  addresses: AddressCustomerDTO[];
}

export const useGetAddress = () => {
    const [address, setAddress] = useState<AddressCustomerDTO[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const getAddress = async () => {
        try{
            setIsLoading(true)
            const res = await axiosInstance.get<ApiResponse<AddressResponse>>("/address/me")

            setAddress(res.data.data.addresses)
        }catch (error: any){
            toast.error(
              error.response?.data?.message || "Something went wrong",
            );
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getAddress()
    }, [])

    return {address, isLoading, isError, getAddress}
}