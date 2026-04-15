"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiHome, FiPackage, FiLogOut, FiShoppingBag, FiAlertCircle } from "react-icons/fi";
import useAuthStore from "@/stores/useAuthStore";
import Image from "next/image";
import Logo from "../../../public/logo-Photoroom.png";
import { logoutEmployeeApi } from "@/features/login/api/login-employee.api";

export default function OutletAdminSidebar() {
  const pathname = usePathname();
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const navLinks = [
    { name: "Dashboard", href: "/outlet-admin/dashboard", icon: FiHome },
    { name: "Laundry Items", href: "/outlet-admin/laundry-items", icon: FiPackage },
    { name: "Orders", href: "/outlet-admin/orders", icon: FiShoppingBag },
    { name: "Bypass Requests", href: "/outlet-admin/bypass-requests", icon: FiAlertCircle },
  ];

  const handleLogout = async () => {
    try {
      await logoutEmployeeApi();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setAuth({ firstName: "", email: "", role: "", profilePicture: "" });
      router.push("/auth-employee");
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-full sticky top-0 left-0">
      <div className="h-20 flex items-center px-8 border-b border-gray-100 gap-3">
        <Image src={Logo} alt="Logo" className="w-8 h-auto" />
        <span className="text-xl font-bold text-[#1E293B]">diLaundryin</span>
      </div>

      <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
          Outlet Admin
        </p>

        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${
                isActive
                  ? "bg-[#ff7143]/10 text-[#ff7143]"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              <link.icon
                className={`w-5 h-5 ${isActive ? "text-[#ff7143]" : "text-gray-400"}`}
              />
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all duration-200 font-medium text-sm text-red-500 hover:bg-red-50"
        >
          <FiLogOut className="w-5 h-5 text-red-400" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
