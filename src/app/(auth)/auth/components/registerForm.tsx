"use client";

import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import SocialButton from "./sosialButton";
import { useFormRegister } from "@/features/register/hooks/useFormRegister";
import SubmitButton from "@/components/button";

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

export default function register() {
  
  const {formik, isLoading} = useFormRegister()

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      {/* Name row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-[#6B6662] font-medium">
            First Name
          </label>

          <div className="relative">
            <User style={iconStyle} />

            <input
              type="text"
              name="firstName"
              placeholder="John"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={inputStyle(false)}
            />
          </div>

          {formik.touched.firstName && formik.errors.firstName ? (
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
                {formik.errors.firstName}
              </p>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-[#6B6662] font-medium">
            Last Name
          </label>

          <div className="relative">
            <User style={iconStyle} />

            <input
              type="text"
              name="lastName"
              placeholder="Doe"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={inputStyle(false)}
            />
          </div>
          {formik.touched.lastName && formik.errors.lastName ? (
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
                {formik.errors.lastName}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-[#6B6662] font-medium">
          Email Address
        </label>

        <div className="relative">
          <Mail style={iconStyle} />

          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={inputStyle(false)}
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

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-[#6B6662] font-medium">
          Phone Number
        </label>

        <div className="relative">
          <Phone style={iconStyle} />

          <input
            type="tel"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="+1 (555) 000-0000"
            style={inputStyle(false)}
          />
        </div>
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
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
              {formik.errors.phoneNumber}
            </p>
          </div>
        ) : null}
      </div>

      {/* Terms */}
      <div className="flex items-start gap-2">
        <input type="checkbox" className="mt-1 w-4 h-4 accent-[#FF6B4A]" />

        <label className="text-xs text-[#6B6662]">
          I agree to the{" "}
          <a href="#" className="text-[#FF6B4A] hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-[#FF6B4A] hover:underline">
            Privacy Policy
          </a>
        </label>
      </div>

      <SubmitButton
        isLoading={isLoading}
        isValid={formik.isValid}
        ctaLoading="Creating account..."
        cta="Create Account"
      />

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#E5DDD3]" />
        <span className="text-xs text-[#6B6662]">or sign up with</span>
        <div className="flex-1 h-px bg-[#E5DDD3]" />
      </div>

      <SocialButton />

      <p className="text-center text-sm text-[#6B6662]">
        Already have an account?{" "}
        <button
          type="button"
          className="text-[#FF6B4A] font-semibold hover:text-[#FF5533]"
        >
          Log in
        </button>
      </p>
    </form>
  );
}
