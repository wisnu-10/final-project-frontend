"use client";

import { useEmployeeLogout } from "@/features/login/hooks/useEmployeeLogout";
import useAuthStore from "@/stores/useAuthStore";
import { LogOut, Loader2 } from "lucide-react";
import { useState } from "react";

export default function EmployeeProfileLogout({ color = "from-[#4A90D9] to-[#5B9FE8]" }: { color?: string }) {
  const { firstName } = useAuthStore();
  const { handleLogout, isLoggingOut } = useEmployeeLogout();
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowConfirm(!showConfirm)}
        className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} text-white flex items-center justify-center font-bold shadow-md text-sm hover:scale-105 transition-transform active:scale-95`}
      >
        {firstName ? firstName.charAt(0).toUpperCase() : "E"}
      </button>

      {showConfirm && (
        <>
          <div 
            className="fixed inset-0 z-20" 
            onClick={() => setShowConfirm(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#E8E2DA] py-2 z-30 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-2 border-b border-[#F0F4F8] mb-1">
              <p className="text-xs font-bold text-[#2C2826] truncate">{firstName}</p>
              <p className="text-[10px] text-[#6B6662]">Employee</p>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full px-4 py-2.5 text-left text-sm text-[#FF6B4A] hover:bg-[#FFF0ED] flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {isLoggingOut ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogOut className="w-4 h-4" />
              )}
              {isLoggingOut ? "Logging out..." : "Log Out"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
