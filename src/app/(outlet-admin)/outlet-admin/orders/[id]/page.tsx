"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiUser,
  FiMapPin,
  FiPackage,
  FiClock,
  FiPlay,
  FiChevronRight,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import useGetOrderById from "@/features/order-admin/hooks/useGetOrderById";
import useGetOutletWorkers from "@/features/order-admin/hooks/useGetOutletWorkers";
import useUpdateOrderStatus from "@/features/order-admin/hooks/useUpdateOrderStatus";
import useGetBypassRequests from "@/features/bypass-request/hooks/useGetBypassRequests";
import useApproveBypassRequest from "@/features/bypass-request/hooks/useApproveBypassRequest";
import useRejectBypassRequest from "@/features/bypass-request/hooks/useRejectBypassRequest";
import { getStatusConfig } from "@/utils/orderStatus.utils";
import { formatIDR } from "@/utils/formatCurrency.utils";

// Status yang bisa di-advance (setelah washing)
const ADVANCEABLE_STATUSES: Record<string, string> = {
  washing: "ironing",
  ironing: "packing",
  packing: "waiting_payment",
  waiting_payment: "ready_delivery",
  ready_delivery: "delivering",
};

export default function OutletAdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { order, loading, fetchOrder } = useGetOrderById(id);
  const { workers } = useGetOutletWorkers();
  const { handleUpdateStatus, loading: statusLoading } =
    useUpdateOrderStatus(() => {
      fetchOrder();
    });

  const [selectedWorkerId, setSelectedWorkerId] = useState("");
  const [showStatusModal, setShowStatusModal] = useState(false);

  // Bypass request hooks
  const { bypassRequests, loading: bypassLoading, fetchBypassRequests } =
    useGetBypassRequests(id);
  const { handleApprove, loading: approveLoading } =
    useApproveBypassRequest(() => {
      fetchBypassRequests();
      fetchOrder();
    });
  const { handleReject, loading: rejectLoading } = useRejectBypassRequest(
    () => {
      fetchBypassRequests();
      fetchOrder();
    },
  );
  const [confirmBypass, setConfirmBypass] = useState<{
    id: string;
    type: "approve" | "reject";
  } | null>(null);

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
          href="/outlet-admin/orders"
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
  const nextStatus = ADVANCEABLE_STATUSES[latestStatus];
  const canProcess = latestStatus === "arrived_outlet";
  const canAdvance = !!nextStatus;

  const latestLog = order.statusLogs?.[order.statusLogs.length - 1];
  const hasWorker = !!latestLog?.workerId;
  const isWorkerStation = ["washing", "ironing", "packing"].includes(latestStatus);
  const canAssignWorker = !hasWorker && isWorkerStation;

  const handleUpdateStatusAction = () => {
    if (!selectedWorkerId) return;
    
    // Jika canAssignWorker, kita kirim status yang sama
    // Jika tidak, kita kirim nextStatus
    const targetStatus = canAssignWorker ? latestStatus : nextStatus;
    if (!targetStatus) return;

    handleUpdateStatus(id, { status: targetStatus, workerId: selectedWorkerId });
    setShowStatusModal(false);
    setSelectedWorkerId("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 flex-wrap">
        <Link
          href="/outlet-admin/orders"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-gray-800">Order Detail</h1>
          <p className="text-sm text-gray-400 font-mono truncate">
            {order.id}
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full ${statusConfig.bgColor} ${statusConfig.textColor}`}
        >
          {statusConfig.label}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 flex-wrap">
        {canProcess && (
          <Link
            href={`/outlet-admin/orders/${id}/process`}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-colors font-medium shadow-sm"
          >
            <FiPlay className="w-4 h-4" />
            Process Order
          </Link>
        )}
        {canAssignWorker && (
          <button
            onClick={() => setShowStatusModal(true)}
            disabled={statusLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-colors font-medium shadow-sm disabled:opacity-50"
          >
            <FiUser className="w-4 h-4" />
            Assign Worker to {statusConfig.label}
          </button>
        )}
        {canAdvance && hasWorker && (
          <button
            onClick={() => setShowStatusModal(true)}
            disabled={statusLoading}
            className="bg-[#ff7143] hover:bg-[#e05e32] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-colors font-medium shadow-sm disabled:opacity-50"
          >
            <FiChevronRight className="w-4 h-4" />
            Advance to {getStatusConfig(nextStatus).label}
          </button>
        )}
      </div>

      {/* Status Advance Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-5">
            <h3 className="text-lg font-bold text-gray-800">
              {canAssignWorker 
                ? `Assign Worker to "${statusConfig.label}"`
                : `Update Status to "${getStatusConfig(nextStatus).label}"`}
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Assign Worker <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedWorkerId}
                onChange={(e) => setSelectedWorkerId(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] focus:border-transparent outline-none text-sm"
              >
                <option value="">Select worker...</option>
                {workers.map((w: any) => (
                  <option key={w.id} value={w.id}>
                    {w.firstName} {w.lastName} ({w.role.replace("_", " ")})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowStatusModal(false);
                  setSelectedWorkerId("");
                }}
                className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatusAction}
                disabled={!selectedWorkerId || statusLoading}
                className="px-4 py-2 bg-[#ff7143] hover:bg-[#e05e32] text-white rounded-xl transition-colors text-sm font-medium disabled:opacity-50"
              >
                {statusLoading ? "Updating..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

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
              const isLatest = idx === order.statusLogs.length - 1;
              return (
                <div
                  key={log.id}
                  className="flex items-start gap-3 relative"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${isLatest ? "bg-[#ff7143]" : "bg-gray-300"}`}
                    />
                    {idx < order.statusLogs.length - 1 && (
                      <div className="w-0.5 h-10 bg-gray-200 mt-0.5" />
                    )}
                  </div>
                  <div className="flex-1 -mt-0.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-semibold ${isLatest ? "text-[#ff7143]" : "text-gray-600"}`}
                      >
                        {logConfig.label}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {log.startedAt && (
                        <span>
                          Start:{" "}
                          {new Date(log.startedAt).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      )}
                      {log.finishedAt && (
                        <span className="ml-2">
                          → Finish:{" "}
                          {new Date(log.finishedAt).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                      )}
                    </div>
                    {log.worker && (
                      <div className="text-xs text-gray-500 mt-0.5">
                        Worker: {log.worker.firstName} {log.worker.lastName}
                      </div>
                    )}
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

      {/* Bypass Requests */}
      {bypassRequests?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiAlertCircle className="w-5 h-5 text-[#ff7143]" />
            Bypass Requests
          </h2>
          <div className="space-y-3">
            {bypassRequests.map((br: any) => (
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
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                        br.status === "waiting"
                          ? "bg-amber-100 text-amber-700"
                          : br.status === "approved"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {br.status === "waiting" && <FiClock className="w-3 h-3" />}
                      {br.status === "approved" && <FiCheckCircle className="w-3 h-3" />}
                      {br.status === "rejected" && <FiXCircle className="w-3 h-3" />}
                      {br.status.charAt(0).toUpperCase() + br.status.slice(1)}
                    </span>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full capitalize">
                      {br.station?.replace("_", " ")}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(br.createdAt).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <p className="text-sm text-gray-700 mb-2">{br.notes}</p>

                <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                  <span>Worker: <strong className="text-gray-700">{br.requester?.firstName} {br.requester?.lastName}</strong></span>
                  <span>Expected: <strong>{br.expectedQuantity}</strong></span>
                  <span>Actual: <strong className="text-red-600">{br.actualQuantity}</strong></span>
                  <span className="text-red-600 font-bold">-{br.expectedQuantity - br.actualQuantity} missing</span>
                </div>

                {br.status === "waiting" && (
                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => setConfirmBypass({ id: br.id, type: "reject" })}
                      disabled={rejectLoading}
                      className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <FiXCircle className="w-3.5 h-3.5" />
                      Reject
                    </button>
                    <button
                      onClick={() => setConfirmBypass({ id: br.id, type: "approve" })}
                      disabled={approveLoading}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                    >
                      <FiCheckCircle className="w-3.5 h-3.5" />
                      Approve
                    </button>
                  </div>
                )}

                {br.approver && (
                  <p className="text-xs text-gray-400 mt-2">
                    Processed by: {br.approver.firstName} {br.approver.lastName}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bypass Confirm Modal */}
      {confirmBypass && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 space-y-5">
            <div className="text-center">
              {confirmBypass.type === "approve" ? (
                <>
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiCheckCircle className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Approve Bypass?</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    The order will advance to the next station automatically.
                  </p>
                </>
              ) : (
                <>
                  <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiXCircle className="w-7 h-7 text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Reject Bypass?</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    The worker will need to re-check and correct the item data.
                  </p>
                </>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmBypass(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (confirmBypass.type === "approve") handleApprove(confirmBypass.id);
                  else handleReject(confirmBypass.id);
                  setConfirmBypass(null);
                }}
                disabled={approveLoading || rejectLoading}
                className={`flex-1 px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-colors disabled:opacity-50 ${
                  confirmBypass.type === "approve"
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {approveLoading || rejectLoading ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
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
