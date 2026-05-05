import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useEmailInvoice() {
  const [isLoading, setIsLoading] = useState(false);

  const emailInvoice = async (orderId: string) => {
    try {
      setIsLoading(true);

      const res = await axiosInstance.post<ApiResponse<any>>(
        `/payments/email-invoice/${orderId}`, {}
      );

      toast.success("Invoice has been sent to email");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return { emailInvoice, isLoading };
}
