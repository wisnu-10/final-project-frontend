import useAuthStore from "@/stores/useAuthStore";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { authLoginSchema } from "../validation/loginSchema";
import { loginEmployeeApi } from "../api/login-employee.api";
import { LoginDTO } from "@/types/auth.dto";
import { useState } from "react";
import toast from "react-hot-toast";

export function useFormLoginEmployee() {
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
        const employee = await loginEmployeeApi(values);

        setAuth({
          firstName: employee.firstName,
          email: employee.email,
          role: employee.role,
        });

        router.push("/dashboard");

        toast.success("Welcome back! 🎉");
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return { formik, isLoading };
}
