import useAuthStore from "@/stores/useAuthStore";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { authLoginSchema } from "@/features/auth-customer/login/validation/loginSchema";
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
          lastName: employee.lastName || "",
          email: employee.email,
          role: employee.role,
          profilePicture: employee.profilePicture || "",
          outletId: employee.outletId || null,
          outletName: employee.outletName || null,
        });

        if (employee.role === "super_admin") {
          router.push("/super-admin/dashboard");
        } else if (employee.role === "outlet_admin") {
          router.push("/outlet-admin/dashboard");
        } else if (employee.role === "worker") {
          router.push("/worker-dashboard");
        } else if (employee.role === "driver") {
          router.push("/driver-dashboard");
        } else {
          router.push("/dashboard");
        }

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
