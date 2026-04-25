"use client";

import React, { useEffect, useState } from "react";
import { Truck, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import withAuth from "@/hoc/useAuthGuard";
import useDriverStore from "@/stores/useDriverStore";
import { useDriverTasks } from "@/features/order-driver/hooks/useDriverTasks";
import { OrderCard } from "@/components/order-driver/OrderCard";
import { AcceptButton } from "@/components/order-driver/AcceptButton";
import { EmptyState } from "@/components/order-driver/EmptyState";
import { LoadingState } from "@/components/order-driver/LoadingState";
import { StatusBadge } from "@/components/order-driver/StatusBadge";
import toast from "react-hot-toast";
import withEmployeeAuth from "@/hoc/withEmployeeAuth";

function RequestListPage() {
  const { availableOrders } = useDriverStore();
  const { available, myTasks, isLoading, handleAcceptPickup, handleAcceptDelivery } = useDriverTasks();
  const [acceptingOrderId, setAcceptingOrderId] = useState<string | null>(null);

  // Show initial loading state while fetching
  if (isLoading && available.pickups.length === 0 && available.deliveries.length === 0) {
    return <LoadingState />;
  }

  const hasActiveOrder = myTasks.length > 0;
  const allAvailable = [...available.pickups, ...available.deliveries];

  const handleAccept = async (orderId: string, type: "pickup" | "delivery") => {
    if (hasActiveOrder) {
      toast.error("Anda masih memiliki pesanan aktif");
      return;
    }

    try {
      setAcceptingOrderId(orderId);
      if (type === "pickup") {
        await handleAcceptPickup(orderId);
      } else {
        await handleAcceptDelivery(orderId);
      }
    } finally {
      setAcceptingOrderId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F1] pb-6">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/driver-dashboard"
              className="flex items-center gap-2 text-[#4A90D9] hover:text-[#3A80C9] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-semibold">Kembali</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-[#FF6B4A] to-[#FF8E72] rounded-xl flex items-center justify-center shadow-md">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#2C2826]">Pesanan Tersedia</h1>
              <p className="text-xs text-[#6B6662]">
                {allAvailable.length} pesanan menunggu
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Active Order Alert */}
        {hasActiveOrder && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <p className="text-sm text-blue-700 font-medium">
              ℹ️ Anda sedang memproses pesanan. Selesaikan terlebih dahulu untuk menerima pesanan baru.
            </p>
            <Link
              href="/driver/active"
              className="text-xs text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
            >
              Lihat pesanan aktif →
            </Link>
          </div>
        )}

        {/* Pickup Requests */}
        {available.pickups.length > 0 && (
          <section className="mb-8">
            <h2 className="text-base font-bold text-[#2C2826] mb-3 flex items-center gap-2">
              <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                <Truck className="w-4 h-4 text-green-600" />
              </div>
              Penjemputan ({available.pickups.length})
            </h2>
            <div className="flex flex-col gap-3">
              {available.pickups.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  showCustomer
                  showAddress
                  showTime
                >
                  <AcceptButton
                    onClick={() => handleAccept(order.id, "pickup")}
                    isLoading={acceptingOrderId === order.id}
                    disabled={hasActiveOrder}
                    label="Ambil Penjemputan"
                    variant="pickup"
                  />
                </OrderCard>
              ))}
            </div>
          </section>
        )}

        {/* Delivery Requests */}
        {available.deliveries.length > 0 && (
          <section className="mb-8">
            <h2 className="text-base font-bold text-[#2C2826] mb-3 flex items-center gap-2">
              <div className="w-6 h-6 bg-amber-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-amber-600" />
              </div>
              Pengiriman ({available.deliveries.length})
            </h2>
            <div className="flex flex-col gap-3">
              {available.deliveries.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  showCustomer
                  showAddress
                  showTime
                >
                  <AcceptButton
                    onClick={() => handleAccept(order.id, "delivery")}
                    isLoading={acceptingOrderId === order.id}
                    disabled={hasActiveOrder}
                    label="Ambil Pengiriman"
                    variant="delivery"
                  />
                </OrderCard>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {allAvailable.length === 0 && (
          <EmptyState label="Tidak ada pesanan tersedia saat ini" />
        )}
      </div>
    </div>
  );
}

export default withEmployeeAuth(RequestListPage, ["driver"], "/auth-employee");
