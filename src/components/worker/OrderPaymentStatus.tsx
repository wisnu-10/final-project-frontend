import { useState } from "react";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

interface OrderPaymentStatusProps {
  isPaid: boolean;
  status: string;
  amount?: number;
  paymentMethod?: string;
  paidAt?: string;
}

export default function OrderPaymentStatus({
  isPaid,
  status,
  amount,
  paymentMethod,
  paidAt,
}: OrderPaymentStatusProps) {
  if (status !== "packing" && status !== "waiting_payment" && status !== "ready_delivery") {
    return null;
  }

  return (
    <div
      className={`rounded-xl border-2 p-4 ${
        isPaid
          ? "bg-emerald-50 border-emerald-200"
          : "bg-amber-50 border-amber-200"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          {isPaid ? (
            <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
          )}
          <div className="flex-1">
            <h3 className={`font-bold ${isPaid ? "text-emerald-900" : "text-amber-900"}`}>
              {isPaid ? "Payment Received" : "Awaiting Payment"}
            </h3>
            <p className={`text-sm mt-1 ${isPaid ? "text-emerald-800" : "text-amber-800"}`}>
              {isPaid
                ? `Order ready for delivery. Customer paid ${amount ? `₹${amount}` : "the required amount"} on ${paidAt ? new Date(paidAt).toLocaleDateString() : "the payment date"}.`
                : "Customer has not yet completed payment. Order will move to 'Ready for Delivery' once payment is received."}
            </p>
          </div>
        </div>

        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${
          isPaid
            ? "bg-emerald-100 text-emerald-700"
            : "bg-amber-100 text-amber-700"
        }`}>
          {isPaid ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
          {isPaid ? "Ready for Delivery" : "Waiting for Payment"}
        </div>
      </div>

      {/* Payment Info */}
      {isPaid && paymentMethod && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="bg-white/50 rounded-lg p-2">
            <p className="text-xs font-semibold text-emerald-700 opacity-75">Payment Method</p>
            <p className="text-sm font-medium text-emerald-900 capitalize">
              {paymentMethod.replace("_", " ")}
            </p>
          </div>
          <div className="bg-white/50 rounded-lg p-2">
            <p className="text-xs font-semibold text-emerald-700 opacity-75">Paid At</p>
            <p className="text-sm font-medium text-emerald-900">
              {paidAt ? new Date(paidAt).toLocaleDateString() : "N/A"}
            </p>
          </div>
        </div>
      )}

      {/* Next Steps */}
      {isPaid && (
        <div className="mt-3 p-2 bg-white/50 rounded-lg border border-emerald-200">
          <p className="text-xs text-emerald-700 font-medium">
            ✓ This order is ready to be picked up by the driver for delivery.
          </p>
        </div>
      )}

      {!isPaid && (
        <div className="mt-3 p-2 bg-white/50 rounded-lg border border-amber-200">
          <p className="text-xs text-amber-700 font-medium">
            ⏳ Continue processing the order. Payment status will update automatically once the customer pays.
          </p>
        </div>
      )}
    </div>
  );
}
