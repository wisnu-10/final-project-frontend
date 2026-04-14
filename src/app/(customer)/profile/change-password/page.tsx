"use client";

import Image from "next/image";
import Link from "next/link";
import { FiMail } from "react-icons/fi";
import Logo from "../../../../../public/logo-Photoroom.png";
import { useForgotPassword } from "@/features/auth-customer/forgot-password/hooks/useForgotPassword";
import SubmitButton from "@/components/button";
import BackLink from "@/components/backLink";
import useVerifyPassword from "@/features/profile-customer/hooks/useVerifyPassword";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import PageError from "@/components/pageError";
import ErrorMessage from "@/components/errorMessage";
import useUpdatePassword from "@/features/profile-customer/hooks/useUpdatePassword";

export default function ForgotPasswordPage() {
  const { formik, isLoading } = useUpdatePassword();
  const [oldPasswordShow, setOldPasswordShow] = useState(false);
  const [show, setShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);

  return (
    <div className="pt-25 min-h-screen bg-[#FDFCFB] flex flex-col justify-center items-center p-6">
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
            Change Passowod
          </h1>
          <p className="text-sm text-[#6B6662] max-w-xs mx-auto">
            To ensure your account's security, please enter your current
            password first. Make sure it matches your existing password before
            proceeding to create a new one.
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
              Old Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#FF6B4A]">
                <Lock className="w-5 h-5 transition-colors" />
              </div>
              <input
                id="oldPassword"
                name="oldPassword"
                type={oldPasswordShow ? "password" : "text"}
                placeholder="your old password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.oldPassword}
                className={`w-full pl-11 pr-4 py-3.5 border rounded-xl text-black text-sm transition-all focus:outline-none focus:ring-2 
                  ${
                    formik.touched.oldPassword && formik.errors.oldPassword
                      ? "border-red-400 focus:ring-red-100"
                      : "border-[#E5DDD3] focus:border-[#FF6B4A] focus:ring-[#FFF0ED]"
                  }`}
              />
              <button
                type="button"
                onClick={() => setOldPasswordShow(!oldPasswordShow)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF6B4A]"
              >
                {!oldPasswordShow ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
            {/* Error Message */}
            {formik.touched.oldPassword && formik.errors.oldPassword && (
              <ErrorMessage error={formik.errors.oldPassword} />
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[#2C2826]"
            >
              New Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#FF6B4A]">
                <Lock className="w-5 h-5 transition-colors" />
              </div>
              <input
                id="newPassword"
                name="newPassword"
                type={show ? "password" : "text"}
                placeholder="your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                className={`w-full pl-11 pr-4 py-3.5 border rounded-xl text-black text-sm transition-all focus:outline-none focus:ring-2 
                  ${
                    formik.touched.newPassword && formik.errors.newPassword
                      ? "border-red-400 focus:ring-red-100"
                      : "border-[#E5DDD3] focus:border-[#FF6B4A] focus:ring-[#FFF0ED]"
                  }`}
              />
              <button
                type="button"
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
            {formik.touched.newPassword && formik.errors.newPassword && (
              <ErrorMessage error={formik.errors.newPassword} />
            )}
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[#2C2826]"
            >
              Confirm New Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#FF6B4A]">
                <Lock className="w-5 h-5 transition-colors" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={confirmShow ? "password" : "text"}
                placeholder="confirm your new password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className={`w-full pl-11 pr-4 py-3.5 border rounded-xl text-black text-sm transition-all focus:outline-none focus:ring-2 
                  ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "border-red-400 focus:ring-red-100"
                      : "border-[#E5DDD3] focus:border-[#FF6B4A] focus:ring-[#FFF0ED]"
                  }`}
              />
              <button
                type="button"
                onClick={() => setConfirmShow(!confirmShow)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF6B4A]"
              >
                {!confirmShow ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
            {/* Error Message */}
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <ErrorMessage error={formik.errors.confirmPassword} />
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
