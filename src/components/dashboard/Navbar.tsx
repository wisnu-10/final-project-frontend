"use client";

import useAuthStore from "@/stores/useAuthStore";
import { FiUser } from "react-icons/fi";

export default function Navbar() {
  const { role, firstName, outletName } = useAuthStore();

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8">
      <div>
        {/* Can put breadcrumbs or page title here dynamically if needed */}
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-800">{firstName || "Super Admin"}</p>
          <p className="text-xs text-gray-500 capitalize">{role?.replace("_", " ") || "Super Admin"}</p>
          <p className="text-xs text-gray-500 capitalize">{outletName}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#fceae5] flex items-center justify-center text-[#ff7143] shadow-sm">
          <FiUser className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
}
