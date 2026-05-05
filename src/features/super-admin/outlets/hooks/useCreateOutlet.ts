import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { createOutletApi } from "../api/createOutlet.api";
import { OutletSchema } from "../validation/outletSchema";

export default function useCreateOutlet() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      provinceId: 0,
      provinceName: "",
      cityId: 0,
      cityName: "",
      districtId: 0,
      districtName: "",
      postalCode: "",
      maxServiceDistance: 5,
      isActive: true,
      pricePerKg: 0,
      latitude: -6.200000,
      longitude: 106.816666,
    },
    validationSchema: OutletSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await createOutletApi(values);
        toast.success("Outlet created successfully");
        router.push("/super-admin/outlets");
        router.refresh();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to create outlet");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return { formik, isLoading };
}
