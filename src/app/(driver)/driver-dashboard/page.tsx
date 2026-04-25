"use client";
import withEmployeeAuth from "@/hoc/withEmployeeAuth";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../public/logo-Photoroom.png";
import useEmployeeStore from "@/stores/useEmployeeStore";
import {
  Truck,
  History,
  CalendarCheck,
  Loader2,
  PackageCheck,
} from "lucide-react";
import AttendancePage from "@/components/attendance/attendancePage";
import { useAttendanceStatus, useCheckIn, useCheckOut } from "@/features/attendance/hooks/useAttendance";
import EmployeeProfileLogout from "@/components/dashboard/EmployeeProfileLogout";
import withAuth from "@/hoc/useAuthGuard";
import { useState } from "react";

const navTabs = [
  { key: "pickup", label: "Pickup Tasks", icon: Truck, href: "/driver/requests" },
  { key: "active", label: "Active Order", icon: PackageCheck, href: "/driver/active" },
  { key: "history", label: "Delivery History", icon: History, href: "/driver/history" },
  { key: "attendance", label: "Attendance", icon: CalendarCheck, href: null },
] as const;

function DriverDashboard() {
  const { employee } = useEmployeeStore();
  const [activeTab, setActiveTab] = useState<any>("attendance");

  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      {/* Top Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-[#FF6B4A] to-[#FF8E72] rounded-xl flex items-center justify-center shadow-md">
              <Image src={Logo} alt="Logo" className="w-7 h-auto" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#2C2826]">Delivery Station</h1>
              <p className="text-xs text-[#6B6662]">Driver Dashboard</p>
            </div>
          </div>
          <EmployeeProfileLogout color="from-[#10b981] to-[#34d399]" />
        </div>

        {/* Tab Navigation */}
        <div className="max-w-3xl mx-auto px-4 pb-3">
          <div className="flex gap-2">
            {navTabs.map((tab) =>
              tab.href ? (
                <Link
                  key={tab.key}
                  href={tab.href}
                  className="flex-1 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all duration-200 flex flex-col items-center gap-1 no-underline"
                  style={{
                    background: "#F8F8F8",
                    color: "#6B6662",
                  }}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </Link>
              ) : (
                <button
                  key={tab.key}
                  className="flex-1 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all duration-200 flex flex-col items-center gap-1"
                  style={{
                    background: "#4A90D9",
                    color: "#fff",
                    boxShadow: "0 4px 12px rgba(74,144,217,0.2)",
                  }}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Quick Attendance Action */}
      <div className="max-w-3xl mx-auto px-4 mt-6">
        <QuickAttendance />
      </div>

      {/* Attendance Content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <AttendancePage roleLabel="Driver" />
      </div>
    </div>
  );
}

function QuickAttendance() {
  const { status, refetch } = useAttendanceStatus();
  const { handleCheckIn, isLoading: cILoading } = useCheckIn();
  const { handleCheckOut, isLoading: cOLoading } = useCheckOut();

  const isCheckedIn = status?.isCheckedIn;
  const isCheckedOut = status?.isCheckedOut;

  if (isCheckedOut) return null;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E2DA] flex items-center justify-between">
      <div>
        <h3 className="text-sm font-bold text-[#2C2826]">Quick Status</h3>
        <p className="text-xs text-[#6B6662]">
          {!isCheckedIn ? "Anda belum check-in" : "Anda sedang bertugas"}
        </p>
      </div>
      {!isCheckedIn ? (
        <button
          onClick={() => handleCheckIn(refetch)}
          disabled={cILoading}
          className="px-6 py-2 rounded-xl bg-[#4A90D9] text-white text-sm font-bold shadow-md hover:bg-[#3A80C9] transition-colors flex items-center gap-2"
        >
          {cILoading && <Loader2 className="w-4 h-4 animate-spin" />}
          Check In
        </button>
      ) : (
        <button
          onClick={() => handleCheckOut(refetch)}
          disabled={cOLoading}
          className="px-6 py-2 rounded-xl bg-[#FF6B4A] text-white text-sm font-bold shadow-md hover:bg-[#EF5B3A] transition-colors flex items-center gap-2"
        >
          {cOLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          Check Out
        </button>
      )}
    </div>
  );
}


export default withAuth(DriverDashboard, ["driver"], "/auth-employee");

