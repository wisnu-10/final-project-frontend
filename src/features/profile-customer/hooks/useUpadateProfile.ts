"use client"

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateProfileApi } from "../api/updateProfile.api";
import { updateProfileSchema } from "../validation/updateProfileSchema.validation";
import { ProfileUpdateDTO } from "@/types/profileCustomer.dto";

export function useUpdateProfile(value: ProfileUpdateDTO, onSuccess: () => void) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: value?.firstName || "",
      lastName: value?.lastName || "",
      phoneNumber: value?.phoneNumber || "",
      image: null as File | null,
    },
    validationSchema: updateProfileSchema,
    onSubmit: async (values) => {
      try {
        setIsUpdating(true);

        const fd = new FormData()
        fd.append("firstName", values.firstName)
        fd.append("lastName", values.lastName)
        fd.append("phoneNumber", values.phoneNumber);
        if (values.image) {
          fd.append("image", values.image);
        }

        await updateProfileApi(fd);

        toast.success("Profile updated");

        setIsEditMode(false)

        onSuccess();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setIsUpdating(false);
      }
    },
  });

  return { formik, isUpdating, isEditMode, setIsEditMode };
}
