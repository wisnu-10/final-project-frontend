"use client";

import { use } from "react";
import Link from "next/link";
import { FiArrowLeft, FiUser, FiMapPin, FiPackage, FiClock } from "react-icons/fi";
import useGetOrderById from "@/features/order-admin/hooks/useGetOrderById";
import { getStatusConfig } from "@/utils/orderStatus.utils";
import { formatIDR } from "@/utils/formatCurrency.utils";

export default function SuperAdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { order, loading } = useGetOrderById(id);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-3 border-[#ff7143] border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-gray-500">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">Order not found</p>
        <Link
          href="/super-admin/orders"
          className="text-[#ff7143] hover:underline mt-2 inline-block"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const latestStatus =
    order.statusLogs?.length > 0
      ? order.statusLogs[order.statusLogs.length - 1]?.status
      : "Processing";
  const statusConfig = getStatusConfig(latestStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/super-admin/orders"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Order Detail</h1>
          <p className="text-sm text-gray-400 font-mono">{order.id}</p>
        </div>
        <span
          className={`ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full ${statusConfig.bgColor} ${statusConfig.textColor}`}
        >
          {statusConfig.label}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiUser className="w-5 h-5 text-[#ff7143]" />
            Customer
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium text-gray-800">
                {order.customer?.firstName} {order.customer?.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-700">{order.customer?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-gray-700">
                {order.customer?.phoneNumber || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Order Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiPackage className="w-5 h-5 text-[#ff7143]" />
            Order Info
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">Outlet</p>
              <p className="font-medium text-gray-800">
                {order.outlet?.name}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">Price/kg</p>
              <p className="text-gray-700">
                {formatIDR(Number(order.pricePerKg))}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">Weight</p>
              <p className="text-gray-700">
                {order.totalWeight
                  ? `${Number(order.totalWeight)} kg`
                  : "—"}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">Total Price</p>
              <p className="font-bold text-gray-800 text-lg">
                {order.totalPrice
                  ? formatIDR(Number(order.totalPrice))
                  : "—"}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">Admin</p>
              <p className="text-gray-700">
                {order.admin
                  ? `${order.admin.firstName} ${order.admin.lastName}`
                  : "—"}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">Created</p>
              <p className="text-gray-700">
                {new Date(order.createdAt).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Addresses */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiMapPin className="w-5 h-5 text-[#ff7143]" />
            Addresses
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase text-gray-400 font-bold mb-1">
                Pickup
              </p>
              <p className="text-sm text-gray-700">
                {order.pickupAddress?.address}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {order.pickupAddress?.districtName},{" "}
                {order.pickupAddress?.cityName}
              </p>
            </div>
            <hr className="border-gray-100" />
            <div>
              <p className="text-xs uppercase text-gray-400 font-bold mb-1">
                Delivery
              </p>
              <p className="text-sm text-gray-700">
                {order.deliveryAddress?.address}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {order.deliveryAddress?.districtName},{" "}
                {order.deliveryAddress?.cityName}
              </p>
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiClock className="w-5 h-5 text-[#ff7143]" />
            Status Timeline
          </h2>
          <div className="space-y-3">
            {order.statusLogs?.map((log: any, idx: number) => {
              const logConfig = getStatusConfig(log.status);
              return (
                <div
                  key={log.id}
                  className="flex items-start gap-3 relative"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${idx === order.statusLogs.length - 1 ? "bg-[#ff7143]" : "bg-gray-300"}`}
                    />
                    {idx < order.statusLogs.length - 1 && (
                      <div className="w-0.5 h-8 bg-gray-200 mt-0.5" />
                    )}
                  </div>
                  <div className="flex-1 -mt-0.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-semibold ${idx === order.statusLogs.length - 1 ? "text-[#ff7143]" : "text-gray-600"}`}
                      >
                        {logConfig.label}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {new Date(log.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {log.worker && (
                        <span className="ml-2 text-gray-500">
                          • {log.worker.firstName} {log.worker.lastName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Order Items */}
      {order.orderItems?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">
              Order Items
            </h2>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600 text-sm">
                  Item
                </th>
                <th className="p-4 font-semibold text-gray-600 text-sm">
                  Type
                </th>
                <th className="p-4 font-semibold text-gray-600 text-sm">
                  Qty
                </th>
                <th className="p-4 font-semibold text-gray-600 text-sm">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item: any) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50"
                >
                  <td className="p-4 text-sm font-medium text-gray-800">
                    {item.laundryItem?.name}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${
                        item.laundryItem?.pricingType === "kiloan"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {item.laundryItem?.pricingType === "kiloan"
                        ? "Kiloan"
                        : "Per Item"}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-700">
                    {item.quantity}
                  </td>
                  <td className="p-4 text-sm font-medium text-gray-800">
                    {item.subTotal
                      ? formatIDR(Number(item.subTotal))
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Payment */}
      {order.payments?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Payment
          </h2>
          {order.payments.map((payment: any) => (
            <div
              key={payment.id}
              className="flex items-center justify-between"
            >
              <div>
                <span
                  className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${
                    payment.status === "paid"
                      ? "bg-green-100 text-green-700"
                      : payment.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {payment.status?.toUpperCase()}
                </span>
                {payment.method && (
                  <span className="ml-2 text-sm text-gray-500">
                    via {payment.method}
                  </span>
                )}
              </div>
              <p className="font-bold text-gray-800">
                {payment.amount
                  ? formatIDR(Number(payment.amount))
                  : "—"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
