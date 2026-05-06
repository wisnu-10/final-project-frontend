"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import useUpdateLaundryItem from "@/features/super-admin/laundry-items/hooks/useUpdateLaundryItem";
import { useLaundryItemStore } from "@/stores/useLaundryItemStore";

export default function EditLaundryItemPage() {
  const router = useRouter();
  const { selectedLaundryItemId } = useLaundryItemStore();
  
  const id = selectedLaundryItemId as string;
  const { formik, isLoading, isFetching } = useUpdateLaundryItem(id, "/super-admin/laundry-items");

  useEffect(() => {
    if (!id) {
      router.push("/super-admin/laundry-items");
    }
  }, [id, router]);

  if (!id || isFetching) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
          Loading laundry item...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/super-admin/laundry-items"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiArrowLeft className="text-xl text-gray-600" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Edit Laundry Item</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Name
            </label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] focus:border-transparent outline-none transition-all"
              placeholder="e.g. Selimut, Jas, Baju"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pricing Type
            </label>
            <div className="flex gap-4">
              <label
                className={`flex-1 flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  formik.values.pricingType === "kiloan"
                    ? "border-[#ff7143] bg-[#fff5f2]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="pricingType"
                  value="kiloan"
                  checked={formik.values.pricingType === "kiloan"}
                  onChange={() => {
                    formik.setFieldValue("pricingType", "kiloan");
                    formik.setFieldValue("price", 0);
                  }}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formik.values.pricingType === "kiloan"
                      ? "border-[#ff7143]"
                      : "border-gray-300"
                  }`}
                >
                  {formik.values.pricingType === "kiloan" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff7143]" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-800">Kiloan</div>
                  <div className="text-xs text-gray-500">Harga dihitung per kg</div>
                </div>
              </label>

              <label
                className={`flex-1 flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  formik.values.pricingType === "per_item"
                    ? "border-[#ff7143] bg-[#fff5f2]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="pricingType"
                  value="per_item"
                  checked={formik.values.pricingType === "per_item"}
                  onChange={() => formik.setFieldValue("pricingType", "per_item")}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formik.values.pricingType === "per_item"
                      ? "border-[#ff7143]"
                      : "border-gray-300"
                  }`}
                >
                  {formik.values.pricingType === "per_item" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff7143]" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-800">Per Item</div>
                  <div className="text-xs text-gray-500">Harga per satuan</div>
                </div>
              </label>
            </div>
            {formik.touched.pricingType && formik.errors.pricingType && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.pricingType}</div>
            )}
          </div>

          {formik.values.pricingType === "per_item" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price per Item (Rp)
              </label>
              <input
                type="number"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                min={0}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] focus:border-transparent outline-none transition-all"
                placeholder="e.g. 15000"
              />
              {formik.touched.price && formik.errors.price && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.price}</div>
              )}
            </div>
          )}

          {formik.values.pricingType === "kiloan" && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
              <p className="text-sm text-emerald-700">
                💡 Item dengan tipe <strong>Kiloan</strong> akan otomatis mengikuti harga 
                per kilogram yang telah diatur pada masing-masing <strong>Management Outlet</strong>.
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Link
              href="/super-admin/laundry-items"
              className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-xl transition-colors shrink-0"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-[#ff7143] hover:bg-[#e05e32] text-white font-medium rounded-xl transition-colors shrink-0 flex items-center justify-center min-w-[120px]"
            >
              {isLoading ? "Updating..." : "Update Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
