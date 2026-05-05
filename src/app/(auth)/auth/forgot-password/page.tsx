"use client";

import Image from "next/image";
import Link from "next/link";
import { FiMail } from "react-icons/fi";
import Logo from "../../../../../public/logo-Photoroom.png";
import { useForgotPassword } from "@/features/auth-customer/forgot-password/hooks/useForgotPassword";
import SubmitButton from "@/components/button";
import BackLink from "@/components/backLink";

export default function ForgotPasswordPage() {
  const { formik, isLoading } = useForgotPassword();

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col justify-center items-center p-6">
      <div className="absolute top-8 left-8 ">
        <BackLink link="/auth" page="Login" />
      </div>

      {/* Card Container */}
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-[#E5DDD3]">
        {/* Logo & Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <Image
              src={Logo}
              alt="DILAUNDRYIN Logo"
              className="w-16 h-auto"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-[#2C2826] mb-2">
            Forgot Password?
          </h1>
          <p className="text-sm text-[#6B6662] max-w-xs mx-auto">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Email Input Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[#2C2826]"
            >
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#FF6B4A]">
                <FiMail className="w-5 h-5 transition-colors" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="yourname@email.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`w-full pl-11 pr-4 py-3.5 border rounded-xl text-black text-sm transition-all focus:outline-none focus:ring-2 
                  ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-400 focus:ring-red-100"
                      : "border-[#E5DDD3] focus:border-[#FF6B4A] focus:ring-[#FFF0ED]"
                  }`}
              />
            </div>
            {/* Error Message */}
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-red-500 pt-1 pl-1">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <SubmitButton
            isLoading={isLoading}
            isValid={formik.isValid}
            ctaLoading="Sending Link..."
            cta="Send Reset Link"
          />
        </form>

        {/* Footer Link */}
        <div className="text-center mt-10 border-t border-gray-100 pt-6">
          <p className="text-sm text-[#6B6662]">
            Remember your password?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-[#FF6B4A] hover:text-[#FF5533] hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
