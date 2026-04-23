"use client";

import { useMemo } from "react";
import { FiUsers, FiArrowLeft, FiAward } from "react-icons/fi";
import Link from "next/link";
import useGetEmployeePerformance from "@/features/report/hooks/useGetEmployeePerformance";
import useGetOutlets from "@/features/super-admin/outlets/hooks/useGetOutlets";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import SearchableSelect from "@/components/SearchableSelect";

const BAR_COLORS = [
  "#ff7143",
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#3b82f6",
  "#ec4899",
  "#8b5cf6",
  "#14b8a6",
  "#f97316",
  "#06b6d4",
];

export default function EmployeePerformancePage() {
  const {
    data,
    loading,
    outletId,
    setOutletId,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    role,
    setRole,
  } = useGetEmployeePerformance();

  const { outlets } = useGetOutlets(100);

  const outletOptions = useMemo(
    () => [
      { id: "", label: "All Outlets" },
      ...outlets.map((outlet: any) => ({
        id: outlet.id.toString(),
        label: outlet.name,
      })),
    ],
    [outlets],
  );

  const chartData = useMemo(
    () =>
      data.slice(0, 15).map((d) => ({
        ...d,
        name: `${d.firstName} ${d.lastName}`,
      })),
    [data],
  );

  const totalTasks = useMemo(
    () => data.reduce((sum, d) => sum + d.totalTasks, 0),
    [data],
  );

  const topPerformer = data.length > 0 ? data[0] : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Employee Performance
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Worker & driver productivity analysis
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Role
            </label>
            <select
              id="filter-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff7143]/30 focus:border-[#ff7143] transition-all"
            >
              <option value="">All Roles</option>
              <option value="worker">Worker</option>
              <option value="driver">Driver</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Outlet
            </label>
            <SearchableSelect
              options={outletOptions}
              value={outletId}
              onChange={setOutletId}
              placeholder="All Outlets"
              direction="down"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Start Date
            </label>
            <input
              id="filter-start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
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
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff7143]/30 focus:border-[#ff7143] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow duration-300">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              Total Employees
            </p>
            <p className="text-2xl font-bold text-gray-800">
              {loading ? (
                <span className="inline-block w-16 h-7 bg-gray-100 rounded-lg animate-pulse" />
              ) : (
                data.length
              )}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-50">
            <FiUsers className="w-6 h-6 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow duration-300">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              Total Tasks Completed
            </p>
            <p className="text-2xl font-bold text-gray-800">
              {loading ? (
                <span className="inline-block w-16 h-7 bg-gray-100 rounded-lg animate-pulse" />
              ) : (
                totalTasks.toLocaleString("id-ID")
              )}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-50">
            <FiAward className="w-6 h-6 text-[#ff7143]" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow duration-300">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              Top Performer
            </p>
            <p className="text-2xl font-bold text-gray-800">
              {loading ? (
                <span className="inline-block w-24 h-7 bg-gray-100 rounded-lg animate-pulse" />
              ) : topPerformer ? (
                `${topPerformer.firstName} ${topPerformer.lastName}`
              ) : (
                "-"
              )}
            </p>
            {topPerformer && !loading && (
              <p className="text-xs text-emerald-600 font-semibold mt-1">
                {topPerformer.totalTasks} tasks completed
              </p>
            )}
          </div>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-50">
            <FiAward className="w-6 h-6 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6">
          Tasks per Employee
        </h2>
        {loading ? (
          <div className="h-[350px] flex items-center justify-center">
            <div className="w-8 h-8 border-3 border-[#ff7143] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-[350px] flex flex-col items-center justify-center text-gray-400">
            <FiUsers className="w-12 h-12 mb-3 text-gray-300" />
            <p className="text-sm font-medium">No data available</p>
            <p className="text-xs mt-1">
              Try adjusting your filters or date range
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f1f5f9"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                axisLine={{ stroke: "#e2e8f0" }}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
                width={140}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                }}
                labelStyle={{
                  color: "#94a3b8",
                  fontSize: 12,
                  marginBottom: 4,
                }}
                itemStyle={{ color: "#fff", fontSize: 13 }}
                formatter={(value: any) => [
                  `${value} tasks`,
                  "Completed",
                ]}
              />
              <Bar dataKey="totalTasks" radius={[0, 8, 8, 0]} barSize={24}>
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={BAR_COLORS[index % BAR_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">
            Employee Rankings
          </h2>
        </div>
        {loading ? (
          <div className="p-8 flex justify-center">
            <div className="w-8 h-8 border-3 border-[#ff7143] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : data.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-sm">
            No data available for the selected filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                    Rank
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                    Employee
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                    Role
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                    Outlet
                  </th>
                  <th className="text-right px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                    Tasks Completed
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.map((row, idx) => (
                  <tr
                    key={row.employeeId}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {idx < 3 ? (
                        <span
                          className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white ${
                            idx === 0
                              ? "bg-yellow-400"
                              : idx === 1
                                ? "bg-gray-400"
                                : "bg-amber-600"
                          }`}
                        >
                          {idx + 1}
                        </span>
                      ) : (
                        <span className="text-gray-500 font-medium pl-2">
                          {idx + 1}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {row.firstName} {row.lastName}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          row.role === "worker"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-purple-50 text-purple-700"
                        }`}
                      >
                        {row.role === "worker" ? "Worker" : "Driver"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {row.outletName || "-"}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-800">
                      {row.totalTasks.toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
