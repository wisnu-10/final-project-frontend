"use client";

import withAuth from "@/hoc/useAuthGuard";
import { useState } from "react";
import Image from "next/image";
import Logo from "../../../../public/logo-Photoroom.png";
import useAuthStore from "@/stores/useAuthStore";
import {
  ClipboardList,
  History,
  CalendarCheck,
} from "lucide-react";
import AttendancePage from "@/components/attendance/attendancePage";

const tabList = [
  { key: "tasks", label: "Available Tasks", icon: ClipboardList },
  { key: "history", label: "Work History", icon: History },
  { key: "attendance", label: "Attendance", icon: CalendarCheck },
] as const;

type TabKey = (typeof tabList)[number]["key"];

function WorkerDashboard() {
  const { firstName } = useAuthStore();
  const [activeTab, setActiveTab] = useState<TabKey>("attendance");

  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      {/* Top Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B4A] to-[#FF8E72] rounded-xl flex items-center justify-center shadow-md">
              <Image src={Logo} alt="Logo" className="w-7 h-auto" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#2C2826]">Washing Station</h1>
              <p className="text-xs text-[#6B6662]">Worker Dashboard</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A90D9] to-[#5B9FE8] text-white flex items-center justify-center font-bold shadow-md text-sm">
            {firstName ? firstName.charAt(0).toUpperCase() : "W"}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-3xl mx-auto px-4 pb-3">
          <div className="flex gap-2">
            {tabList.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex-1 py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: activeTab === tab.key ? "#4A90D9" : "#F0F4F8",
                  color: activeTab === tab.key ? "#fff" : "#6B6662",
                  boxShadow: activeTab === tab.key ? "0 2px 8px rgba(74,144,217,0.3)" : "none",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {activeTab === "attendance" && <AttendancePage roleLabel="Worker" />}
        {activeTab === "tasks" && <ComingSoon label="Available Tasks" />}
        {activeTab === "history" && <ComingSoon label="Work History" />}
      </div>
    </div>
  );
}

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="bg-white rounded-2xl p-12 shadow-sm border border-[#E8E2DA] text-center">
      <div className="w-16 h-16 bg-[#F0F4F8] rounded-full flex items-center justify-center mx-auto mb-4">
        <ClipboardList className="w-8 h-8 text-[#4A90D9]" />
      </div>
      <h3 className="text-lg font-bold text-[#2C2826] mb-2">{label}</h3>
      <p className="text-sm text-[#6B6662]">Fitur ini akan segera tersedia</p>
    </div>
  );
}

export default withAuth(WorkerDashboard, ["worker"], "/auth/employee");
