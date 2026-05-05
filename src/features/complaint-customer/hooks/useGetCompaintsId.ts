import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useGetComplaintId(){
    const [isLoading, setIsLoading]  = useState(false)
    const [data, setData] = useState<any>(null)
    const [isError, setIsError] = useState(false)

    const fetchComplaintId = async (id: string) => {
        try{
            setIsLoading(true)

            const res = await axiosInstance.get<ApiResponse<any>>(`/complaint/${id}`)

            setData(res.data.data)
        }catch(error:any){
            toast.error(
              error.response?.data?.message || "Failed to fetch complaints",
            )
            setIsError(true)
        }finally{
            setIsLoading(false)
        }
    }

    return {isLoading, isError, fetchComplaintId, data}
}