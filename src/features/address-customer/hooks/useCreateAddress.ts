import { AddressCustomerDTO } from "@/types/addressCustomer";
import { useFormik } from "formik";
import { use, useState } from "react";
import { toast } from "react-hot-toast";
import { createAddressApi } from "../api/createAddress.api";
import { addressValidationSchema } from "../validation/adressCustomerSchema";
import { useLocationAddress } from "./useLocationAddress";
import { useRouter } from "next/navigation";

interface FormAddressProps {
  setShowAddForm: (value: boolean) => void;
  onSuccess: () => void;
}

export function useCreateAdress({
  setShowAddForm,
  onSuccess,
}: FormAddressProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { provinces, cities, districts, fetchCities, fetchDistricts } =
    useLocationAddress("", "");

  const formik = useFormik({
    initialValues: {
      recipientName: "",
      recipientPhoneNumber: "",
      label: "", // Bisa kasih default "home"
      address: "",
      provinceId: 0,
      provinceName: "",
      cityId: 0,
      cityName: "",
      districtId: 0,
      districtName: "",
      postalCode: "",
      notes: "",
      latitude: 0,
      longitude: 0,
      isPrimary: false,
    },
    validationSchema: addressValidationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        await createAddressApi(values);

        toast.success("Address added");

        setShowAddForm(false);

        onSuccess();
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
