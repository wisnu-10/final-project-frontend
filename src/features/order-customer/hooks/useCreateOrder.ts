import { createAddressApi } from "@/features/address-customer/api/createAddress.api";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createOrderApi } from "../api/createOrder.api";
import { createOrderSchema } from "../validation/createOrderSchema";

interface UseCreateOrderDTO {
  setShowRequestForm: (value: boolean) => void;
  getOrder: () => void;
}

export function useCreateOrder({
  setShowRequestForm,
  getOrder,
}: UseCreateOrderDTO) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState<"radius" | "city" | null>(null);

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
        setErrorType(null);

        await createOrderApi(values);

        toast.success("Pickup order has been created");

        setShowRequestForm(false);

        getOrder();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
        if(error.response?.data?.message === "Outlet not found in pickup city"){
          setErrorType("city")
        } else if (
          error.response?.data?.message ===
          "The nearest outlet is too far from the address"
        ) {
          setErrorType("radius");
        }

      } finally {
        setIsLoading(false);
      }
    },
  });
  
  return {errorType, formik, isLoading };
}
