"use client";

import { ComponentType, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/useAuthStore";
import { FiLock, FiLoader } from "react-icons/fi";
import BackLink from "@/components/backLink";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";
import { ApiResponse } from "@/types/api";

export default function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  allowedRoles: string[],
  redirectPath: string = "/auth"
) {
  return function AuthGuardComponent(props: P) {
    const { user, setAuth, clearAuth } = useAuthStore();
    const [isChecking, setIsChecking] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const res = await axiosInstance<ApiResponse<any>>("/auth/session");
          setAuth(res.data.data);
        } catch (error: any) {
          clearAuth();
          toast.error("Please login first");
          router.push(redirectPath);
        } finally {
          setIsChecking(false);
        }
      };

      checkAuth();
    }, [router, setAuth, clearAuth, redirectPath]);

    if (isChecking) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
          <FiLoader className="w-10 h-10 text-[#FF6B4A] animate-spin mb-4" />
          <p className="text-[#6B6662] font-medium">Verifying Session...</p>
        </div>
      );
    }

    if (!user) {
      return null;
    }

    const isAuthorized = allowedRoles.includes(user.role);

    if (!isAuthorized) {
      return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-center bg-[#FFF8F6]">
          <div className="w-24 h-24 bg-[#FFF0ED] rounded-full flex items-center justify-center mb-8 shadow-inner">
            <FiLock className="w-12 h-12 text-[#FF6B4A]" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#2C2826] mb-3 tracking-tight">
            Restricted Access 🔐
          </h1>
          <p className="text-[#6B6662] mb-10 max-w-sm leading-relaxed text-sm">
            This page can only be opened by{" "}
            <span className="font-bold text-[#FF6B4A] uppercase bg-[#FFF0ED] px-2 py-0.5 rounded-md text-xs">
              {allowedRoles.join(" or ")}
            </span>
            .
          </p>
          <BackLink link="/" page="Home" />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}
