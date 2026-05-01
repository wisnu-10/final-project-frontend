"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";

interface BypassRequestStatusProps {
  status: "waiting" | "approved" | "rejected";
  expectedQuantity: number;
  actualQuantity: number;
  notes?: string;
  createdAt: string;
}

export default function BypassRequestStatus({
  status,
  expectedQuantity,
  actualQuantity,
  notes,
  createdAt,
}: BypassRequestStatusProps) {
  const statusConfig = {
    waiting: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      icon: Clock,
      label: "Pending Review",
      color: "text-orange-700",
      bgBadge: "bg-orange-100",
    },
    approved: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      icon: CheckCircle,
      label: "Approved",
      color: "text-emerald-700",
      bgBadge: "bg-emerald-100",
    },
    rejected: {
      bg: "bg-red-50",
      border: "border-red-200",
      icon: XCircle,
      label: "Rejected",
      color: "text-red-700",
      bgBadge: "bg-red-100",
    },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className={`rounded-xl border-2 p-4 ${config.bg} ${config.border}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <StatusIcon className={`w-5 h-5 ${config.color} flex-shrink-0`} />
          <div>
            <p className={`font-bold ${config.color}`}>{config.label}</p>
            <p className={`text-xs ${config.color} opacity-75`}>
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${config.color} ${config.bgBadge}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {/* Quantity Info */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-white/50 rounded-lg p-2 text-center">
          <p className={`text-xs font-semibold ${config.color} opacity-75`}>Expected</p>
          <p className={`text-lg font-bold ${config.color}`}>{expectedQuantity}</p>
        </div>
        <div className="bg-white/50 rounded-lg p-2 text-center">
          <p className={`text-xs font-semibold ${config.color} opacity-75`}>Actual</p>
          <p className={`text-lg font-bold ${config.color}`}>{actualQuantity}</p>
        </div>
        <div className="bg-white/50 rounded-lg p-2 text-center">
          <p className={`text-xs font-semibold ${config.color} opacity-75`}>Missing</p>
          <p className={`text-lg font-bold ${config.color}`}>{expectedQuantity - actualQuantity}</p>
        </div>
      </div>

      {/* Notes */}
      {notes && (
        <div className="bg-white/50 rounded-lg p-3">
          <p className="text-xs font-semibold text-gray-700 mb-1">Notes:</p>
          <p className="text-sm text-gray-600">{notes}</p>
        </div>
      )}

      {/* Status Message */}
      {status === "waiting" && (
        <div className="mt-3 flex gap-2 items-start p-2 bg-white/50 rounded-lg border border-orange-200">
          <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-orange-700">
            Your bypass request is under review. An admin will approve or reject it shortly.
          </p>
        </div>
      )}

      {status === "approved" && (
        <div className="mt-3 flex gap-2 items-start p-2 bg-white/50 rounded-lg border border-emerald-200">
          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-700">
            Your bypass request has been approved. You can now proceed with the order.
          </p>
        </div>
      )}

      {status === "rejected" && (
        <div className="mt-3 flex gap-2 items-start p-2 bg-white/50 rounded-lg border border-red-200">
          <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-700">
            Your bypass request was rejected. Please re-check the items and recount, or submit a new request with additional details.
          </p>
        </div>
      )}
    </div>
  );
}
