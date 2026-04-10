"use client";

import { FiUsers, FiMapPin, FiTrendingUp } from "react-icons/fi";
import useGetDashboardStats from "@/features/super-admin/outlets/hooks/useGetDashboardStats";

export default function DashboardPage() {
  const { stats, loading } = useGetDashboardStats();

  const statCards = [
    { name: "Total Outlets", value: loading ? "..." : stats.totalOutlets, icon: FiMapPin, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Total Employees", value: loading ? "..." : stats.totalEmployees, icon: FiUsers, color: "text-green-600", bg: "bg-green-50" },
    { name: "Active Orders", value: loading ? "..." : stats.activeOrders, icon: FiTrendingUp, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.name}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Welcome to Super Admin Dashboard</h2>
        <p className="text-gray-600">
          From this portal, you can securely manage all your outlets and coordinate employee roles across the company. Use the sidebar to navigate to Outlets or Employees management.
        </p>
      </div>
    </div>
  );
}
