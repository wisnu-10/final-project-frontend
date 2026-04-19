import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";
import toast from "react-hot-toast";

export default function createPayment() {
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
          console.log("success", result);
          setShowPaymentModal(false);
          window.location.reload();
          // Lu bisa refresh data atau pindah halaman di sini
        },
        onPending: function (result: any) {
          console.log("pending", result);
          setShowPaymentModal(false);
        },
        onError: function (result: any) {
          console.log("error", result);
        },
        onClose: function () {
          /* alert("Yah, kok ditutup? Bayar dong biar bajunya bersih!"); */
        },
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
