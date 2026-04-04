import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useDeleteAddress() {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteAddress = async (id: string) => {
    try {
      setIsDeleting(true);

      await axiosInstance.patch(`/address/delete/${id}`);

      toast.success("Deleting is successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  return {deleteAddress, isDeleting}
}
