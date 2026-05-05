import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axiosInstance";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useConfirmEmail() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  const confirmEmail = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.patch<ApiResponse<any>>(
        `/profile/confirm-email`,
        {},  // jangan lupa pake ini
        { headers: { Authorization: `Bearer ${params.slug}` } },
      );

      toast.success("Email verified! Your profile is updated. ✨");
      setData(res.data.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    confirmEmail();
  }, []);

  return { data, isLoading };
}
