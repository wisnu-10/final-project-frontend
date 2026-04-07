import useAuthStore from "@/stores/useAuthStore";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { authLoginSchema } from "../validation/loginSchema";
import axiosInstance from "@/utils/axiosInstance";
import { ApiResponse } from "@/types/api";
import toast from "react-hot-toast";
import { loginApi } from "../api/login.api";
import { LoginDTO } from "@/types/auth.dto";
import { useState } from "react";

export function useFormLogin() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: authLoginSchema,
    onSubmit: async (values: LoginDTO) => {
      try {
        setIsLoading(true);
        const user = await loginApi(values);

        setAuth({
          firstName: user.firstName,
          email: user.email,
          role: user.role,
          profilePicture: user.profilePicture,
        });

        router.push("/");

        toast.success("Login account successfully 🎉");
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return { formik, isLoading };
}
