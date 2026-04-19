"use client";

import { useAttendanceHistory } from "@/features/attendance/hooks/useAttendance";
import { AttendanceRecord } from "@/types/attendance.dto";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

function formatDate(dateStr: string): string {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
  ];
  const d = new Date(dateStr);
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function formatTime(dateStr: string | null): string {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false });
}

function getStatusBadge(status: string) {
  const map: Record<string, { label: string; bg: string; color: string }> = {
    present: { label: "Tepat Waktu", bg: "#ECFDF5", color: "#10b981" },
    late: { label: "Terlambat", bg: "#FFF0ED", color: "#ef4444" },
    absent: { label: "Tidak Hadir", bg: "#F3F4F6", color: "#6B7280" },
  };
  return map[status] || { label: status, bg: "#F3F4F6", color: "#6B7280" };
}

export default function RiwayatAbsensi() {
  const { records, isLoading, page, totalPages, setPage } = useAttendanceHistory();

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-12 shadow-sm border border-[#E8E2DA] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#4A90D9] animate-spin mb-3" />
        <p className="text-sm text-[#6B6662]">Memuat riwayat...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E8E2DA] overflow-hidden">
      <div className="p-5 border-b border-[#F0EBE6]">
        <h3 className="text-base font-bold text-[#2C2826]">Riwayat Absensi</h3>
      </div>

      {records.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="divide-y divide-[#F0EBE6]">
          {records.map((record) => (
            <HistoryRow key={record.id} record={record} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-[#F0EBE6] flex items-center justify-between">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page <= 1}
            className="flex items-center gap-1 text-sm text-[#4A90D9] disabled:text-[#CBD5E0] disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Sebelumnya
          </button>
          <span className="text-sm text-[#6B6662]">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
            className="flex items-center gap-1 text-sm text-[#4A90D9] disabled:text-[#CBD5E0] disabled:cursor-not-allowed transition-colors"
          >
            Berikutnya
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="p-12 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-4">
        <Calendar className="w-8 h-8 text-[#CBD5E0]" />
      </div>
      <p className="text-sm text-[#6B6662]">Belum ada riwayat absensi</p>
    </div>
  );
}

function HistoryRow({ record }: { record: AttendanceRecord }) {
  const badge = getStatusBadge(record.status);

  return (
    <div className="p-4 hover:bg-[#FAFAF8] transition-colors">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-[#2C2826]">{formatDate(record.date)}</p>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ background: badge.bg, color: badge.color }}
        >
          {badge.label}
        </span>
      </div>
      <div className="flex items-center gap-4 text-xs text-[#6B6662]">
        <span>Check-in: <span className="font-semibold text-[#10b981]">{formatTime(record.checkIn)}</span></span>
        <span>Check-out: <span className="font-semibold text-[#FF6B4A]">{formatTime(record.checkOut)}</span></span>
        {record.shift && (
          <span>Shift: <span className="font-semibold text-[#4A90D9]">{record.shift.shiftName}</span></span>
        )}
      </div>
    </div>
  );
}
