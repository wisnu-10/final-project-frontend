"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Shield, Building2, Users, Truck, Shirt } from "lucide-react";
import { useFormLoginEmployee } from "@/features/login/hooks/useFormLoginEmployee";
import SubmitButton from "@/components/button";
import ErrorMessage from "@/components/errorMessage";
import Image from "next/image";
import Logo from "../../../../public/logo-Photoroom.png";
import Link from "next/link";

const inputStyle = (hasError: boolean) => ({
  backgroundColor: "#ffffff",
  border: `1px solid ${hasError ? "#ef4444" : "#E2E8F0"}`,
  borderRadius: "10px",
  color: "#1E293B",
  outline: "none",
  width: "100%",
  padding: "12px 14px 12px 46px",
  fontSize: "14px",
  transition: "border-color 0.2s, box-shadow 0.2s",
});

const iconStyle = {
  position: "absolute" as const,
  left: "14px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#3B82F6",
  width: "17px",
  height: "17px",
  pointerEvents: "none" as const,
};

const features = [
  {
    icon: Building2,
    title: "Outlet Management",
    desc: "Manage orders across all outlets",
  },
  {
    icon: Users,
    title: "Team Coordination",
    desc: "Efficient staff scheduling & tracking",
  },
  {
    icon: Truck,
    title: "Delivery Operations",
    desc: "Real-time pickup & delivery tracking",
  },
  {
    icon: Shirt,
    title: "Order Processing",
    desc: "End-to-end laundry workflow",
  },
];

export default function EmployeeAuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { formik, isLoading } = useFormLoginEmployee();

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* LEFT PANEL - Information */}
      <div className="hidden lg:flex lg:w-5/12 flex-col justify-between p-12 relative overflow-hidden bg-linear-to-br from-[#1E3A5F] via-[#1E40AF] to-[#3B82F6]">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-10%] right-[-10%] w-72 h-72 rounded-full bg-white" />
          <div className="absolute bottom-[-5%] left-[-5%] w-96 h-96 rounded-full bg-white" />
          <div className="absolute top-[40%] left-[20%] w-32 h-32 rounded-full bg-white" />
        </div>

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-14">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Image src={Logo} alt="Logo diLaundryin" className="w-8 h-auto" />
            </div>
            <div>
              <span className="text-xl font-bold text-white">diLaundryin</span>
              <span className="block text-xs text-blue-200 font-medium tracking-wide">
                Employee Portal
              </span>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-3 leading-tight">
            Staff <span className="text-blue-200">Dashboard</span>
          </h2>

          <p className="text-blue-100/80 mb-12 leading-relaxed text-sm">
            Access your workspace to manage operations, process orders, and
            coordinate with your team efficiently.
          </p>

          {/* Feature cards */}
          <div className="flex flex-col gap-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                  <feature.icon className="w-5 h-5 text-blue-200" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {feature.title}
                  </p>
                  <p className="text-xs text-blue-200/70 mt-0.5">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom info */}
        <div className="relative z-10 mt-8 p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-blue-400/30">
              <Shield className="w-4 h-4 text-blue-200" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Secure Access
              </p>
              <p className="text-xs text-blue-200/70">
                Enterprise-grade security
              </p>
            </div>
          </div>
          <p className="text-xs text-blue-200/60 leading-relaxed">
            Your credentials are protected with industry-standard encryption.
            Contact your admin if you need access support.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-3 mb-10">
          <Image src={Logo} alt="Logo diLaundryin" className="w-9 h-auto" />
          <div>
            <span className="text-xl font-bold text-[#1E293B]">
              diLaundryin
            </span>
            <span className="block text-xs text-blue-500 font-medium">
              Employee Portal
            </span>
          </div>
        </div>

        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium mb-4">
              <Shield className="w-3.5 h-3.5" />
              Employee Access Only
            </div>
            <h1 className="text-2xl font-bold text-[#1E293B] mb-2">
              Welcome back
            </h1>
            <p className="text-sm text-[#64748B]">
              Sign in to your employee dashboard to get started
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-5"
          >
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#475569] font-medium">
                Work Email
              </label>
              <div className="relative">
                <Mail style={iconStyle} />
                <input
                  id="employee-email"
                  type="email"
                  placeholder="name@dilaundryin.com"
                  style={inputStyle(
                    !!(formik.touched.email && formik.errors.email),
                  )}
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <ErrorMessage error={formik.errors.email} />
              ) : null}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#475569] font-medium">
                Password
              </label>
              <div className="relative">
                <Lock style={iconStyle} />
                <input
                  id="employee-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="••••••••"
                  style={{
                    ...inputStyle(
                      !!(formik.touched.password && formik.errors.password),
                    ),
                    paddingRight: "44px",
                  }}
                  className="focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#3B82F6] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <ErrorMessage error={formik.errors.password} />
              ) : null}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || !formik.isValid}
              id="employee-login-submit"
              className="w-full flex items-center justify-center gap-3 py-3 bg-linear-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-xl font-semibold hover:from-[#1D4ED8] hover:to-[#2563EB] active:scale-[0.98] transition-all disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg focus:ring-4 focus:ring-blue-100 hover:scale-[1.01]"
            >
              {isLoading ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 mt-8">
            <div className="flex-1 h-px bg-[#E2E8F0]" />
            <span className="text-xs text-[#94A3B8]">
              Need help?
            </span>
            <div className="flex-1 h-px bg-[#E2E8F0]" />
          </div>

          {/* Help text */}
          <p className="text-center text-sm text-[#64748B] mt-4">
            Forgot your password? Contact your{" "}
            <span className="text-[#3B82F6] font-medium">
              outlet administrator
            </span>{" "}
            to reset it.
          </p>

          {/* Customer login link */}
          <div className="mt-6 p-4 rounded-xl bg-[#F1F5F9] border border-[#E2E8F0] text-center">
            <p className="text-sm text-[#64748B]">
              Are you a customer?{" "}
              <Link
                href="/auth"
                className="text-[#FF6B4A] font-semibold hover:text-[#FF5533] transition-colors"
              >
                Sign in here →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
