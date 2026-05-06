import { AddressCustomerDTO } from "@/types/addressCustomer";
import { useState, useEffect } from "react";
import { useLocationAddress } from "./useLocationAddress";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updateAddressApi } from "../api/updateAddress.api";
import { addressValidationSchema } from "../validation/adressCustomerSchema";

interface UpdateCustomerProps {
}

export function useUpdateAddress(value: AddressCustomerDTO,
  onClose: (value:boolean) => void,
getAddress: any) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const { provinces, cities, districts, fetchCities, fetchDistricts } =
    useLocationAddress(
      value.provinceId ? String(value.provinceId) : "",
      value.cityId ? String(value.cityId) : "",
    );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: value.id,
      recipientName: value.recipientName,
      recipientPhoneNumber: value.recipientPhoneNumber,
      label: value.label || "", // Bisa kasih default "home"
      address: value.address,
      provinceId: value.provinceId,
      provinceName: value.provinceName,
      cityId: value.cityId,
      cityName: value.cityName,
      districtId: value.districtId,
      districtName: value.districtName,
      postalCode: value.postalCode,
      notes: value.notes,
      latitude: value.latitude,
      longitude: value.longitude,
      isPrimary: value.isPrimary,
    },
    validationSchema: addressValidationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        await updateAddressApi(values.id, values);

        toast.success("Address updated");

        router.push("/address");

        onClose(false)

        getAddress()
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return {
    formik,
    isLoading,
    provinces,
    cities,
    districts,
    fetchCities,
    fetchDistricts,
  };
}
