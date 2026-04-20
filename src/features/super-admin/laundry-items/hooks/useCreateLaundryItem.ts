import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { createLaundryItemApi } from "../api/createLaundryItem.api";
import { LaundryItemSchema } from "../validation/laundryItemSchema";

export default function useCreateLaundryItem(redirectPath: string = "/super-admin/laundry-items") {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      pricingType: "kiloan" as "kiloan" | "per_item",
      price: 0,
    },
    validationSchema: LaundryItemSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await createLaundryItemApi({
          ...values,
          price: values.pricingType === "kiloan" ? 0 : values.price,
        });
        toast.success("Laundry item created successfully");
        router.push(redirectPath);
        router.refresh();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to create laundry item");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return { formik, isLoading };
}
