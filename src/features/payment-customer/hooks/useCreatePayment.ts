import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useCreatePayment() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const createPayment = async (
    orderId: string,
    setShowPaymentModal: (show: boolean) => void,
  ) => {
    try {
      setIsLoading(true);

      const res = await axiosInstance.post("/payments/create", { orderId });

      const { token } = res.data.data;

      // @ts-ignore (biar TS ngga marah soal window.snap)
      window.snap.pay(token, {
        onSuccess: function (result: any) {
          setShowPaymentModal(false);
          router.push("/payment/success");
        },
        onPending: function (result: any) {
          setShowPaymentModal(false);
          router.push("/payment/unfinish");
        },
        onError: function (result: any) {
          router.push("/payment/error");
        },
        onClose: function () {},
      });
    } catch (error: any) {
      console.log("Error creating payment:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return { createPayment, isLoading };
}
