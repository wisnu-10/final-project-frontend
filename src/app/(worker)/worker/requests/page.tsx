"use client";

import React, { useState } from "react";
import { ClipboardList, ArrowLeft, User, Clock, Layers } from "lucide-react";
import Link from "next/link";
import { useWorkerTasks } from "@/features/order-worker/hooks/useWorkerTasks";
import { EmptyState } from "@/components/order-driver/EmptyState";
import { LoadingState } from "@/components/order-driver/LoadingState";
import { StatusBadge } from "@/components/order-driver/StatusBadge";
import { AcceptButton } from "@/components/order-driver/AcceptButton";
import toast from "react-hot-toast";
import withEmployeeAuth from "@/hoc/withEmployeeAuth";

function WorkerRequestsPage() {
  const { available, myTasks, isLoading, handleAcceptTask } = useWorkerTasks();
  const [acceptingOrderId, setAcceptingOrderId] = useState<string | null>(null);

  if (isLoading && available.length === 0) {
    return <LoadingState message="Memuat tugas tersedia..." />;
  }

  const hasActiveTask = myTasks.length > 0;

  const handleAccept = async (orderId: string) => {
    if (hasActiveTask) {
      toast.error("Anda masih memiliki tugas aktif. Selesaikan terlebih dahulu.");
      return;
    }
    try {
      setAcceptingOrderId(orderId);
      await handleAcceptTask(orderId);
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
              href="/worker-dashboard"
              className="flex items-center gap-2 text-[#4A90D9] hover:text-[#3A80C9] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-semibold">Kembali</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4A90D9] to-[#5B9FE8] rounded-xl flex items-center justify-center shadow-md">
              <ClipboardList className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#2C2826]">Tugas Tersedia</h1>
              <p className="text-xs text-[#6B6662]">
                {available.length} tugas menunggu di stasiun Anda
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Active Task Alert */}
        {hasActiveTask && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <p className="text-sm text-blue-700 font-medium">
              ℹ️ Anda sedang memproses tugas. Selesaikan terlebih dahulu untuk menerima tugas baru.
            </p>
            <Link
              href="/worker/active"
              className="text-xs text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
            >
              Lihat tugas aktif →
            </Link>
          </div>
        )}

        {/* Available Tasks */}
        {available.length > 0 ? (
          <div className="flex flex-col gap-3">
            {available.map((order) => {
              const currentStatus = order.statusLogs?.[0]?.status || "unknown";
              const customerName = order.customer?.firstName
                ? `${order.customer.firstName} ${order.customer.lastName}`
                : "Unknown";

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8E2DA] transition-all duration-200"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <StatusBadge status={currentStatus} />
                    <span className="text-xs text-[#6B6662] font-medium">
                      #{order.id?.slice(0, 8)}
                    </span>
                  </div>

                  {/* Customer */}
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-[#6B6662]" />
                    <h4 className="font-bold text-sm text-[#2C2826]">{customerName}</h4>
                  </div>

                  {/* Station */}
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="w-4 h-4 text-[#6B6662]" />
                    <p className="text-xs text-[#6B6662]">
                      Stasiun: <span className="font-semibold capitalize">{currentStatus.replace(/_/g, " ")}</span>
                    </p>
                  </div>

                  {/* Items count */}
                  {order.orderItems && order.orderItems.length > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                      <ClipboardList className="w-4 h-4 text-[#6B6662]" />
                      <p className="text-xs text-[#6B6662]">
                        {order.orderItems.length} item laundry
                      </p>
                    </div>
                  )}

                  {/* Time */}
                  <div className="flex items-center gap-2 mb-4 text-xs text-[#6B6662]">
                    <Clock className="w-4 h-4" />
                    <span>
                      {new Date(order.createdAt).toLocaleDateString("id-ID")} {new Date(order.createdAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>

                  {/* Accept Button */}
                  <AcceptButton
                    onClick={() => handleAccept(order.id)}
                    isLoading={acceptingOrderId === order.id}
                    disabled={hasActiveTask}
                    label="Ambil Tugas"
                    variant="primary"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState label="Tidak ada tugas tersedia saat ini" />
        )}
      </div>
    </div>
  );
}

export default withEmployeeAuth(WorkerRequestsPage, ["worker"], "/auth-employee");
