import { ApiResponse } from "@/types/api";
import { authActivationSchema } from "@/features/auth-customer/activation-account/validation/accountActivationSchema";
import axiosInstance from "@/utils/axiosInstance";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { resetPasswordApi } from "../api/resetPassword.api";
import { useState } from "react";

export function useResetPassword() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: authActivationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      if (values.password !== values.confirmPassword) {
        toast.error("Password must match");
        return;
      }

      try {
        await resetPasswordApi(values, slug);

        router.push("/auth");

        toast.success("Reset password successfully 🎉");
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return { formik, isLoading };
}
