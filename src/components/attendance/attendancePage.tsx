"use client";

import { useState } from "react";
import { ChevronLeft, CalendarCheck } from "lucide-react";
import AbsenHariIni from "./absenHariIni";
import RiwayatAbsensi from "./riwayatAbsensi";

const subTabs = [
  { key: "today", label: "Absen Hari Ini" },
  { key: "history", label: "Riwayat" },
] as const;

type SubTabKey = (typeof subTabs)[number]["key"];

interface AttendancePageProps {
  roleLabel: string;
}

export default function AttendancePage({ roleLabel }: AttendancePageProps) {
  const [activeSubTab, setActiveSubTab] = useState<SubTabKey>("today");

  return (
    <div className="flex flex-col gap-6">
      {/* Attendance Header Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8E2DA]">
        <div className="flex items-center gap-3 mb-5">
          <button className="w-8 h-8 rounded-full bg-[#F0F4F8] flex items-center justify-center hover:bg-[#E0E8F0] transition-colors">
            <ChevronLeft className="w-4 h-4 text-[#6B6662]" />
          </button>
          <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B4A] to-[#FF8E72] rounded-xl flex items-center justify-center shadow-md">
            <CalendarCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#2C2826]">Absensi {roleLabel}</h2>
            <p className="text-xs text-[#6B6662]">Kelola kehadiran Anda</p>
          </div>
        </div>

        {/* Sub-Tab Navigation */}
        <div className="flex gap-3">
          {subTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveSubTab(tab.key)}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200"
              style={{
                background: activeSubTab === tab.key ? "#4A90D9" : "#F0F4F8",
                color: activeSubTab === tab.key ? "#fff" : "#6B6662",
                boxShadow: activeSubTab === tab.key ? "0 2px 8px rgba(74,144,217,0.3)" : "none",
              }}
            >
              {tab.key === "history" && (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 8v4l3 3" />
                  <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
                </svg>
              )}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-Tab Content */}
      {activeSubTab === "today" && <AbsenHariIni />}
      {activeSubTab === "history" && <RiwayatAbsensi />}
    </div>
  );
}
