"use client";

import Image from "next/image";
import Link from "next/link";
import { FiMail } from "react-icons/fi"; 
import Logo from "../../../../../public/logo-Photoroom.png"; 
import { useForgotPassword } from "@/features/forgot-password/hooks/useForgotPassword";
import SubmitButton from "@/components/button";
import BackLink from "@/components/backLink";
import useVerifyPassword from "@/features/profile-customer/hooks/useVerifyPassword";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import PageError from "@/components/pageError";
import ErrorMessage from "@/components/errorMessage";


export default function ForgotPasswordPage() {
  const {formik, isLoading} = useVerifyPassword()
  const [show, setShow] = useState(false)

  return (
    <div className="mt-8 min-h-screen bg-[#FDFCFB] flex flex-col justify-center items-center p-6">
      <div className="absolute top-25 left-8 ">
        <BackLink link="/profile" page="Profile" />
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
            Change Passoword
          </h1>
          <p className="text-sm text-[#6B6662] max-w-xs mx-auto">
            Enter your old password below. Make sure it matches your current
            password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* password Input Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[#2C2826]"
            >
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#FF6B4A]">
                <Lock className="w-5 h-5 transition-colors" />
              </div>
              <input
                id="password"
                name="password"
                type={show ? "password" : "text"}
                placeholder="your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`w-full pl-11 pr-4 py-3.5 border rounded-xl text-black text-sm transition-all focus:outline-none focus:ring-2 
                  ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-400 focus:ring-red-100"
                      : "border-[#E5DDD3] focus:border-[#FF6B4A] focus:ring-[#FFF0ED]"
                  }`}
              />
              <button
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF6B4A]"
              >
                {!show ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
            {/* Error Message */}
            {formik.touched.password && formik.errors.password && (
              <ErrorMessage
              error={formik.errors.password}
              />
            )}
          </div>

          {/* Submit Button */}
          <SubmitButton
            isLoading={isLoading}
            isValid={formik.isValid}
            ctaLoading="Sending Link..."
            cta="Send Change Password"
          />
        </form>
      </div>
    </div>
  );
}
