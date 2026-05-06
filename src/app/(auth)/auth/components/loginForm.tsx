"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useFormik } from "formik";
import axiosInstance from "@/utils/axiosInstance";
import { ApiResponse } from "@/types/api";
import toast from "react-hot-toast";
import useAuthStore from "@/stores/useAuthStore";
import { authLoginSchema } from "@/features/auth-customer/login/validation/loginSchema";
import Link from "next/link";
import SocialButton from "./sosialButton";
import { useFormLogin } from "@/features/auth-customer/login/hooks/useFormLogin";
import SubmitButton from "@/components/button";
import ErrorMessage from "@/components/errorMessage";

const inputStyle = (hasError: boolean) => ({
  backgroundColor: "#ffffff",
  border: `1px solid ${hasError ? "#ef4444" : "#E5DDD3"}`,
  borderRadius: "10px",
  color: "#2C2826",
  outline: "none",
  width: "100%",
  padding: "10px 12px 10px 44px",
  fontSize: "14px",
  transition: "border-color 0.2s",
});

const iconStyle = {
  position: "absolute" as const,
  left: "14px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#FF6B4A",
  width: "17px",
  height: "17px",
  pointerEvents: "none" as const,
};

export default function login() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(true);
  const { formik, isLoading } = useFormLogin();

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-[#6B6662] font-medium">
          Email Address
        </label>

        <div className="relative">
          <Mail style={iconStyle} />

          <input
            type="email"
            placeholder="you@example.com"
            style={inputStyle(false)}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.email && formik.errors.email ? (
          <div className="flex items-center gap-1 mt-1 animate-fadeIn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-xs font-medium text-red-500">
              {formik.errors.email}
            </p>
          </div>
        ) : null}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <label className="text-sm text-[#6B6662] font-medium">Password</label>

          <Link
            href="/auth/forgot-password"
            className="text-xs text-[#FF6B4A] hover:text-[#FF5533]"
          >
            Forgot password?
          </Link>
        </div>

        <div className="relative">
          <Lock style={iconStyle} />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="••••••••"
            style={{
              ...inputStyle(false),
              paddingRight: "44px",
            }}
          />

          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF6B4A]"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </button>
        </div>

        {formik.touched.password && formik.errors.password ? (
          <ErrorMessage error={formik.errors.password} />
        ) : null}
      </div>

      <SubmitButton
        isLoading={isLoading}
        isValid={formik.isValid}
        ctaLoading="Checking account..."
        cta="Sign In"
      />

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#E5DDD3]" />
        <span className="text-xs text-[#6B6662]">or continue with</span>
        <div className="flex-1 h-px bg-[#E5DDD3]" />
      </div>

      {/* Social Buttons */}
      <SocialButton />

      <p className="text-center text-sm text-[#6B6662]">
        Don't have an account?{" "}
        <button
          onClick={() => router.push("/auth?tab=register")}
          type="button"
          className="text-[#FF6B4A] font-semibold hover:text-[#FF5533]"
        >
          Sign up free
        </button>
      </p>
    </form>
  );
}
