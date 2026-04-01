import { useFormik } from "formik";
import toast from "react-hot-toast";
import { updateEmailApi } from "../api/updateEmail.api";
import { updateEmailSchema } from "../validation/updateEmailSchema";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useUpdateEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: updateEmailSchema,
    onSubmit: async (values) => {
      try {
        console.log("Submitting form with values:", values);
        setIsLoading(true);

        await updateEmailApi(values.email);

        toast.success("Sent link is success, check your inbox");

        router.push("/profile/verify-email");
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
  });
  return { formik, isLoading };
}
