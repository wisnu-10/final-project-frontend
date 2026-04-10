"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import useCreateOutlet from "@/features/super-admin/outlets/hooks/useCreateOutlet";
import useRegionData from "@/features/super-admin/outlets/hooks/useRegionData";

export default function CreateOutletPage() {
  const { formik, isLoading } = useCreateOutlet();
  const { provinces, cities, districts } = useRegionData(formik.values.provinceId, formik.values.cityId);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/super-admin/outlets"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiArrowLeft className="text-xl text-gray-600" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Create New Outlet</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Outlet Name
              </label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] focus:border-transparent outline-none transition-all"
                placeholder="e.g. Laundryin Pusat"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Address
              </label>
              <textarea
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={3}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] focus:border-transparent outline-none transition-all resize-none"
                placeholder="Complete street address"
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.address}</div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                <select
                  name="provinceId"
                  value={formik.values.provinceId || ""}
                  onChange={(e) => {
                    const id = e.target.value;
                    const name = e.target.options[e.target.selectedIndex].text;
                    formik.setFieldValue("provinceId", id ? Number(id) : 0);
                    formik.setFieldValue("provinceName", id ? name : "");
                    formik.setFieldValue("cityId", 0);
                    formik.setFieldValue("cityName", "");
                    formik.setFieldValue("districtId", 0);
                    formik.setFieldValue("districtName", "");
                  }}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143]"
                >
                  <option value="">Select Province</option>
                  {provinces.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <select
                  name="cityId"
                  value={formik.values.cityId || ""}
                  onChange={(e) => {
                    const id = e.target.value;
                    const name = e.target.options[e.target.selectedIndex].text;
                    formik.setFieldValue("cityId", id ? Number(id) : 0);
                    formik.setFieldValue("cityName", id ? name : "");
                    formik.setFieldValue("districtId", 0);
                    formik.setFieldValue("districtName", "");
                  }}
                  disabled={!formik.values.provinceId}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] disabled:opacity-50"
                >
                  <option value="">Select City</option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                <select
                  name="districtId"
                  value={formik.values.districtId || ""}
                  onChange={(e) => {
                    const id = e.target.value;
                    const name = e.target.options[e.target.selectedIndex].text;
                    formik.setFieldValue("districtId", id ? Number(id) : 0);
                    formik.setFieldValue("districtName", id ? name : "");
                  }}
                  disabled={!formik.values.cityId}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] disabled:opacity-50"
                >
                  <option value="">Select District</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formik.values.postalCode}
                  onChange={formik.handleChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Radius (km)
                </label>
                <input
                  type="number"
                  name="maxServiceDistance"
                  value={formik.values.maxServiceDistance}
                  onChange={formik.handleChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Link
              href="/super-admin/outlets"
              className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-xl transition-colors shrink-0"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-[#ff7143] hover:bg-[#e05e32] text-white font-medium rounded-xl transition-colors shrink-0 flex items-center justify-center min-w-[120px]"
            >
              {isLoading ? "Saving..." : "Save Outlet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
