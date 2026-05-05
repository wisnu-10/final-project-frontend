"use client";

import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  MapPin,
  Clock,
  User,
  Phone,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import withAuth from "@/hoc/useAuthGuard";
import { useDriverTasks } from "@/features/order-driver/hooks/useDriverTasks";
import { OrderCard } from "@/components/order-driver/OrderCard";
import { EmptyState } from "@/components/order-driver/EmptyState";
import { LoadingState } from "@/components/order-driver/LoadingState";
import { StatusBadge } from "@/components/order-driver/StatusBadge";
import { ClipboardList } from "lucide-react";
import toast from "react-hot-toast";
import withEmployeeAuth from "@/hoc/withEmployeeAuth";
import useEmployeeStore from "@/stores/useEmployeeStore";

function ActiveOrderPage() {
  const { myTasks, isLoading, handleCompletePickup, handleCompleteDelivery } =
    useDriverTasks();
  const { employee } = useEmployeeStore();
  const [completingOrderId, setCompletingOrderId] = useState<string | null>(
    null,
  );

  if (isLoading) {
    return <LoadingState message="Memuat pesanan aktif..." />;
  }

  const activeOrder = myTasks.length > 0 ? myTasks[0] : null;
  // Deteksi apakah ini delivery dengan pengecekan yang lebih aman
  const isOnDelivery = !!(activeOrder?.driverDeliveryId && employee?.id && activeOrder.driverDeliveryId === employee.id);

  const handleComplete = async () => {
    if (!activeOrder) return;

    try {
      setCompletingOrderId(activeOrder.id);
      if (isOnDelivery) {
        await handleCompleteDelivery(activeOrder.id);
        toast.success("Pengiriman selesai!");
      } else {
        await handleCompletePickup(activeOrder.id);
        toast.success("Penjemputan selesai!");
      }
    } finally {
      setCompletingOrderId(null);
    }
  };

  if (!activeOrder) {
    return (
      <div className="min-h-screen bg-[#FAF6F1]">
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <Link
              href="/driver/requests"
              className="flex items-center gap-2 text-[#4A90D9] hover:text-[#3A80C9] transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-semibold">Kembali</span>
            </Link>
            <h1 className="text-lg font-bold text-[#2C2826]">Pesanan Aktif</h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 py-12">
          <EmptyState
            label="Anda tidak memiliki pesanan aktif"
            icon={
              <ClipboardList className="w-10 h-10 text-[#CBD5E0] mx-auto mb-3" />
            }
          />

          <div className="mt-8 text-center">
            <Link
              href="/driver/requests"
              className="inline-block px-6 py-3 bg-[#4A90D9] text-white rounded-xl font-semibold hover:bg-[#3A80C9] transition-colors"
            >
              Lihat Pesanan Tersedia
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const customerName = activeOrder.customer?.firstName
    ? `${activeOrder.customer.firstName} ${activeOrder.customer.lastName}`
    : activeOrder.customerName || "Unknown";

  const displayAddress = isOnDelivery
    ? activeOrder.deliveryAddress?.address
    : activeOrder.pickupAddress?.address;

  return (
    <div className="min-h-screen bg-[#FAF6F1] pb-6">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link
            href="/driver/requests"
            className="flex items-center gap-2 text-[#4A90D9] hover:text-[#3A80C9] transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-semibold">Kembali</span>
          </Link>
          <h1 className="text-lg font-bold text-[#2C2826]">Pesanan Aktif</h1>
          <p className="text-xs text-[#6B6662]">
            #{activeOrder.id.slice(0, 8)}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Main Order Card */}
        <OrderCard
          order={activeOrder}
          showCustomer
          showAddress
          showTime
          className="mb-6 border-2 border-[#4A90D9]"
        />

        {/* Status Timeline */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8E2DA] mb-6">
          <h3 className="text-base font-bold text-[#2C2826] mb-4">
            Timeline Status
          </h3>
          <div className="space-y-3">
            {activeOrder.statusLogs?.map((log, idx) => (
              <div key={log.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 rounded-full ${log.finishedAt
                      ? "bg-green-500"
                      : "bg-blue-500 animate-pulse"
                      }`}
                  />
                  {idx < (activeOrder.statusLogs?.length || 0) - 1 && (
                    <div className="w-0.5 h-8 bg-gray-300 my-1" />
                  )}
                </div>
                <div className="pb-4">
                  <p className="text-sm font-semibold text-[#2C2826]">
                    {log.status.replace(/_/g, " ").toUpperCase()}
                  </p>
                  <p className="text-xs text-[#6B6662]">
                    {new Date(log.startedAt).toLocaleString()}
                  </p>
                  {log.finishedAt && (
                    <p className="text-xs text-green-600">
                      ✓ Selesai {new Date(log.finishedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Information */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8E2DA] mb-6">
          <h3 className="text-base font-bold text-[#2C2826] mb-4">
            Informasi Lengkap
          </h3>
          <div className="space-y-4">
            {/* Customer */}
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-[#4A90D9] mt-0.5" />
              <div>
                <p className="text-xs text-[#6B6662] font-medium">Pelanggan</p>
                <p className="text-sm font-bold text-[#2C2826]">
                  {customerName}
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#4A90D9] mt-0.5" />
              <div>
                <p className="text-xs text-[#6B6662] font-medium">
                  {isOnDelivery ? "Alamat Pengiriman" : "Alamat Penjemputan"}
                </p>
                <p className="text-sm font-bold text-[#2C2826]">
                  {displayAddress || "Tidak ada alamat"}
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#4A90D9] mt-0.5" />
              <div>
                <p className="text-xs text-[#6B6662] font-medium">
                  Waktu Pesanan
                </p>
                <p className="text-sm font-bold text-[#2C2826]">
                  {new Date(activeOrder.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleComplete}
            disabled={completingOrderId === activeOrder.id}
            className="flex-1 py-4 rounded-xl bg-green-600 text-white text-base font-bold shadow-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {completingOrderId === activeOrder.id ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Selesaikan {isOnDelivery ? "Pengiriman" : "Penjemputan"}
              </>
            )}
          </button>

          <Link
            href="/driver/requests"
            className="px-4 py-4 rounded-xl border border-[#4A90D9] text-[#4A90D9] text-base font-bold hover:bg-[#4A90D9] hover:text-white transition-colors"
          >
            Lihat Lainnya
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withEmployeeAuth(ActiveOrderPage, ["driver"], "/auth-employee");
