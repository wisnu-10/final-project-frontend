"use client";

import { FiPackage, FiTrendingUp, FiShoppingBag } from "react-icons/fi";
import Link from "next/link";

export default function OutletAdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Outlet Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome to your outlet management panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/outlet-admin/laundry-items"
          className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-[#ff7143]/30 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <FiPackage className="w-6 h-6 text-blue-600" />
            </div>
            <FiTrendingUp className="w-5 h-5 text-gray-300 group-hover:text-[#ff7143] transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#ff7143] transition-colors">
            Laundry Items
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Manage laundry item types and pricing
          </p>
        </Link>

        <Link
          href="/outlet-admin/orders"
          className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-[#ff7143]/30 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
              <FiShoppingBag className="w-6 h-6 text-orange-600" />
            </div>
            <FiTrendingUp className="w-5 h-5 text-gray-300 group-hover:text-[#ff7143] transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#ff7143] transition-colors">
            Orders
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Process and track laundry orders
          </p>
        </Link>
      </div>
    </div>
  );
}
