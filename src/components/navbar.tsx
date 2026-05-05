"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "../../public/logo-Photoroom.png";
import { useEffect, useRef, useState } from "react";
import useAuthStore from "@/stores/useAuthStore";
import {
  FiLoader,
  FiLogOut,
  FiMapPin,
  FiPackage,
  FiUser,
} from "react-icons/fi";
import axiosInstance from "@/utils/axiosInstance";
import { ApiResponse } from "@/types/api";
import toast from "react-hot-toast";

export default function NavBar() {
  const router = useRouter();
  const { user, setAuth, clearAuth } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // 1. Bikin Ref-nya

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.post<ApiResponse<any>>("/auth/logout");
      clearAuth();
      router.push("/auth");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axiosInstance<ApiResponse<any>>("/auth/session");
        setAuth(res.data.data);
      } catch (error: any) {
        clearAuth();
      }
    };

    checkSession();
  }, [setAuth, clearAuth]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-2 flex items-center justify-between">
        {/* Logo */}

        <a href="/" className=" flex items-center gap-2 cursor-pointer">
          <div className="rounded-lg flex items-center justify-center">
            <Image src={Logo} alt="Logo" className="w-10 h-auto" />
          </div>
          <span className="text-lg font-bold text-[#2C2826]">DILAUNDRYIN</span>
        </a>

        {/* CTA Button Section */}
        <div className="relative flex items-center gap-8">
          {user?.email ? (
            <>
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 group px-6 py-2 rounded-full hover:bg-[#FF6B4A] hover:text-white text-[#FF6B4A] text-sm border-2 border-[#FF6B4A] transition-all"
              >
                {isLoading ? (
                  <FiLoader className="w-4 h-4 animate-spin" />
                ) : (
                  <FiLogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                )}
                <span>Logout</span>
              </button>

              {/* Avatar Bulat */}
              <div className="relative">
                <button
                  suppressHydrationWarning
                  onClick={() => setIsOpen(!isOpen)}
                  className="relative group focus:outline-none"
                >
                  {/* Ring Animasi di Belakang Avatar */}
                  <div className="absolute -inset-0.5 bg-linear-to-r from-[#FF6B4A] to-[#FF8E72] rounded-full blur opacity-30 group-hover:opacity-60 transition duration-300"></div>

                  {/* Avatar Box */}
                  <div className="relative w-10 h-10 rounded-full bg-linear-to-br from-[#FF6B4A] to-[#FF8E72] text-white flex items-center justify-center font-bold border-2 border-white shadow-sm hover:shadow-md transition-all overflow-hidden">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      user.firstName.charAt(0).toUpperCase()
                    )}
                  </div>

                  {/* Green Dot (Online Status) */}
                  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-[#E5DDD3] py-2 z-50 animate-in fade-in zoom-in duration-200"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-xs text-gray-400">Welcome back,</p>
                      <p className="text-sm font-bold text-[#2C2826] truncate">
                        {user.firstName}
                      </p>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => router.push("/profile")}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-[#FFF5F2] hover:text-[#FF6B4A] flex items-center gap-3 transition-colors"
                      >
                        <FiUser className="w-4 h-4" /> Profile
                      </button>

                      <button
                        onClick={() => router.push("/order-history")}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-[#FFF5F2] hover:text-[#FF6B4A] flex items-center gap-3 transition-colors"
                      >
                        <FiPackage className="w-4 h-4" /> Pickup Order
                      </button>

                      {/* <button
                        onClick={() => router.push("/order-history")}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-[#FFF5F2] hover:text-[#FF6B4A] flex items-center gap-3 transition-colors"
                      >
                        <FiClock className="w-4 h-4" /> Order History
                      </button> */}

                      <button
                        onClick={() => router.push("/address")}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-[#FFF5F2] hover:text-[#FF6B4A] flex items-center gap-3 transition-colors"
                      >
                        <FiMapPin className="w-4 h-4" /> My Address
                      </button>

                      <button
                        onClick={handleLogout}
                        className="md:hidden w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors border-t border-gray-100 mt-1"
                      >
                        {isLoading ? (
                          <FiLoader className="w-4 h-4 animate-spin" />
                        ) : (
                          <FiLogOut className="w-4 h-4" />
                        )}
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => router.push("/auth")}
                className="px-6 py-2 rounded-full bg-[#FF6B4A] text-white text-sm hover:bg-[#FF5533] transition-all"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/auth?tab=register")}
                className="px-6 py-2 rounded-full hover:bg-[#FF6B4A] hover:text-white text-[#FF6B4A] text-sm border-2 border-[#FF6B4A] transition-all"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
