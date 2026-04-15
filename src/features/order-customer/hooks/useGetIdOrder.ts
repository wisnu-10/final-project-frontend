'use client";'

import { AddressCustomerDTO } from "@/types/addressCustomer";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useGetIdOrder(id: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null); // ganti
  const [error, setError] = useState(false);

  const getById = async (id: string) => {
    try {
      setIsLoading(true);
      setError(false);

      const res = await axiosInstance.get<ApiResponse<any>>(
        `/order/${id}`,
      );

      setData(res.data.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setError(true);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setData(null);
    setError(false);
    if (id) {
      getById(id);
    }
  }, [id]);

  return { data, isLoading, error };
}
