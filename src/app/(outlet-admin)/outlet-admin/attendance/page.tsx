"use client";

import { FiUsers, FiCheckCircle, FiClock, FiXCircle, FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
import useGetAttendanceReport from "@/features/attendance/hooks/useGetAttendanceReport";
import { useAttendanceStore } from "@/stores/useAttendanceStore";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
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

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  present: { label: "Present", bg: "bg-emerald-50", text: "text-emerald-700" },
  late: { label: "Late", bg: "bg-amber-50", text: "text-amber-700" },
  absent: { label: "Absent", bg: "bg-red-50", text: "text-red-700" },
};

export default function OutletAdminAttendancePage() {
  const router = useRouter();
  const setEmployee = useAttendanceStore((state) => state.setEmployee);

  const {
    employees,
    summary,
    pagination,
    loading,
    search,
    setSearch,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    status,
    setStatus,
    page,
    setPage,
  } = useGetAttendanceReport();

  const statCards = [
    {
      name: "Total Employees",
      value: summary.totalEmployees,
      icon: FiUsers,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
    },
    {
      name: "Present Today",
      value: summary.presentToday,
      icon: FiCheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      name: "Late Today",
      value: summary.lateToday,
      icon: FiClock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      name: "Absent Today",
      value: summary.absentToday,
      icon: FiXCircle,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Employee Attendance
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Monitor attendance records for your outlet employees
        </p>
      </div>

      {/* Summary Cards */}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Search Employee
            </label>
            <div className="relative">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="filter-search"
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff7143]/30 focus:border-[#ff7143] transition-all"
              />
            </div>
          </div>

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

      {/* Employee List Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">
            Employee Attendance Records
          </h2>
        </div>

        {loading ? (
          <div className="p-8 flex justify-center">
            <div className="w-8 h-8 border-3 border-[#ff7143] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : employees.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-sm">
            No employees found for the selected filters.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Employee
                    </th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Role
                    </th>
                    <th className="text-center px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Total Records
                    </th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Latest Status
                    </th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Latest Check-in
                    </th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Latest Check-out
                    </th>
                    <th className="text-center px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {employees.map((emp) => {
                    const latest = emp.attendances?.[0];
                    const latestStatus = latest?.status;
                    const config = latestStatus
                      ? statusConfig[latestStatus]
                      : null;

                    return (
                      <tr
                        key={emp.id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-gray-800">
                          {emp.firstName} {emp.lastName}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold ${
                              emp.role === "worker"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-purple-50 text-purple-700"
                            }`}
                          >
                            {emp.role === "worker" ? "Worker" : "Driver"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center text-gray-600">
                          {emp.attendances?.length || 0}
                        </td>
                        <td className="px-6 py-4">
                          {config ? (
                            <span
                              className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold ${config.bg} ${config.text}`}
                            >
                              {config.label}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {latest ? (
                            <div>
                              <span className="text-gray-800 font-medium">
                                {formatTime(latest.checkIn)}
                              </span>
                              <span className="text-gray-400 text-xs ml-1.5">
                                {formatDate(latest.date)}
                              </span>
                            </div>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {latest?.checkOut
                            ? formatTime(latest.checkOut)
                            : latest
                              ? "—"
                              : "-"}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => {
                              setEmployee(emp.id, `${emp.firstName} ${emp.lastName}`);
                              router.push("/outlet-admin/attendance/detail");
                            }}
                            className="inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#ff7143]/10 text-[#ff7143] hover:bg-[#ff7143]/20 transition-colors"
                          >
                            View Detail
                          </button>
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
                  {pagination.totalItems} employees)
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
