import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { authRegisterSchema } from "../validation/registerSchema";
import axiosInstance from "@/utils/axiosInstance";
import { ApiResponse } from "@/app/types/api";
import toast from "react-hot-toast";
import { registerApi } from "../api/register.api";
import { useState } from "react";

export function useFormRegister() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        role: "customer" as const,
      },
      validationSchema: authRegisterSchema,
      onSubmit: async ({ firstName, lastName, email, phoneNumber, role }) => {
        try {
          setIsLoading(true)
          await registerApi({ firstName, lastName, email, phoneNumber, role });

          router.push("/auth/verify-email");

          toast.success(
            "Registration successful! Please check your email to activate your account 📧",
          );
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Something went wrong");
        }finally{
          setIsLoading(false)
        }
      },
    });

    return { formik, isLoading }
}