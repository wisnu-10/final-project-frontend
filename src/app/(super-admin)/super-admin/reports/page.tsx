"use client";

import Link from "next/link";
import {
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
  FiArrowRight,
} from "react-icons/fi";

const reportCards = [
  {
    title: "Sales Report",
    description:
      "View income reports across all outlets. Analyze revenue trends by day, month, or year with flexible date filters.",
    href: "/super-admin/reports/sales",
    icon: FiDollarSign,
    gradient: "from-[#ff7143] to-[#ff9a76]",
    iconBg: "bg-orange-50",
    iconColor: "text-[#ff7143]",
  },
  {
    title: "Employee Performance",
    description:
      "Track worker and driver productivity. See total tasks completed per employee across all outlets.",
    href: "/super-admin/reports/employee-performance",
    icon: FiUsers,
    gradient: "from-[#6366f1] to-[#818cf8]",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Reports & Analytics
        </h1>
        <p className="text-gray-500 mt-1">
          Gain insights into your business performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportCards.map((card) => (
          <Link key={card.title} href={card.href}>
            <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg hover:border-transparent transition-all duration-300 overflow-hidden cursor-pointer h-full">
              {/* Gradient accent bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
              />

              <div className="flex items-start justify-between mb-6">
                <div
                  className={`w-14 h-14 rounded-2xl ${card.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <card.icon className={`w-7 h-7 ${card.iconColor}`} />
                </div>
                <FiTrendingUp className="w-5 h-5 text-gray-300 group-hover:text-gray-400 transition-colors" />
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                {card.description}
              </p>

              <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 group-hover:text-[#ff7143] transition-colors">
                View Report
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
