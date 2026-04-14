"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/useAuthStore";

const withAuth = (WrappedComponent: React.ComponentType<any>, allowedRoles: string[]) => {
  return function ProtectedRoute(props: any) {
    const router = useRouter();
    const { token, role } = useAuthStore();
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
      if (!token) {
        router.replace("/auth/auth");
        return;
      }

      if (allowedRoles.length > 0 && role && !allowedRoles.includes(role)) {
        // Redirect to unauthorized or home based on role
        if (role === "admin") {
          router.replace("/admin-dashboard");
        } else if (role === "worker") {
          router.replace("/worker-dashboard");
        } else if (role === "driver") {
          router.replace("/driver-dashboard");
        } else {
          router.replace("/");
        }
        return;
      }

      setIsVerified(true);
    }, [token, role, router]);

    if (!isVerified) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF6F1]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B4A]"></div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
