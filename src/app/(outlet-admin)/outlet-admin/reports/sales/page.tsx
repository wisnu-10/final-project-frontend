"use client";

import { useMemo } from "react";
import { FiDollarSign, FiShoppingBag, FiTrendingUp } from "react-icons/fi";
import useGetSalesReport from "@/features/report/hooks/useGetSalesReport";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function formatCurrency(val: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
}

function formatPeriodLabel(period: string, groupBy: string) {
  if (groupBy === "day") {
    const d = new Date(period);
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  if (groupBy === "month") {
    const [y, m] = period.split("-");
    const d = new Date(Number(y), Number(m) - 1);
    return d.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
  }
  return period;
}

export default function OutletAdminSalesReportPage() {
  const {
    data,
    summary,
    loading,
    groupBy,
    setGroupBy,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useGetSalesReport();

  const chartData = useMemo(
    () =>
      data.map((d) => ({
        ...d,
        label: formatPeriodLabel(d.period, groupBy),
      })),
    [data, groupBy],
  );

  const statCards = [
    {
      name: "Total Income",
      value: formatCurrency(summary.totalIncome),
      icon: FiDollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      name: "Total Orders",
      value: summary.totalOrders.toLocaleString("id-ID"),
      icon: FiShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      name: "Avg. Order Value",
      value: formatCurrency(summary.averageOrderValue),
      icon: FiTrendingUp,
      color: "text-[#ff7143]",
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Sales Report</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Income analysis for your outlet
          </p>
        </div>
      </div>

      {/* Filters — no outlet filter for outlet admin */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Group By
            </label>
            <select
              id="filter-group-by"
              value={groupBy}
              onChange={(e) =>
                setGroupBy(e.target.value as "day" | "month" | "year")
              }
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff7143]/30 focus:border-[#ff7143] transition-all"
            >
              <option value="day">Per Day</option>
              <option value="month">Per Month</option>
              <option value="year">Per Year</option>
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
                  <span className="inline-block w-24 h-7 bg-gray-100 rounded-lg animate-pulse" />
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

      {/* Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Income Trend</h2>
        {loading ? (
          <div className="h-[350px] flex items-center justify-center">
            <div className="w-8 h-8 border-3 border-[#ff7143] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : data.length === 0 ? (
          <div className="h-[350px] flex flex-col items-center justify-center text-gray-400">
            <FiDollarSign className="w-12 h-12 mb-3 text-gray-300" />
            <p className="text-sm font-medium">No data available</p>
            <p className="text-xs mt-1">
              Try adjusting your filters or date range
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id="incomeGradientOutlet"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#ff7143" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ff7143" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f1f5f9"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                axisLine={{ stroke: "#e2e8f0" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => {
                  if (val >= 1_000_000) return `${val / 1_000_000}M`;
                  if (val >= 1_000) return `${val / 1_000}K`;
                  return val;
                }}
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
                formatter={(value: any) => [formatCurrency(value), "Income"]}
              />
              <Area
                type="monotone"
                dataKey="totalIncome"
                stroke="#ff7143"
                strokeWidth={2.5}
                fill="url(#incomeGradientOutlet)"
                dot={{ r: 4, fill: "#ff7143", stroke: "#fff", strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">
            Detailed Breakdown
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
                    Period
                  </th>
                  <th className="text-right px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                    Total Orders
                  </th>
                  <th className="text-right px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                    Total Income
                  </th>
                  <th className="text-right px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                    Avg / Order
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.map((row) => (
                  <tr
                    key={row.period}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {formatPeriodLabel(row.period, groupBy)}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-600">
                      {row.totalOrders.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-emerald-600">
                      {formatCurrency(row.totalIncome)}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-500">
                      {row.totalOrders > 0
                        ? formatCurrency(row.totalIncome / row.totalOrders)
                        : "-"}
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
