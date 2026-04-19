import { logoutEmployeeApi } from "../api/login-employee.api";
import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

export function useEmployeeLogout() {
  const router = useRouter();
  const { clearAuth } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutEmployeeApi();
      clearAuth();
      router.push("/auth/employee");
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to logout");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return { handleLogout, isLoggingOut };
}
