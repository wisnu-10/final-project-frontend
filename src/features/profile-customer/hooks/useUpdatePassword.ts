import { authActivationSchema } from "@/features/auth-customer/activation-account/validation/accountActivationSchema";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { UpdatePasswordApi } from "../api/updatePassword.api";
import { updatePasswordSchema } from "../validation/updatePassowordSchema.validation";

export default function useUpdatePassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: updatePasswordSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        if (values.newPassword !== values.confirmPassword) {
          toast.error("New password and confirm new password must match");
          return;
        }

        await UpdatePasswordApi(values.oldPassword, values.newPassword);

        toast.success("Password updated successfully!");

        router.push("/profile");
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return { formik, isLoading };
}
