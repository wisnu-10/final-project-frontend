import { useFormik } from "formik";
import { ForgotPasswordSchema } from "../validation/forgotPasswordValidation";
import axiosInstance from "@/utils/axiosInstance";
import { ApiResponse } from "@/types/api";
import toast from "react-hot-toast";
import { forgotPasswordApi } from "../api/forgotPassword.api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useForgotPassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        await forgotPasswordApi(values);

        toast.success("Reset link sent! Check your inbox");

        router.push("/auth/verify-email");
      } catch (error: any) {
        toast.error(
          error.response?.data?.message || "Something went wrong. Try again.",
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  return { formik, isLoading };
}
