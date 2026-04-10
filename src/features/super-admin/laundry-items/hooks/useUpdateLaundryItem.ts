import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { getLaundryItemByIdApi } from "../api/getLaundryItemById.api";
import { updateLaundryItemApi } from "../api/updateLaundryItem.api";
import { LaundryItemSchema } from "../validation/laundryItemSchema";

export default function useUpdateLaundryItem(id: string, redirectPath: string = "/super-admin/laundry-items") {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      pricingType: "kiloan" as "kiloan" | "per_item",
      price: 0,
    },
    validationSchema: LaundryItemSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await updateLaundryItemApi(id, {
          ...values,
          price: values.pricingType === "kiloan" ? 0 : values.price,
        });
        toast.success("Laundry item updated successfully");
        router.push(redirectPath);
        router.refresh();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to update laundry item");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const fetchItem = useCallback(async () => {
    try {
      setIsFetching(true);
      const res = await getLaundryItemByIdApi(id);
      if (res.success) {
        formik.setValues({
          name: res.data.name,
          pricingType: res.data.pricingType,
          price: Number(res.data.price),
        });
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch laundry item");
      router.push(redirectPath);
    } finally {
      setIsFetching(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

  return { formik, isLoading, isFetching };
}
