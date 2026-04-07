import { useState } from "react";
import toast from "react-hot-toast";
import { verifyPasswordApi } from "../api/verifyPassword.api";
import { useFormik } from "formik";
import { accountActivationApi } from "@/features/auth-customer/activation-account/api/accountActivation.api";
import { authActivationSchema } from "@/features/auth-customer/activation-account/validation/accountActivationSchema";
import { useRouter } from "next/navigation";

export default function useVerifyPassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: authActivationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        const res = await verifyPasswordApi(values.password);

        toast.success("Password verified! Let's set your new password. 🔒");

        router.push("/profile/update-password");
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
  });
  return { formik, isLoading };
}
