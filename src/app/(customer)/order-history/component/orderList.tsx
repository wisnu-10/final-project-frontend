"use client";

import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  CreditCard,
  Truck,
  ArrowRight,
} from "lucide-react";
import PageError from "@/components/pageError";
import { formatIDR } from "@/utils/formatCurrency.utils";
import { getStatusConfig } from "@/utils/orderStatus.utils";
import { useState } from "react";
import ButtonComplaint from "@/components/buttonComplaint";
import Link from "next/link";
import useConfirmOrder from "@/features/order-customer/hooks/useConfirmOrder";
import { useParams } from "next/navigation";
import useGetOrderById from "@/features/order-admin/hooks/useGetOrderById";
import { useGetIdOrder } from "@/features/order-customer/hooks/useGetIdOrder";

interface OrderListProps {
  setShowPaymentModal: (show: boolean) => void;
  setSelectedOrder: (order: any | null) => void;
  order: any; // Sekarang nerima single order object dari parent
  isLoading?: boolean;
  isError?: boolean;
  getOrder?: (params?: any) => Promise<void>;
}

export default function OrderList({
  setShowPaymentModal,
  setSelectedOrder,
  order,
  isLoading,
  isError,
  getOrder,
}: OrderListProps) {
  
  const { data, isLoading: isConfirming, confirmOrder } = useConfirmOrder();

  if (isError) return <PageError />;

  if (!order) return null;

  const statusKey =
    order.statusLogs?.[order.statusLogs.length - 1]?.status?.toLowerCase() ||
    "";
  const config = getStatusConfig(statusKey);
  const StatusIcon = config.icon;

  const formatScheduleDateTime = (dateString: string) => {
    const date = new Date(dateString);

    const datePart = date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const timePart = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Biar muncul AM/PM biar keren kayak di form
    });

    return `${datePart} - ${timePart}`;
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all border-2 border-transparent hover:border-[#4A90E2] mb-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
            <Package className="w-6 h-6 text-[#4A90E2]" />
          </div>
          <div>
            <h3 className="font-bold text-[#2C2826]">
              Order {order.id.slice(0, 8).toUpperCase()}
            </h3>
            <div className="flex items-center gap-2 text-xs text-[#6B6662]">
              <Calendar className="w-3 h-3" />
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* --- Tombol Detail Kecil & Elegan --- */}
        <div className="flex flex-col items-end gap-2">
          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-full ${config.bgColor}`}
          >
            <StatusIcon className={`w-3 h-3 ${config.textColor}`} />
            <span className={`text-xs font-semibold ${config.textColor}`}>
              {config.label}
            </span>
          </div>
          <Link
            href={`/order-history/${order.id}`}
            className="group flex items-center gap-2 px-0 py-1 text-[11px] font-semibold text-[#6B6662] hover:text-[#4A90E2] transition-colors duration-300 relative"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />

            {/* Garis bawah tipis yang muncul pas di-hover (Modern Look) */}
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#4A90E2] transition-all duration-300 "></span>
          </Link>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-[#6B6662]">Total Weight:</span>
          <span className="font-medium text-[#2C2826]">
            {order.totalWeight ? `${order.totalWeight} kg` : `-`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#6B6662]">Total:</span>
          <span className="font-bold text-[#FF6B4A]">
            {!order.totalPrice || order.totalPrice === 0
              ? "-"
              : formatIDR(order.totalPrice)}
          </span>
        </div>
        <div className="pt-4 border-t border-[#E5DDD3]">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-[#6B6662] mb-1">Pickup:</p>
              <p className="text-[#2C2826] font-medium">
                {order.pickupAddress.address},{" "}
                {order.pickupAddress.cityName
                  .toLowerCase()
                  .replace(/\b\w/g, (c: any) => c.toUpperCase())}
              </p>
            </div>
            <div>
              <p className="text-[#6B6662] mb-1">Delivery:</p>
              <p className="text-[#2C2826] font-medium">
                {order.deliveryAddress.address},{" "}
                {order.deliveryAddress.cityName
                  .toLowerCase()
                  .replace(/\b\w/g, (c: any) => c.toUpperCase())}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- ACTION SECTION --- */}
      {order.statusLogs[order.statusLogs.length - 1].status === "scheduled" && (
        <div className="w-full px-4 py-3 rounded-xl bg-gray-100 text-[#6B6662] font-semibold flex items-center justify-center gap-2 border border-dashed border-gray-300">
          <Clock className="w-4 h-4 animate-spin-slow" /> Laundry will be pickup
          at {formatScheduleDateTime(order.scheduleTime)}
        </div>
      )}

      {(order.statusLogs[order.statusLogs.length - 1].status ===
        "waiting_pickup" ||
        order.statusLogs[order.statusLogs.length - 1].status ===
          "on_the_way_to_outlet") && (
        <div className="w-full px-4 py-3 rounded-xl bg-gray-100 text-[#6B6662] font-semibold flex items-center justify-center gap-2 border border-dashed border-gray-300">
          <Clock className="w-4 h-4 animate-spin-slow" /> Waiting for driver to
          arrive at outlet...
        </div>
      )}

      {order.statusLogs[order.statusLogs.length - 1].status ===
        "arrived_outlet" &&
        !order.totalPrice && (
          <div className="w-full px-4 py-3 rounded-xl bg-orange-50 text-[#FF6B4A] font-semibold flex items-center justify-center gap-2 border border-[#FF6B4A]">
            <Package className="w-4 h-4" /> Awaiting admin price review...
          </div>
        )}

      {order.totalPrice > 0 &&
        order.payments[order.statusLogs.length - 1]?.status === "pending" &&
        !["delivering", "completed"].includes(
          order.statusLogs[order.statusLogs.length - 1].status,
        ) && (
          <div>
            <button
              onClick={() => {
                setSelectedOrder(order);
                setShowPaymentModal(true);
              }}
              className="w-full px-4 py-3 rounded-xl bg-[#FF6B4A] text-white font-semibold hover:bg-[#FF5533] transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" /> Pay Now
            </button>
            <p className="text-[10px] text-red-600 mt-3 text-center italic">
              ⚠️ Laundry will be delivered once payment is completed
            </p>
          </div>
        )}

      {order.payments[order.statusLogs.length - 1]?.status === "paid" &&
        !["delivering", "completed"].includes(
          order.statusLogs[order.statusLogs.length - 1].status,
        ) && (
          <div className="space-y-3">
            <div className="w-full px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 font-semibold flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" /> Payment Completed
            </div>
            <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-100 rounded-lg">
              <Truck className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <p className="text-xs text-blue-800 leading-relaxed">
                Your laundry is now in the queue. We'll deliver it soon!
              </p>
            </div>
          </div>
        )}

      {order.statusLogs[order.statusLogs.length - 1]?.status ===
        "delivering" && (
        <div>
          <button
            onClick={() =>
              confirmOrder(order.id, async () => {
                // Refetch keseluruhan list dari parent untuk sync data
                if (getOrder) {
                  await getOrder();
                }
              })
            }
            disabled={isConfirming}
            className={`w-full px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${
              isConfirming
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {isConfirming ? (
              "Processing..."
            ) : (
              <>
                <CheckCircle className="w-4 h-4" /> Confirm Order Received
              </>
            )}
          </button>

          <p className="text-[10px] text-gray-500 mt-3 text-center italic">
            Auto-confirmed in 3 days if no complaint
          </p>

          <ButtonComplaint id={order.id} />
        </div>
      )}

      {order.statusLogs[order.statusLogs.length - 1].status === "completed" && (
        <div className="space-y-3">
          <div className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-600 font-semibold flex items-center justify-center gap-2 border border-gray-200">
            <CheckCircle className="w-4 h-4 text-green-600" /> Order Completed
          </div>

          <ButtonComplaint id={order.id} />
        </div>
      )}
    </div>
  );
}
