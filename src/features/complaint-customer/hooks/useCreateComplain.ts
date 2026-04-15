import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { createComplainApi } from "../api/createComplaint.api";
import { useRouter } from "next/navigation";
import { createComplaintSchema } from "../validation/createComplaintSchema";

export function useCreateComplains(orderId: string) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      orderId: orderId,
      description: "",
    }, validationSchema: createComplaintSchema,
    onSubmit: async (value) => {
      try {
        setIsLoading(true);

        await createComplainApi(value);

        toast.success("Complaint already created");

        router.push("/order-history/complaint-success");
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return { formik, isLoading };
}
