import { createAddressApi } from "@/features/address-customer/api/createAddress.api";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { createOrderApi } from "../api/createOrder.api";
import { createOrderSchema } from "../validation/createOrderSchema";
import { scheduledOrderApi } from "../api/scheduledOrder.api";

interface UseCreateOrderDTO {
  setShowRequestForm: (value: boolean) => void;
  getOrder: () => void;
}

export function useScheduleOrder({
  setShowRequestForm,
  getOrder,
}: UseCreateOrderDTO) {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      pickupAddressId: "",
      deliveryAddressId: "",
      scheduleTime: "",
    },
    validationSchema: createOrderSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        await scheduledOrderApi(values);

        toast.success("Pickup order has been scheduled");

        setShowRequestForm(false);

        getOrder();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
  });
  return { formik, isLoading };
}
