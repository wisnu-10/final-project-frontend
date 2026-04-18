"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { useParams } from "next/navigation";
import useUpdateEmployee from "@/features/super-admin/employees/hooks/useUpdateEmployee";
import useGetOutlets from "@/features/super-admin/outlets/hooks/useGetOutlets";
import SearchableSelect from "@/components/SearchableSelect";

export default function EditEmployeePage() {
  const params = useParams();
  const { formik, isLoading, fetching } = useUpdateEmployee(params.id as string);
  const { outlets, loading: outletsLoading } = useGetOutlets(100);

  const outletOptions = outlets.map((outlet) => ({
    id: outlet.id,
    label: outlet.name,
    sublabel: `${outlet.cityName}, ${outlet.districtName}`,
  }));

  if (fetching) return <div className="p-8 text-center text-gray-500">Loading details...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/super-admin/employees"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiArrowLeft className="text-xl text-gray-600" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Edit Employee</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] outline-none"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.firstName as string}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] outline-none"
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.lastName as string}</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Identity Number (KTP)
              </label>
              <input
                type="text"
                name="identityNumber"
                value={formik.values.identityNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] outline-none"
              />
              {formik.touched.identityNumber && formik.errors.identityNumber && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.identityNumber as string}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bank Account Number
              </label>
              <input
                type="text"
                name="bankAccountNumber"
                value={formik.values.bankAccountNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] outline-none"
              />
              {formik.touched.bankAccountNumber && formik.errors.bankAccountNumber && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.bankAccountNumber as string}</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] outline-none"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email as string}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] outline-none"
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber as string}</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] outline-none"
              >
                <option value="worker">Worker</option>
                <option value="driver">Driver</option>
                <option value="outlet_admin">Outlet Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
            
            {formik.values.role !== "super_admin" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assign to Outlet
                </label>
                <SearchableSelect
                  options={outletOptions}
                  value={formik.values.outletId}
                  onChange={(val) => formik.setFieldValue("outletId", val)}
                  placeholder="Select Outlet"
                  loading={outletsLoading}
                />
                {formik.touched.outletId && formik.errors.outletId && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.outletId as string}</div>
                )}
              </div>
            )}
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">
               Password (leave empty to keep current)
             </label>
             <input
               type="password"
               name="password"
               value={formik.values.password}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] outline-none"
             />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Link
              href="/super-admin/employees"
              className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-xl transition-colors shrink-0"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-[#ff7143] hover:bg-[#e05e32] text-white font-medium rounded-xl transition-colors shrink-0"
            >
              {isLoading ? "Saving..." : "Update Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
