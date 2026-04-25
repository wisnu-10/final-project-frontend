"use client";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiUser,
  FiPackage,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiSend,
} from "react-icons/fi";
import useGetWorkerOrderDetail from "@/features/order-worker/hooks/useGetWorkerOrderDetail";
import useCreateBypassRequest from "@/features/bypass-request/hooks/useCreateBypassRequest";
import { getStatusConfig } from "@/utils/orderStatus.utils";

const BYPASS_STATIONS = ["washing", "ironing", "packing"];

export default function WorkerOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { orderDetail, loading, fetchDetail } = useGetWorkerOrderDetail(id);
  const { handleCreate: handleCreateBypass, loading: bypassLoading } =
    useCreateBypassRequest(() => {
      fetchDetail();
      setShowBypassModal(false);
      setBypassNotes("");
    });

  // Track actual quantities input by worker
  const [actualQuantities, setActualQuantities] = useState<
    Record<string, number>
  >({});
  const [showBypassModal, setShowBypassModal] = useState(false);
  const [bypassNotes, setBypassNotes] = useState("");

  // Calculate totals
  const totalExpected = useMemo(() => {
    if (!orderDetail?.orderItems) return 0;
    return orderDetail.orderItems.reduce(
      (sum: number, item: any) => sum + item.quantity,
      0,
    );
  }, [orderDetail]);

  const totalActual = useMemo(() => {
    if (!orderDetail?.orderItems) return 0;
    return orderDetail.orderItems.reduce((sum: number, item: any) => {
      const qty = actualQuantities[item.id] ?? item.quantity;
      return sum + qty;
    }, 0);
  }, [orderDetail, actualQuantities]);

  const hasDiscrepancy = totalActual < totalExpected;

  // Check if there's a pending bypass for this station
  const pendingBypass = useMemo(() => {
    if (!orderDetail?.bypassRequests) return null;
    return orderDetail.bypassRequests.find(
      (br: any) =>
        br.station === orderDetail.currentStation && br.status === "waiting",
    );
  }, [orderDetail]);

  // Check last rejected bypass for this station
  const lastRejected = useMemo(() => {
    if (!orderDetail?.bypassRequests) return null;
    return orderDetail.bypassRequests.find(
      (br: any) =>
        br.station === orderDetail.currentStation && br.status === "rejected",
    );
  }, [orderDetail]);

  const handleQuantityChange = (itemId: string, value: number) => {
    setActualQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(0, value),
    }));
  };

  const handleSubmitBypass = () => {
    if (!bypassNotes.trim()) return;
    handleCreateBypass(id, {
      notes: bypassNotes,
      expectedQuantity: totalExpected,
      actualQuantity: totalActual,
      station: orderDetail.currentStation,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-3 border-[#ff7143] border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-gray-500">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!orderDetail) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">Order not found</p>
        <Link
          href="/worker/orders"
          className="text-[#ff7143] hover:underline mt-2 inline-block"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const statusConfig = getStatusConfig(orderDetail.currentStation);
  const canBypass = BYPASS_STATIONS.includes(orderDetail.currentStation);

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 flex-wrap">
        <Link
          href="/worker/orders"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-gray-800">Order Detail</h1>
          <p className="text-sm text-gray-400 font-mono truncate">
            {orderDetail.orderId}
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full ${statusConfig.bgColor} ${statusConfig.textColor}`}
        >
          {statusConfig.label}
        </span>
      </div>

      {/* Customer Info (limited) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <FiUser className="w-5 h-5 text-[#ff7143]" />
          Customer
        </h2>
        <p className="text-gray-800 font-medium text-lg">
          {orderDetail.customerName || "Unknown"}
        </p>
      </div>

      {/* Pending Bypass Alert */}
      {pendingBypass && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
          <FiClock className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-amber-800">
              Bypass Request Pending
            </p>
            <p className="text-sm text-amber-700 mt-1">
              Your bypass request is waiting for admin approval. Please wait
              until it is processed before continuing.
            </p>
          </div>
        </div>
      )}

      {/* Rejected Bypass Alert */}
      {lastRejected && !pendingBypass && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-3">
          <FiXCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-red-800">
              Bypass Request Rejected
            </p>
            <p className="text-sm text-red-700 mt-1">
              Your last bypass request was rejected. Please re-check the
              items and fill in the correct quantities, or submit a new
              bypass request with an updated explanation.
            </p>
          </div>
        </div>
      )}

      {/* Laundry Items — Quantity Input */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FiPackage className="w-5 h-5 text-[#ff7143]" />
            Laundry Items
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Verify the quantity of each item. If any item is missing, update
            the actual quantity below.
          </p>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-semibold text-gray-600 text-sm">Item</th>
              <th className="p-4 font-semibold text-gray-600 text-sm text-center">
                Type
              </th>
              <th className="p-4 font-semibold text-gray-600 text-sm text-center">
                Expected
              </th>
              <th className="p-4 font-semibold text-gray-600 text-sm text-center">
                Actual
              </th>
              <th className="p-4 font-semibold text-gray-600 text-sm text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orderDetail.orderItems?.map((item: any) => {
              const actual =
                actualQuantities[item.id] ?? item.quantity;
              const isShort = actual < item.quantity;
              const isOk = actual >= item.quantity;
              return (
                <tr
                  key={item.id}
                  className={`border-b border-gray-50 ${isShort ? "bg-red-50/40" : ""}`}
                >
                  <td className="p-4 text-sm font-medium text-gray-800">
                    {item.laundryItem?.name}
                  </td>
                  <td className="p-4 text-center">
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
                  <td className="p-4 text-sm text-gray-700 text-center font-medium">
                    {item.quantity}
                  </td>
                  <td className="p-4 text-center">
                    <input
                      type="number"
                      min="0"
                      value={actual}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.id,
                          parseInt(e.target.value) || 0,
                        )
                      }
                      disabled={!!pendingBypass}
                      className={`w-20 px-3 py-2 border rounded-lg text-center text-sm font-medium focus:ring-2 focus:ring-[#ff7143] focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                        isShort
                          ? "border-red-300 bg-red-50 text-red-700"
                          : "border-gray-200 bg-white"
                      }`}
                    />
                  </td>
                  <td className="p-4 text-center">
                    {isOk ? (
                      <FiCheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                    ) : (
                      <FiAlertCircle className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 border-t border-gray-200">
              <td className="p-4 font-bold text-gray-800" colSpan={2}>
                Total
              </td>
              <td className="p-4 text-center font-bold text-gray-800">
                {totalExpected}
              </td>
              <td
                className={`p-4 text-center font-bold ${hasDiscrepancy ? "text-red-600" : "text-emerald-600"}`}
              >
                {totalActual}
              </td>
              <td className="p-4 text-center">
                {hasDiscrepancy ? (
                  <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                    -{totalExpected - totalActual} missing
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                    All OK
                  </span>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Action Buttons */}
      {canBypass && !pendingBypass && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {hasDiscrepancy ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
                <FiAlertCircle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-amber-800 text-sm">
                    Item Discrepancy Detected
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    Actual quantity ({totalActual}) is less than expected (
                    {totalExpected}). You must submit a bypass request to
                    continue processing.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowBypassModal(true)}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <FiSend className="w-4 h-4" />
                Request Bypass
              </button>
            </div>
          ) : (
            <div className="text-center py-2">
              <FiCheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
              <p className="font-semibold text-gray-800">
                All items accounted for
              </p>
              <p className="text-sm text-gray-500 mt-1">
                No discrepancy found. The order can proceed normally.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Bypass Request History */}
      {orderDetail.bypassRequests?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiAlertCircle className="w-5 h-5 text-[#ff7143]" />
            Bypass Request History
          </h2>
          <div className="space-y-3">
            {orderDetail.bypassRequests.map((br: any) => (
              <div
                key={br.id}
                className={`p-4 rounded-xl border ${
                  br.status === "waiting"
                    ? "border-amber-200 bg-amber-50/50"
                    : br.status === "approved"
                      ? "border-emerald-200 bg-emerald-50/50"
                      : "border-red-200 bg-red-50/50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                      br.status === "waiting"
                        ? "bg-amber-100 text-amber-700"
                        : br.status === "approved"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {br.status === "waiting" && (
                      <FiClock className="w-3 h-3" />
                    )}
                    {br.status === "approved" && (
                      <FiCheckCircle className="w-3 h-3" />
                    )}
                    {br.status === "rejected" && (
                      <FiXCircle className="w-3 h-3" />
                    )}
                    {br.status.charAt(0).toUpperCase() + br.status.slice(1)}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(br.createdAt).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{br.notes}</p>
                <div className="flex gap-4 mt-2 text-xs text-gray-500">
                  <span>
                    Station:{" "}
                    <strong className="text-gray-700">
                      {br.station.replace("_", " ")}
                    </strong>
                  </span>
                  <span>
                    Expected: <strong>{br.expectedQuantity}</strong>
                  </span>
                  <span>
                    Actual: <strong>{br.actualQuantity}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bypass Request Modal */}
      {showBypassModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-5">
            <h3 className="text-lg font-bold text-gray-800">
              Submit Bypass Request
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Station</span>
                <span className="font-medium text-gray-800 capitalize">
                  {orderDetail.currentStation.replace("_", " ")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Expected Qty</span>
                <span className="font-medium text-gray-800">
                  {totalExpected}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Actual Qty</span>
                <span className="font-medium text-red-600">
                  {totalActual}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Missing</span>
                <span className="font-bold text-red-600">
                  {totalExpected - totalActual} item(s)
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Reason / Notes <span className="text-red-500">*</span>
              </label>
              <textarea
                value={bypassNotes}
                onChange={(e) => setBypassNotes(e.target.value)}
                placeholder="Explain why the items are missing (e.g., items were lost during transport, customer sent fewer items, etc.)"
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] focus:border-transparent outline-none text-sm resize-none"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowBypassModal(false);
                  setBypassNotes("");
                }}
                className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitBypass}
                disabled={!bypassNotes.trim() || bypassLoading}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-colors text-sm font-medium disabled:opacity-50 flex items-center gap-2"
              >
                <FiSend className="w-3.5 h-3.5" />
                {bypassLoading ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
