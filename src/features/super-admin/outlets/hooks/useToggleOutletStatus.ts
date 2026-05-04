import { useState } from "react";
import toast from "react-hot-toast";
import { updateOutletApi } from "../api/updateOutlet.api";

export default function useToggleOutletStatus(onSuccess?: () => void) {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      setIsLoading(id);
      await updateOutletApi(id, { isActive: !currentStatus });
      toast.success(`Outlet ${!currentStatus ? "activated" : "deactivated"} successfully`);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update outlet status");
    } finally {
      setIsLoading(null);
    }
  };

  return { toggleStatus, isLoading };
}
