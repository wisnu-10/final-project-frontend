"use client";

import { useEffect } from "react";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useGetEmployeeAttendanceReport from "@/features/attendance/hooks/useGetEmployeeAttendanceReport";
import { useAttendanceStore } from "@/stores/useAttendanceStore";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(dateStr: string | null) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const statusConfig: Record<
  string,
  { label: string; bg: string; text: string }
> = {
  present: { label: "Present", bg: "bg-emerald-50", text: "text-emerald-700" },
  late: { label: "Late", bg: "bg-amber-50", text: "text-amber-700" },
  absent: { label: "Absent", bg: "bg-red-50", text: "text-red-700" },
};

export default function EmployeeAttendanceDetailPage() {
  const router = useRouter();
  const selectedEmployeeId = useAttendanceStore((state) => state.selectedEmployeeId);

  useEffect(() => {
    if (!selectedEmployeeId) {
      router.replace("/outlet-admin/attendance");
    }
  }, [selectedEmployeeId, router]);

  const {
    employee,
    attendances,
    stats,
    pagination,
    loading,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    status,
    setStatus,
    page,
    setPage,
  } = useGetEmployeeAttendanceReport(selectedEmployeeId || "");

  if (!selectedEmployeeId) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-[#ff7143] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Redirecting...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      name: "Total Days",
      value: stats.totalDays,
      icon: FiCalendar,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
    },
    {
      name: "Present",
      value: stats.totalPresent,
      icon: FiCheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      name: "Late",
      value: stats.totalLate,
      icon: FiClock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      name: "Absent",
      value: stats.totalAbsent,
      icon: FiXCircle,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/outlet-admin/attendance"
          className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {loading
              ? "Loading..."
              : employee
                ? `${employee.firstName} ${employee.lastName}`
                : "Employee Not Found"}
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {employee && (
              <span
                className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold mr-2 ${
                  employee.role === "worker"
                    ? "bg-blue-50 text-blue-700"
                    : "bg-purple-50 text-purple-700"
                }`}
              >
                {employee.role === "worker" ? "Worker" : "Driver"}
              </span>
            )}
            Attendance history
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat) => (
          <div
            key={stat.name}
            className={`bg-white rounded-2xl p-6 border ${stat.border} shadow-sm flex items-center justify-between hover:shadow-md transition-shadow duration-300`}
          >
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                {stat.name}
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {loading ? (
                  <span className="inline-block w-12 h-7 bg-gray-100 rounded-lg animate-pulse" />
                ) : (
                  stat.value
                )}
              </p>
            </div>
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}
            >
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Status
            </label>
            <select
              id="filter-status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff7143]/30 focus:border-[#ff7143] transition-all"
            >
              <option value="">All Status</option>
              <option value="present">Present</option>
              <option value="late">Late</option>
              <option value="absent">Absent</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Start Date
            </label>
            <input
              id="filter-start-date"
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff7143]/30 focus:border-[#ff7143] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              End Date
            </label>
            <input
              id="filter-end-date"
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff7143]/30 focus:border-[#ff7143] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Attendance History Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">
            Attendance History
          </h2>
        </div>

        {loading ? (
          <div className="p-8 flex justify-center">
            <div className="w-8 h-8 border-3 border-[#ff7143] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : attendances.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-sm">
            No attendance records found for the selected filters.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Date
                    </th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Shift
                    </th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Check-in
                    </th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Check-out
                    </th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Status
                    </th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {attendances.map((att: any) => {
                    const config = statusConfig[att.status] || null;
                    return (
                      <tr
                        key={att.id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-gray-800">
                          {formatDate(att.date)}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {att.shift?.shiftName || "-"}
                        </td>
                        <td className="px-6 py-4 text-gray-800 font-medium">
                          {formatTime(att.checkIn)}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {att.checkOut ? formatTime(att.checkOut) : "—"}
                        </td>
                        <td className="px-6 py-4">
                          {config ? (
                            <span
                              className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold ${config.bg} ${config.text}`}
                            >
                              {config.label}
                            </span>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-500 max-w-[200px] truncate">
                          {att.notes || "-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Page {pagination.currentPage} of {pagination.totalPages} (
                  {pagination.totalItems} records)
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page <= 1}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <FiChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setPage(Math.min(pagination.totalPages, page + 1))
                    }
                    disabled={page >= pagination.totalPages}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <FiChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
