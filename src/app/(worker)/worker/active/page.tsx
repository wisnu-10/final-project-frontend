"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  ArrowLeft,
  User,
  Clock,
  Layers,
  ClipboardList,
  AlertTriangle,
  Package,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useWorkerTasks } from "@/features/order-worker/hooks/useWorkerTasks";
import { EmptyState } from "@/components/order-driver/EmptyState";
import { LoadingState } from "@/components/order-driver/LoadingState";
import { StatusBadge } from "@/components/order-driver/StatusBadge";
import toast from "react-hot-toast";
import withEmployeeAuth from "@/hoc/withEmployeeAuth";
import axiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";

function WorkerActivePage() {
  const {
    myTasks,
    isLoading,
    handleCompleteTask,
    refresh,
  } = useWorkerTasks();
  const [completingOrderId, setCompletingOrderId] = useState<string | null>(null);

  // Item re-input state
  const [itemInputs, setItemInputs] = useState<Record<string, number>>({});
  const [inputValidated, setInputValidated] = useState(false);
  const [mismatch, setMismatch] = useState(false);
  const [bypassLoading, setBypassLoading] = useState(false);
  const [bypassNotes, setBypassNotes] = useState("");
  const [showBypassForm, setShowBypassForm] = useState(false);
  const [bypassPending, setBypassPending] = useState(false);

  if (isLoading) {
    return <LoadingState message="Memuat tugas aktif..." />;
  }

  const activeOrder = myTasks.length > 0 ? myTasks[0] : null;

  if (!activeOrder) {
    return (
      <div className="min-h-screen bg-[#FAF6F1]">
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <Link
              href="/worker/requests"
              className="flex items-center gap-2 text-[#4A90D9] hover:text-[#3A80C9] transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-semibold">Kembali</span>
            </Link>
            <h1 className="text-lg font-bold text-[#2C2826]">Tugas Aktif</h1>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-12">
          <EmptyState
            label="Anda tidak memiliki tugas aktif"
            icon={<ClipboardList className="w-10 h-10 text-[#CBD5E0] mx-auto mb-3" />}
          />
          <div className="mt-8 text-center">
            <Link
              href="/worker/requests"
              className="inline-block px-6 py-3 bg-[#4A90D9] text-white rounded-xl font-semibold hover:bg-[#3A80C9] transition-colors"
            >
              Lihat Tugas Tersedia
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentStatus = activeOrder.statusLogs?.[0]?.status || "unknown";
  const customerName = activeOrder.customer?.firstName
    ? `${activeOrder.customer.firstName} ${activeOrder.customer.lastName}`
    : "Unknown";

  // Check if there's a pending bypass request
  const hasPendingBypass = (activeOrder as any).bypassRequests?.some(
    (b: any) => b.status === "waiting"
  );

  // Item re-input validation logic
  const handleValidateItems = () => {
    if (!activeOrder.orderItems || activeOrder.orderItems.length === 0) {
      // No items to validate, allow completion
      setInputValidated(true);
      setMismatch(false);
      return;
    }

    let hasError = false;
    for (const item of activeOrder.orderItems) {
      const inputQty = itemInputs[item.id] || 0;
      if (inputQty !== item.quantity) {
        hasError = true;
        break;
      }
    }

    if (hasError) {
      setMismatch(true);
      setInputValidated(false);
      toast.error("Jumlah item tidak cocok! Periksa kembali atau ajukan bypass.");
    } else {
      setMismatch(false);
      setInputValidated(true);
      toast.success("Validasi berhasil! Item cocok.");
    }
  };

  const handleComplete = async () => {
    if (!activeOrder) return;

    try {
      setCompletingOrderId(activeOrder.id);
      await handleCompleteTask(activeOrder.id);
      // Reset states
      setInputValidated(false);
      setItemInputs({});
      setMismatch(false);
    } finally {
      setCompletingOrderId(null);
    }
  };

  const handleBypassRequest = async () => {
    if (!bypassNotes.trim()) {
      Swal.fire({
        title: "Perhatian!",
        text: "Catatan bypass harus diisi",
        icon: "warning",
        width: '380px',
        confirmButtonColor: "#4A90D9",
        customClass: {
          popup: "rounded-[28px]",
          confirmButton: "rounded-xl px-10 py-3 text-sm font-bold",
          title: "text-lg font-bold text-[#2C2826]",
        },
      });
      return;
    }

    try {
      setBypassLoading(true);

      // Calculate expected and actual quantities
      const expectedQty = activeOrder.orderItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;
      const actualQty = Object.values(itemInputs).reduce((sum, q) => sum + q, 0);

      await axiosInstance.post(`/bypass-request/${activeOrder.id}`, {
        notes: bypassNotes,
        expectedQuantity: expectedQty,
        actualQuantity: actualQty,
        station: currentStatus,
      });

      Swal.fire({
        title: "Berhasil!",
        text: "Bypass request dikirim ke admin",
        icon: "success",
        width: '380px',
        confirmButtonColor: "#4A90D9",
        customClass: {
          popup: "rounded-[28px]",
          confirmButton: "rounded-xl px-10 py-3 text-sm font-bold",
          title: "text-lg font-bold text-[#2C2826]",
        },
      });
      setShowBypassForm(false);
      setBypassNotes("");
      setBypassPending(true);
      refresh();
    } catch (error: any) {
      Swal.fire({
        title: "Gagal!",
        text: error.response?.data?.message || "Gagal mengirim bypass request",
        icon: "error",
        width: '380px',
        confirmButtonColor: "#4A90D9",
        customClass: {
          popup: "rounded-[28px]",
          confirmButton: "rounded-xl px-10 py-3 text-sm font-bold",
          title: "text-lg font-bold text-[#2C2826]",
        },
      });
    } finally {
      setBypassLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F1] pb-6">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link
            href="/worker/requests"
            className="flex items-center gap-2 text-[#4A90D9] hover:text-[#3A80C9] transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-semibold">Kembali</span>
          </Link>
          <h1 className="text-lg font-bold text-[#2C2826]">Tugas Aktif</h1>
          <p className="text-xs text-[#6B6662]">#{activeOrder.invoiceNumber || activeOrder.id.slice(0, 8)}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Order Info Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8E2DA] mb-6">
          <div className="flex items-center justify-between mb-3">
            <StatusBadge status={currentStatus} />
            <span className="text-xs text-[#6B6662] font-medium">
              #{activeOrder.invoiceNumber || activeOrder.id?.slice(0, 8)}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-[#6B6662]" />
            <h4 className="font-bold text-sm text-[#2C2826]">{customerName}</h4>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-[#6B6662]" />
            <p className="text-xs text-[#6B6662]">
              Stasiun: <span className="font-semibold capitalize">{currentStatus.replace(/_/g, " ")}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#6B6662]">
            <Clock className="w-4 h-4" />
            <span>{new Date(activeOrder.createdAt).toLocaleString("id-ID")}</span>
          </div>
        </div>

        {/* Status Timeline */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8E2DA] mb-6">
          <h3 className="text-base font-bold text-[#2C2826] mb-4">Timeline Status</h3>
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
                    {new Date(log.startedAt).toLocaleString("id-ID")}
                  </p>
                  {log.finishedAt && (
                    <p className="text-xs text-green-600">
                      ✓ Selesai {new Date(log.finishedAt).toLocaleString("id-ID")}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Item Re-Input Section */}
        {activeOrder.orderItems && activeOrder.orderItems.length > 0 && (
          <section className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8E2DA] mb-6">
            <h3 className="text-base font-bold text-[#2C2826] mb-2 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#4A90D9]" />
              Verifikasi Item Laundry
            </h3>
            <p className="text-xs text-[#6B6662] mb-4">
              Masukkan jumlah item yang Anda terima untuk verifikasi
            </p>

            <div className="space-y-3">
              {activeOrder.orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-[#FAF6F1] rounded-xl p-3"
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#2C2826]">
                      {item.laundryItem?.name || "Unknown Item"}
                    </p>
                    <p className="text-xs text-[#6B6662]">
                      Qty tercatat: <span className="font-bold">{item.quantity}</span>
                    </p>
                  </div>
                  <input
                    type="number"
                    min={0}
                    value={itemInputs[item.id] ?? ""}
                    onChange={(e) =>
                      setItemInputs((prev) => ({
                        ...prev,
                        [item.id]: parseInt(e.target.value) || 0,
                      }))
                    }
                    placeholder="0"
                    className="w-20 px-3 py-2 border border-[#E8E2DA] rounded-xl text-center text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#4A90D9] focus:border-transparent"
                  />
                </div>
              ))}
            </div>

            {/* Validate Button */}
            {!inputValidated && (
              <button
                onClick={handleValidateItems}
                className="w-full mt-4 py-3 rounded-xl bg-[#4A90D9] text-white text-sm font-bold shadow-md hover:bg-[#3A80C9] transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Validasi Item
              </button>
            )}

            {/* Validation Success */}
            {inputValidated && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-sm text-green-700 font-medium">
                  ✓ Semua item terverifikasi
                </p>
              </div>
            )}

            {/* Mismatch Warning */}
            {mismatch && !inputValidated && (
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <p className="text-sm text-amber-700 font-medium">
                    Jumlah item tidak cocok
                  </p>
                </div>
                <p className="text-xs text-amber-600 mb-3">
                  Anda dapat mengajukan bypass request ke admin untuk melanjutkan.
                </p>

                {hasPendingBypass || bypassPending ? (
                  <div className="bg-amber-100 rounded-lg p-2 text-xs text-amber-700 font-medium text-center">
                    ⏳ Bypass request sedang menunggu persetujuan admin
                  </div>
                ) : showBypassForm ? (
                  <div className="space-y-3">
                    <textarea
                      value={bypassNotes}
                      onChange={(e) => setBypassNotes(e.target.value)}
                      placeholder="Jelaskan alasan bypass..."
                      className="w-full px-3 py-2 border border-amber-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleBypassRequest}
                        disabled={bypassLoading}
                        className="flex-1 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-bold hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {bypassLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Kirim Bypass
                      </button>
                      <button
                        onClick={() => setShowBypassForm(false)}
                        className="px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowBypassForm(true)}
                    className="w-full py-2.5 rounded-xl border border-amber-500 text-amber-600 text-sm font-bold hover:bg-amber-500 hover:text-white transition-colors"
                  >
                    Ajukan Bypass Request
                  </button>
                )}
              </div>
            )}
          </section>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleComplete}
            disabled={
              completingOrderId === activeOrder.id ||
              (activeOrder.orderItems && activeOrder.orderItems.length > 0 && !inputValidated)
            }
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
                Selesaikan Stasiun
              </>
            )}
          </button>

          <Link
            href="/worker/requests"
            className="px-4 py-4 rounded-xl border border-[#4A90D9] text-[#4A90D9] text-base font-bold hover:bg-[#4A90D9] hover:text-white transition-colors flex items-center justify-center"
          >
            Lihat Lainnya
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withEmployeeAuth(WorkerActivePage, ["worker"], "/auth-employee");
