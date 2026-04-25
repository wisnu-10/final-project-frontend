"use client";

import React, { useEffect } from "react";
import { Clock, MapPin, User, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import withAuth from "@/hoc/useAuthGuard";
import { useDriverHistory } from "@/features/order-driver/hooks/useDriverTasks";
import { EmptyState } from "@/components/order-driver/EmptyState";
import { LoadingState } from "@/components/order-driver/LoadingState";
import { StatusBadge } from "@/components/order-driver/StatusBadge";
import { ClipboardList } from "lucide-react";

function HistoryPage() {
  const { history, isLoading, refresh } = useDriverHistory();

  useEffect(() => {
    // Auto-refresh history when component mounts
    refresh();
  }, [refresh]);

  if (isLoading) {
    return <LoadingState message="Memuat riwayat pesanan..." />;
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1] pb-6">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link
            href="/driver-dashboard"
            className="flex items-center gap-2 text-[#4A90D9] hover:text-[#3A80C9] transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-semibold">Kembali</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-[#10b981] to-[#34d399] rounded-xl flex items-center justify-center shadow-md">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#2C2826]">Riwayat Pesanan</h1>
              <p className="text-xs text-[#6B6662]">
                {history.length} pesanan selesai
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {history.length === 0 ? (
          <div className="mt-12">
            <EmptyState
              label="Tidak ada riwayat pesanan"
              icon={
                <ClipboardList className="w-10 h-10 text-[#CBD5E0] mx-auto mb-3" />
              }
            />
            <div className="mt-8 text-center">
              <Link
                href="/driver/requests"
                className="inline-block px-6 py-3 bg-[#4A90D9] text-white rounded-xl font-semibold hover:bg-[#3A80C9] transition-colors"
              >
                Ambil Pesanan
              </Link>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-[#F0EBE6]">
            {history.map((item) => {
              const customerName = item.customer?.firstName
                ? `${item.customer.firstName} ${item.customer.lastName}`
                : item.customerName || "Unknown";
              const isPickup = item.statusLogs?.some(
                (log) => log.status === "arrived_outlet"
              );
              const displayAddress = isPickup
                ? item.pickupAddress?.address
                : item.deliveryAddress?.address;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 hover:bg-[#FAFAFA] transition-colors border border-[#E8E2DA] mb-3"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <StatusBadge status="completed" />
                    <span className="text-xs text-[#6B6662] font-medium">
                      #{item.id.slice(0, 8)}
                    </span>
                  </div>

                  {/* Customer */}
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-[#6B6662]" />
                    <h4 className="font-bold text-sm text-[#2C2826]">
                      {customerName}
                    </h4>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-[#6B6662] mt-0.5 shrink-0" />
                    <p className="text-xs text-[#6B6662] line-clamp-2">
                      {displayAddress || "Tidak ada alamat"}
                    </p>
                  </div>

                  {/* Date & Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-[#6B6662]">
                      <Clock className="w-3 h-3" />
                      <span>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                      <CheckCircle className="w-3 h-3" />
                      Selesai
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default withAuth(HistoryPage, ["driver"], "/auth-employee");
