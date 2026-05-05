"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
  FiUser,
  FiPackage,
  FiExternalLink,
} from "react-icons/fi";
import usePendingBypassRequests from "@/features/bypass-request/hooks/usePendingBypassRequests";
import useApproveBypassRequest from "@/features/bypass-request/hooks/useApproveBypassRequest";
import useRejectBypassRequest from "@/features/bypass-request/hooks/useRejectBypassRequest";
import Pagination from "@/components/Pagination";

export default function BypassRequestsPage() {
  const {
    pendingRequests,
    loading,
    fetchPending,
    page,
    setPage,
    pagination,
  } = usePendingBypassRequests();
  const { handleApprove, loading: approveLoading } =
    useApproveBypassRequest(() => fetchPending());
  const { handleReject, loading: rejectLoading } = useRejectBypassRequest(
    () => fetchPending(),
  );

  const [confirmAction, setConfirmAction] = useState<{
    id: string;
    type: "approve" | "reject";
  } | null>(null);

  const handleConfirm = () => {
    if (!confirmAction) return;
    if (confirmAction.type === "approve") {
      handleApprove(confirmAction.id);
    } else {
      handleReject(confirmAction.id);
    }
    setConfirmAction(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-3 border-[#ff7143] border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-gray-500">Loading bypass requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Bypass Requests
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and manage worker bypass requests for item discrepancies
          </p>
        </div>
        <button
          onClick={fetchPending}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Pending Count */}
      {pagination.total > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
            <FiAlertCircle className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="font-semibold text-amber-800">
              {pagination.total} pending request
              {pagination.total > 1 ? "s" : ""}
            </p>
            <p className="text-sm text-amber-700">
              These requests need your approval to continue order processing.
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {pendingRequests.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
          <FiCheckCircle className="w-12 h-12 text-emerald-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg font-medium">
            No pending bypass requests
          </p>
          <p className="text-gray-400 text-sm mt-1">
            All bypass requests have been processed. Check back later.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-4">
            {pendingRequests.map((req: any) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <FiAlertCircle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
                          Waiting Approval
                        </span>
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full capitalize">
                          {req.station.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(req.createdAt).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/outlet-admin/orders/${req.orderId}`}
                    className="text-[#ff7143] hover:text-[#e05e32] text-sm font-medium flex items-center gap-1 transition-colors"
                  >
                    View Order
                    <FiExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* Customer & Order */}
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                      <FiUser className="w-3.5 h-3.5" />
                      Customer
                    </div>
                    <p className="text-sm font-medium text-gray-800">
                      {req.order?.customer?.firstName}{" "}
                      {req.order?.customer?.lastName}
                    </p>
                    <p className="text-xs text-gray-400 font-mono mt-1 truncate">
                      {req.orderId.slice(0, 8)}...
                    </p>
                  </div>

                  {/* Worker */}
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                      <FiPackage className="w-3.5 h-3.5" />
                      Requested By
                    </div>
                    <p className="text-sm font-medium text-gray-800">
                      {req.requester?.firstName} {req.requester?.lastName}
                    </p>
                  </div>

                  {/* Quantity Info */}
                  <div className="bg-red-50 rounded-xl p-3">
                    <div className="text-xs text-red-500 mb-1">
                      Item Discrepancy
                    </div>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-xs text-gray-500">Expected</p>
                        <p className="text-lg font-bold text-gray-800">
                          {req.expectedQuantity}
                        </p>
                      </div>
                      <span className="text-gray-400">→</span>
                      <div>
                        <p className="text-xs text-gray-500">Actual</p>
                        <p className="text-lg font-bold text-red-600">
                          {req.actualQuantity}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full ml-auto">
                        -{req.expectedQuantity - req.actualQuantity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-gray-50 rounded-xl p-3 mb-4">
                  <p className="text-xs text-gray-500 mb-1">Worker Notes</p>
                  <p className="text-sm text-gray-700">{req.notes}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() =>
                      setConfirmAction({ id: req.id, type: "reject" })
                    }
                    disabled={rejectLoading}
                    className="px-5 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    <FiXCircle className="w-4 h-4" />
                    Reject
                  </button>
                  <button
                    onClick={() =>
                      setConfirmAction({ id: req.id, type: "approve" })
                    }
                    disabled={approveLoading}
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
                  >
                    <FiCheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={pagination.totalPages}
            totalItems={pagination.total}
            onPageChange={setPage}
            label="requests"
          />
        </div>
      )}

      {/* Confirm Modal */}
      {confirmAction && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 space-y-5">
            <div className="text-center">
              {confirmAction.type === "approve" ? (
                <>
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiCheckCircle className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Approve Bypass Request?
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    The order will automatically advance to the next station.
                    This action cannot be undone.
                  </p>
                </>
              ) : (
                <>
                  <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiXCircle className="w-7 h-7 text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Reject Bypass Request?
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    The worker will be notified and must re-check the items
                    and submit correct data.
                  </p>
                </>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmAction(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={approveLoading || rejectLoading}
                className={`flex-1 px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-colors disabled:opacity-50 ${
                  confirmAction.type === "approve"
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {approveLoading || rejectLoading
                  ? "Processing..."
                  : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
