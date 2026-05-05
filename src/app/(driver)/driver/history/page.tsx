"use client";

import React, { useEffect } from "react";
import { Clock, MapPin, User, CheckCircle, ArrowLeft, Phone, Store } from "lucide-react";
import Link from "next/link";
import withAuth from "@/hoc/useAuthGuard";
import { useDriverHistory } from "@/features/order-driver/hooks/useDriverTasks";
import { EmptyState } from "@/components/order-driver/EmptyState";
import { LoadingState } from "@/components/order-driver/LoadingState";
import { StatusBadge } from "@/components/order-driver/StatusBadge";
import { ClipboardList } from "lucide-react";
import withEmployeeAuth from "@/hoc/withEmployeeAuth";

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
              <h1 className="text-lg font-bold text-[#2C2826]">
                Riwayat Pesanan
              </h1>
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
          <div className="space-y-4">
            {history.map((item) => {
              const customerName = item.customer?.firstName
                ? `${item.customer.firstName} ${item.customer.lastName}`
                : item.customerName || "Unknown";
              
              const isPickup = item.statusLogs?.some(
                (log) => log.status === "arrived_outlet",
              );

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 hover:bg-[#FAFAFA] transition-colors border border-[#E8E2DA] shadow-sm overflow-hidden"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F0EBE6]">
                    <div className="flex items-center gap-2">
                      <StatusBadge status="completed" />
                      <span className="text-[10px] bg-[#EDF2F7] text-[#4A5568] px-2 py-1 rounded-full font-bold">
                        {isPickup ? "PICKUP" : "DELIVERY"}
                      </span>
                    </div>
                    <span className="text-xs text-[#6B6662] font-medium font-mono">
                      #{item.id.slice(0, 8)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left Column: Customer & Outlet */}
                    <div className="space-y-4">
                      {/* Customer */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <User className="w-4 h-4 text-[#4A90D9]" />
                          <h4 className="font-bold text-sm text-[#2C2826]">
                            Pelanggan
                          </h4>
                        </div>
                        <div className="pl-6">
                          <p className="text-sm font-medium text-[#4A5568]">{customerName}</p>
                          {item.customer?.phoneNumber && (
                            <div className="flex items-center gap-1.5 mt-1 text-xs text-[#6B6662]">
                              <Phone className="w-3 h-3" />
                              <span>{item.customer.phoneNumber}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Outlet */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Store className="w-4 h-4 text-[#10B981]" />
                          <h4 className="font-bold text-sm text-[#2C2826]">
                            Outlet
                          </h4>
                        </div>
                        <div className="pl-6">
                          <p className="text-sm font-medium text-[#4A5568]">{item.outlet?.name || "N/A"}</p>
                          <p className="text-xs text-[#6B6662] line-clamp-1 italic">{item.outlet?.address}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Address & Date */}
                    <div className="space-y-4">
                      {/* Address */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-4 h-4 text-[#F56565]" />
                          <h4 className="font-bold text-sm text-[#2C2826]">
                            {isPickup ? "Alamat Penjemputan" : "Alamat Pengantaran"}
                          </h4>
                        </div>
                        <div className="pl-6">
                          <p className="text-xs text-[#4A5568] leading-relaxed">
                            {isPickup 
                              ? item.pickupAddress?.address 
                              : item.deliveryAddress?.address || "Tidak ada alamat"}
                          </p>
                          {(isPickup ? item.pickupAddress : item.deliveryAddress) && (
                            <p className="text-[10px] text-[#A0AEC0] mt-1 uppercase font-semibold">
                              {(isPickup ? item.pickupAddress : item.deliveryAddress).cityName}, {(isPickup ? item.pickupAddress : item.deliveryAddress).districtName}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Date & Completion */}
                      <div className="pt-2 border-t border-[#F0EBE6] md:border-0 md:pt-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs text-[#6B6662]">
                            <Clock className="w-3.5 h-3.5" />
                            <span>
                              Selesai: {new Date(item.updatedAt).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-[#10B981] font-bold">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>SELESAI</span>
                          </div>
                        </div>
                      </div>
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

export default withEmployeeAuth(HistoryPage, ["driver"], "/auth-employee");
