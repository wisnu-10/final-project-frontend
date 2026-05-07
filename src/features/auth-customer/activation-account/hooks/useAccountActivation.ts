import { useFormik } from "formik";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { authActivationSchema } from "../validation/accountActivationSchema";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";
import { ApiResponse } from "@/types/api";
import { accountActivationApi } from "../api/accountActivation.api";
import { useState } from "react";

export function useAccountActivation() {
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
      if (values.password !== values.confirmPassword) {
        toast.error("Password must match");
        return;
      }
      setIsLoading(true);
      try {
        await accountActivationApi(values, slug);

        router.push("/auth");

        toast.success("Account created successfully 🎉");
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return { formik, isLoading };
}
