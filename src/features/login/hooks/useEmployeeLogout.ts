import { logoutEmployeeApi } from "../api/login-employee.api";
import useEmployeeStore from "@/stores/useEmployeeStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

export function useEmployeeLogout() {
  const router = useRouter();
  const { clearEmployee } = useEmployeeStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutEmployeeApi();
      clearEmployee();
      router.push("/auth-employee");
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to logout");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return { handleLogout, isLoggingOut };
}
