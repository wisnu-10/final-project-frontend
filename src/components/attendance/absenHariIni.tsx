"use client";

import {
  useAttendanceStatus,
  useCheckIn,
  useCheckOut,
} from "@/features/attendance/hooks/useAttendance";
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

function formatDate(): string {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];
  const now = new Date();
  return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}

function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false });
}

function getStatusLabel(status: string) {
  const map: Record<string, { label: string; color: string }> = {
    present: { label: "Tepat Waktu", color: "#10b981" },
    late: { label: "Terlambat", color: "#ef4444" },
    absent: { label: "Tidak Hadir", color: "#6B6662" },
  };
  return map[status] || { label: status, color: "#6B6662" };
}

export default function AbsenHariIni() {
  const { status, isLoading, refetch } = useAttendanceStatus();
  const { handleCheckIn, isLoading: checkInLoading } = useCheckIn();
  const { handleCheckOut, isLoading: checkOutLoading } = useCheckOut();

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-12 shadow-sm border border-[#E8E2DA] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#4A90D9] animate-spin mb-3" />
        <p className="text-sm text-[#6B6662]">Memuat data absensi...</p>
      </div>
    );
  }

  const isCheckedIn = status?.isCheckedIn || false;
  const isCheckedOut = status?.isCheckedOut || false;
  const attendance = status?.attendance;

  return (
    <div className="flex flex-col gap-5">
      {/* Date Card */}
      <DateCard />

      {/* Status Card */}
      {!isCheckedIn && <NotCheckedInCard />}
      {isCheckedIn && !isCheckedOut && <CheckedInCard attendance={attendance} />}
      {isCheckedIn && isCheckedOut && <CompletedCard attendance={attendance} />}

      {/* Action Button */}
      {!isCheckedIn && (
        <button
          onClick={() => handleCheckIn(refetch)}
          disabled={checkInLoading}
          className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-3 transition-all duration-200 hover:shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, #4A90D9, #5B9FE8)",
            boxShadow: "0 4px 15px rgba(74,144,217,0.4)",
          }}
        >
          {checkInLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <CheckCircle2 className="w-5 h-5" />
          )}
          {checkInLoading ? "Memproses..." : "Check-In Sekarang"}
        </button>
      )}

      {isCheckedIn && !isCheckedOut && (
        <button
          onClick={() => handleCheckOut(refetch)}
          disabled={checkOutLoading}
          className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-3 transition-all duration-200 hover:shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, #FF6B4A, #FF8E72)",
            boxShadow: "0 4px 15px rgba(255,107,74,0.4)",
          }}
        >
          {checkOutLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <CheckCircle2 className="w-5 h-5" />
          )}
          {checkOutLoading ? "Memproses..." : "Check-Out Sekarang"}
        </button>
      )}

      {/* Info Card */}
      {!isCheckedIn && <InfoCard />}
    </div>
  );
}

function DateCard() {
  return (
    <div
      className="rounded-2xl p-5 text-center shadow-sm border"
      style={{ background: "#EBF3FC", borderColor: "#D0E3F8" }}
    >
      <div className="flex items-center justify-center gap-2 mb-1">
        <Calendar className="w-4 h-4 text-[#4A90D9]" />
        <span className="text-sm font-medium text-[#4A90D9]">Tanggal Hari Ini</span>
      </div>
      <p className="text-lg font-bold text-[#2C2826]">{formatDate()}</p>
    </div>
  );
}

function NotCheckedInCard() {
  return (
    <div
      className="rounded-2xl p-6 text-center shadow-sm border"
      style={{ background: "#FFF0ED", borderColor: "#FFD4CB" }}
    >
      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto mb-3 shadow-sm">
        <Clock className="w-7 h-7 text-[#FF6B4A]" />
      </div>
      <p className="text-base font-bold text-[#2C2826] mb-1">Anda belum absen hari ini</p>
      <p className="text-sm text-[#6B6662]">Silakan lakukan check-in untuk memulai bekerja</p>
    </div>
  );
}

function CheckedInCard({ attendance }: { attendance: any }) {
  const statusInfo = getStatusLabel(attendance?.status || "late");
  return (
    <div
      className="rounded-2xl p-5 shadow-sm border"
      style={{ background: "#FFF8F6", borderColor: "#FFE4DD" }}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-bold text-[#2C2826]">Status Absensi:</p>
        <span className="text-sm font-bold" style={{ color: statusInfo.color }}>
          {statusInfo.label}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <TimeBox label="Check-In" time={attendance?.checkIn ? formatTime(attendance.checkIn) : "-"} color="#10b981" />
        <TimeBox label="Check-Out" time="-" color="#6B6662" />
      </div>
    </div>
  );
}

function CompletedCard({ attendance }: { attendance: any }) {
  const statusInfo = getStatusLabel(attendance?.status || "present");
  return (
    <div className="flex flex-col gap-5">
      <div
        className="rounded-2xl p-5 shadow-sm border"
        style={{ background: "#FFF8F6", borderColor: "#FFE4DD" }}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-bold text-[#2C2826]">Status Absensi:</p>
          <span className="text-sm font-bold" style={{ color: statusInfo.color }}>
            {statusInfo.label}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <TimeBox label="Check-In" time={attendance?.checkIn ? formatTime(attendance.checkIn) : "-"} color="#10b981" />
          <TimeBox label="Check-Out" time={attendance?.checkOut ? formatTime(attendance.checkOut) : "-"} color="#FF6B4A" />
        </div>
      </div>

      <div
        className="rounded-2xl p-5 text-center shadow-sm border"
        style={{ background: "#ECFDF5", borderColor: "#A7F3D0" }}
      >
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto mb-3 shadow-sm">
          <CheckCircle2 className="w-6 h-6 text-[#10b981]" />
        </div>
        <p className="text-base font-bold text-[#2C2826]">Absensi hari ini sudah lengkap!</p>
      </div>
    </div>
  );
}

function TimeBox({ label, time, color }: { label: string; time: string; color: string }) {
  return (
    <div className="bg-white rounded-xl p-4 border border-[#F0EBE6]">
      <p className="text-xs text-[#6B6662] mb-1">{label}</p>
      <p className="text-xl font-bold" style={{ color }}>{time}</p>
    </div>
  );
}

function InfoCard() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8E2DA]">
      <p className="text-sm font-bold text-[#FF6B4A] mb-3">Informasi:</p>
      <ul className="flex flex-col gap-2 text-sm text-[#6B6662]">
        <li className="flex items-start gap-2">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#6B6662] shrink-0" />
          Check-in sebelum jam 08:00 dianggap tepat waktu
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#6B6662] shrink-0" />
          Check-in setelah jam 08:00 dianggap terlambat
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#6B6662] shrink-0" />
          Pastikan untuk check-out setelah selesai bekerja
        </li>
      </ul>
    </div>
  );
}
