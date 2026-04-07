"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { useAccountActivation } from "@/features/auth-customer/activation-account/hooks/useAccountActivation";
import RightPanelInformation from "../../components/rightPaneInformation";
import SubmitButton from "@/components/button";
import BackLink from "@/components/backLink";

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

export default function ActivationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const defaultTab =
    searchParams.get("tab") === "register" ? "register" : "login";
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);

  const { formik, isLoading } = useAccountActivation();

  return (
    <div className="min-h-screen flex bg-[#FAF6F1]">
      {/* LEFT PANEL */}
      <RightPanelInformation />

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12">
        {/* BACK */}
        <div className="w-full max-w-md mb-6">
          <BackLink link="/" page="Home" />
        </div>

        <div className="w-full max-w-md">
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#6B6662] font-medium">
                Password
              </label>

              <div className="relative">
                <Lock style={iconStyle} />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  placeholder="Min. 8 characters"
                  style={{
                    ...inputStyle(false),
                    paddingRight: "44px",
                  }}
                  onChange={formik.handleChange}
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
                    {formik.errors.password}
                  </p>
                </div>
              ) : null}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#6B6662] font-medium">
                Confirm Password
              </label>

              <div className="relative">
                <Lock style={iconStyle} />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onBlur={formik.handleBlur}
                  placeholder="Re-enter password"
                  style={{
                    ...inputStyle(false),
                    paddingRight: "44px",
                  }}
                  onChange={formik.handleChange}
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF6B4A]"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <SubmitButton
              isLoading={isLoading}
              isValid={formik.isValid}
              ctaLoading="Creating account..."
              cta="Create Account"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
