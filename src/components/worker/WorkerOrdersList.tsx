"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  AlertCircle,
  Clock,
  ChevronRight,
  Package,
} from "lucide-react";
import { OrderStatusEnum } from "@/types/order.dto";

interface WorkerOrder {
  id: string;
  customerId: string;
  orderId: string;
  customerName: string;
  currentStation: OrderStatusEnum;
  hasPendingBypass: boolean;
  createdAt: string;
}

interface WorkerOrdersListProps {
  orders: WorkerOrder[];
  isLoading: boolean;
  onRefresh?: () => void;
}

export default function WorkerOrdersList({
  orders,
  isLoading,
  onRefresh,
}: WorkerOrdersListProps) {
  const getStationColor = (station: OrderStatusEnum) => {
    const statusColors: Record<OrderStatusEnum, { bg: string; text: string; label: string }> = {
      scheduled: { bg: "bg-blue-50", text: "text-blue-700", label: "Scheduled" },
      waiting_pickup: { bg: "bg-yellow-50", text: "text-yellow-700", label: "Waiting Pickup" },
      on_the_way_to_outlet: { bg: "bg-purple-50", text: "text-purple-700", label: "On the way" },
      arrived_outlet: { bg: "bg-orange-50", text: "text-orange-700", label: "Arrived" },
      washing: { bg: "bg-blue-50", text: "text-blue-700", label: "Washing" },
      ironing: { bg: "bg-indigo-50", text: "text-indigo-700", label: "Ironing" },
      packing: { bg: "bg-green-50", text: "text-green-700", label: "Packing" },
      waiting_payment: { bg: "bg-red-50", text: "text-red-700", label: "Waiting Payment" },
      ready_delivery: { bg: "bg-cyan-50", text: "text-cyan-700", label: "Ready Delivery" },
      delivering: { bg: "bg-sky-50", text: "text-sky-700", label: "Delivering" },
      completed: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Completed" },
    };
    return statusColors[station] || { bg: "bg-gray-50", text: "text-gray-700", label: "Unknown" };
  };

  const getStationIcon = (station: OrderStatusEnum) => {
    switch (station) {
      case "washing":
      case "ironing":
      case "packing":
        return <Package className="w-4 h-4" />;
      case "waiting_payment":
        return <AlertCircle className="w-4 h-4" />;
      case "ready_delivery":
        return <CheckCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm text-center">
        <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 font-medium">No orders assigned yet</p>
        <p className="text-gray-400 text-sm mt-1">Check back later for new tasks</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => {
        const stationInfo = getStationColor(order.currentStation as OrderStatusEnum);
        const isCompleted = order.currentStation === "completed";

        return (
          <Link href={`/worker/orders/${order.orderId}`} key={order.orderId}>
            <div
              className={`block p-4 rounded-xl border-2 transition-all duration-200 ${
                isCompleted
                  ? "bg-linear-to-r from-emerald-50 to-green-50 border-emerald-200 hover:border-emerald-300"
                  : order.hasPendingBypass
                    ? "bg-linear-to-r from-orange-50 to-yellow-50 border-orange-200 hover:border-orange-300"
                    : "bg-white border-gray-200 hover:border-blue-300"
              } shadow-sm hover:shadow-md cursor-pointer`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {order.customerName || "Unknown Customer"}
                    </h3>
                    {order.hasPendingBypass && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold whitespace-nowrap">
                        <AlertCircle className="w-3 h-3" />
                        Bypass Pending
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 mb-2">
                    Order ID: {order.orderId.slice(0, 8)}...
                  </p>

                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${stationInfo.bg} ${stationInfo.text}`}
                  >
                    {getStationIcon(order.currentStation as OrderStatusEnum)}
                    <span>{stationInfo.label}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
