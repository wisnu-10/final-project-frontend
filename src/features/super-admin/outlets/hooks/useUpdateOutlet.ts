import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { updateOutletApi } from "../api/updateOutlet.api";
import { getOutletByIdApi } from "../api/getOutletById.api";
import { OutletSchema } from "../validation/outletSchema";

export default function useUpdateOutlet(id: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      provinceId: 11,
      provinceName: "ACEH",
      cityId: 1101,
      cityName: "KABUPATEN SIMEULUE",
      districtId: 1101010,
      districtName: "TEUPAH SELATAN",
      postalCode: "",
      maxServiceDistance: 10,
      isActive: true,
      pricePerKg: 0,
    },
    validationSchema: OutletSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await updateOutletApi(id, values);
        toast.success("Outlet updated successfully");
        router.push("/super-admin/outlets");
        router.refresh();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to update outlet");
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (id) {
      getOutletByIdApi(id)
        .then((res) => {
          if (res.success && res.data) {
            formik.setValues({
              name: res.data.name || "",
              address: res.data.address || "",
              provinceId: res.data.provinceId || 11,
              provinceName: res.data.provinceName || "ACEH",
              cityId: res.data.cityId || 1101,
              cityName: res.data.cityName || "KABUPATEN SIMEULUE",
              districtId: res.data.districtId || 1101010,
              districtName: res.data.districtName || "TEUPAH SELATAN",
              postalCode: res.data.postalCode || "",
              maxServiceDistance: res.data.maxServiceDistance || 10,
              isActive: res.data.isActive ?? true,
              pricePerKg: res.data.pricePerKg || 0,
            });
          }
          setFetching(false);
        })
        .catch(() => {
          toast.error("Failed to load outlet details");
          setFetching(false);
        });
    }
  }, [id]);

  return { formik, isLoading, fetching };
}
