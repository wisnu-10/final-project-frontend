"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { shiftApi } from "@/features/super-admin/shifts/api/shift.api";
import { shiftSchema } from "@/features/super-admin/shifts/validation/shiftSchema";
import toast from "react-hot-toast";
import { FiArrowLeft, FiSave, FiClock } from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";

export default function CreateShiftPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      shiftName: "",
      startTime: "",
      endTime: "",
    },
    validationSchema: shiftSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const res = await shiftApi.createShift(values);
        if (res.success) {
          toast.success(res.message || "Shift created successfully");
          router.push("/super-admin/shifts");
          router.refresh();
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to create shift");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/super-admin/shifts"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
        >
          <FiArrowLeft className="text-xl" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Create New Shift</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shift Name
            </label>
            <input
              type="text"
              name="shiftName"
              placeholder="e.g. Morning Shift"
              value={formik.values.shiftName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-3 border rounded-xl outline-none transition-all ${
                formik.touched.shiftName && formik.errors.shiftName
                  ? "border-red-500 focus:ring-2 focus:ring-red-50"
                  : "border-gray-200 focus:ring-2 focus:ring-[#ff7143] focus:border-transparent"
              }`}
            />
            {formik.touched.shiftName && formik.errors.shiftName && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.shiftName}</div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time (HH:mm)
              </label>
              <div className="relative">
                <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="startTime"
                  placeholder="08:00"
                  value={formik.values.startTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl outline-none transition-all ${
                    formik.touched.startTime && formik.errors.startTime
                      ? "border-red-500 focus:ring-2 focus:ring-red-50"
                      : "border-gray-200 focus:ring-2 focus:ring-[#ff7143] focus:border-transparent"
                  }`}
                />
              </div>
              {formik.touched.startTime && formik.errors.startTime && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.startTime}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time (HH:mm)
              </label>
              <div className="relative">
                <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="endTime"
                  placeholder="17:00"
                  value={formik.values.endTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl outline-none transition-all ${
                    formik.touched.endTime && formik.errors.endTime
                      ? "border-red-500 focus:ring-2 focus:ring-red-50"
                      : "border-gray-200 focus:ring-2 focus:ring-[#ff7143] focus:border-transparent"
                  }`}
                />
              </div>
              {formik.touched.endTime && formik.errors.endTime && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.endTime}</div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Link
              href="/super-admin/shifts"
              className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-xl transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-[#ff7143] hover:bg-[#e05e32] text-white font-bold rounded-xl transition-all flex items-center justify-center min-w-[140px] gap-2 shadow-md disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FiSave />
              )}
              Create Shift
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
