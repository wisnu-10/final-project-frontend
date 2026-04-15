"use client";

import Link from "next/link";
import { FiPackage, FiAlertCircle } from "react-icons/fi";
import useGetWorkerOrders from "@/features/order-worker/hooks/useGetWorkerOrders";
import { getStatusConfig } from "@/utils/orderStatus.utils";

export default function WorkerOrdersPage() {
  const { orders, loading, fetchOrders } = useGetWorkerOrders();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-3 border-[#ff7143] border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-gray-500">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
          <p className="text-sm text-gray-500 mt-1">
            Orders assigned to you for processing
          </p>
        </div>
        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
          <FiPackage className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg font-medium">No orders assigned</p>
          <p className="text-gray-400 text-sm mt-1">
            Orders will appear here once an admin assigns them to you.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order: any) => {
            const statusConfig = getStatusConfig(order.currentStation);
            return (
              <Link
                key={order.orderId}
                href={`/worker/orders/${order.orderId}`}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-[#ff7143]/30 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${statusConfig.bgColor} ${statusConfig.textColor}`}
                  >
                    {statusConfig.label}
                  </span>
                  {order.hasPendingBypass && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                      <FiAlertCircle className="w-3 h-3" />
                      Bypass Pending
                    </span>
                  )}
                </div>

                <div className="mb-3">
                  <p className="text-base font-semibold text-gray-800 group-hover:text-[#ff7143] transition-colors">
                    {order.customerName || "Unknown Customer"}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400 font-mono truncate max-w-[180px]">
                    {order.orderId.slice(0, 8)}...
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
