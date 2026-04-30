"use client";

import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  CreditCard,
  Truck,
  ArrowRight,
} from "lucide-react";
import PageError from "@/components/pageError";
import { formatIDR } from "@/utils/formatCurrency.utils";
import { getStatusConfig } from "@/utils/orderStatus.utils";
import { useState } from "react";
import ButtonComplaint from "@/components/buttonComplaint";
import Link from "next/link";
import useConfirmOrder from "@/features/order-customer/hooks/useConfirmOrder";
import { useParams } from "next/navigation";
import useGetOrderById from "@/features/order-admin/hooks/useGetOrderById";
import { useGetIdOrder } from "@/features/order-customer/hooks/useGetIdOrder";
import PaymentModal from "./paymentModal";
import useCreatePayment from "@/features/payment-customer/hooks/useCreatePayment";
import { FiLoader } from "react-icons/fi";
import InvoicePage from "./invoice";
import Loading from "@/components/loading";
import useEmailInvoice from "@/features/payment-customer/hooks/useEmailInvoice";
import ResponseComplaint from "../[id]/response/page";
import ButtonResponse from "@/components/buttonResponse";

interface OrderListProps {
  setShowPaymentModal: (show: boolean) => void;
  setSelectedOrder: (order: any | null) => void;
  order: any;
  isLoading?: boolean;
  isError?: boolean;
  getOrder?: (params?: any) => Promise<void>;
}

export default function OrderList({
  setShowPaymentModal,
  setSelectedOrder,
  order,
  isLoading,
  isError,
  getOrder,
}: OrderListProps) {
  const { isLoading: isConfirming, confirmOrder } = useConfirmOrder();
  const [showPayment, setShowPayment] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const { createPayment, isLoading: isPayment } = useCreatePayment();

  const handlePayment = () => {
    createPayment(order.id, setShowPayment);
  };

  if (isError) return <PageError />;
  if (isLoading || !order) return <Loading />;

  const statusLogs = order?.statusLogs || [];
  const lastStatus =
    statusLogs.length > 0
      ? statusLogs[statusLogs.length - 1]?.status?.toLowerCase()
      : "";

  const complaints = order?.complaints || [];
  const lastComplaint =
    complaints.length > 0 ? complaints[complaints.length - 1] : null;

  const payments = order?.payments || [];
  const lastPayment =
    payments.length > 0 ? payments[payments.length - 1] : null;

  const config = getStatusConfig(lastStatus);
  const StatusIcon = config.icon;

  const formatScheduleDateTime = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const datePart = date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const timePart = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${datePart} - ${timePart}`;
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all border-2 border-transparent hover:border-[#4A90E2] mb-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
            <Package className="w-6 h-6 text-[#4A90E2]" />
          </div>
          <div>
            <h3 className="font-bold text-[#2C2826]">
              Order {order.invoiceNumber}
            </h3>
            <div className="flex items-center gap-2 text-xs text-[#6B6662]">
              <Calendar className="w-3 h-3" />
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-full ${config.bgColor}`}
          >
            <StatusIcon className={`w-3 h-3 ${config.textColor}`} />
            <span className={`text-xs font-semibold ${config.textColor}`}>
              {config.label}
            </span>
          </div>
          <Link
            href={`/order-history/${order.id}`}
            className="group flex items-center gap-2 px-0 py-1 text-[11px] font-semibold text-[#6B6662] hover:text-[#4A90E2] transition-colors duration-300 relative"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#4A90E2] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-[#6B6662]">Total Weight:</span>
          <span className="font-medium text-[#2C2826]">
            {order.totalWeight ? `${order.totalWeight} kg` : `-`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#6B6662]">Total:</span>
          <span className="font-bold text-[#FF6B4A]">
            {!order.totalPrice || order.totalPrice === 0
              ? "-"
              : formatIDR(order.totalPrice)}
          </span>
        </div>
        <div className="pt-4 border-t border-[#E5DDD3]">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-[#6B6662] mb-1">Pickup:</p>
              <p className="text-[#2C2826] font-medium">
                {order?.pickupAddress?.address},{" "}
                {order?.pickupAddress?.cityName
                  ?.toLowerCase()
                  .replace(/\b\w/g, (c: any) => c.toUpperCase())}
              </p>
            </div>
            <div>
              <p className="text-[#6B6662] mb-1">Delivery:</p>
              <p className="text-[#2C2826] font-medium">
                {order?.deliveryAddress?.address},{" "}
                {order?.deliveryAddress?.cityName
                  ?.toLowerCase()
                  .replace(/\b\w/g, (c: any) => c.toUpperCase())}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- ACTION SECTION --- */}

      {lastStatus === "scheduled" && (
        <div className="w-full px-4 py-3 rounded-xl bg-gray-100 text-[#6B6662] font-semibold flex items-center justify-center gap-2 border border-dashed border-gray-300">
          <Clock className="w-4 h-4 animate-spin-slow" /> Laundry will be pickup
          at {formatScheduleDateTime(order?.scheduleTime)}
        </div>
      )}

      {(lastStatus === "waiting_pickup" ||
        lastStatus === "on_the_way_to_outlet") && (
        <div className="w-full px-4 py-3 rounded-xl bg-gray-100 text-[#6B6662] font-semibold flex items-center justify-center gap-2 border border-dashed border-gray-300">
          <Clock className="w-4 h-4 animate-spin-slow" /> Waiting for driver to
          arrive at outlet...
        </div>
      )}

      {lastStatus === "arrived_outlet" && !order?.totalPrice && (
        <div className="w-full px-4 py-3 rounded-xl bg-orange-50 text-[#FF6B4A] font-semibold flex items-center justify-center gap-2 border border-[#FF6B4A]">
          <Package className="w-4 h-4" /> Awaiting admin price review...
        </div>
      )}

      {order?.totalPrice > 0 &&
        lastPayment?.status === "pending" &&
        !["delivering", "completed"].includes(lastStatus) && (
          <div>
            <button
              disabled={isPayment}
              onClick={handlePayment}
              className="w-full px-4 py-3 rounded-xl bg-[#FF6B4A] text-white font-semibold hover:bg-[#FF5533] transition-all shadow-md flex items-center justify-center gap-2 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed hover:scale-[1.02]"
            >
              {isPayment ? (
                <div className="flex gap-2">
                  <FiLoader className="w-5 h-5 animate-spin" />
                  <span>Payment...</span>
                </div>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" /> Pay Now
                </>
              )}
            </button>
            <p className="text-[10px] text-red-600 mt-3 text-center italic">
              ⚠️ Laundry will be delivered once payment is completed
            </p>
          </div>
        )}

      {lastPayment?.status === "paid" &&
        !["delivering", "completed"].includes(lastStatus) && (
          <div className="space-y-3">
            <button
              onClick={() => setShowInvoice(true)}
              className="w-full px-4 py-3 rounded-xl bg-[#4A90E2] hover:bg-[#2d84e7] text-white font-bold transition-all shadow-lg flex items-center justify-center"
            >
              View Invoice
            </button>
            <div className="flex items-center justify-center gap-2 text-[10px] mt-3 text-center italic">
              <Truck className="w-3 h-3 text-blue-600" />
              <p className="text-blue-800">
                Your laundry is now in the queue. We'll deliver it soon!
              </p>
            </div>
          </div>
        )}

      {lastStatus === "delivering" && (
        <div>
          <button
            onClick={() =>
              confirmOrder(order.id, async () => {
                if (getOrder) await getOrder();
              })
            }
            disabled={isConfirming}
            className={`w-full px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${isConfirming ? "bg-gray-400" : "bg-green-600 text-white hover:bg-green-700"}`}
          >
            {isConfirming ? (
              "Processing..."
            ) : (
              <>
                <CheckCircle className="w-4 h-4" /> Confirm Order Received
              </>
            )}
          </button>
          <p className="text-[10px] text-gray-500 mt-3 text-center italic">
            Auto-confirmed in 3 days if no complaint
          </p>
          {!lastComplaint || !lastComplaint.adminResponse ? (
            <ButtonComplaint id={order.id} />
          ) : (
            <ButtonResponse isLoading={isLoading} id={order.id} />
          )}
        </div>
      )}

      {lastStatus === "completed" && (
        <div className="space-y-3">
          <button
            onClick={() => setShowInvoice(true)}
            className="w-full px-4 py-3 rounded-xl bg-[#4A90E2] hover:bg-[#2d84e7] text-white font-bold shadow-lg flex items-center justify-center"
          >
            View Invoice
          </button>
          {!lastComplaint || !lastComplaint.adminResponse ? (
            <ButtonComplaint id={order.id} />
          ) : (
            <ButtonResponse isLoading={isLoading} id={order.id} />
          )}
        </div>
      )}

      {showInvoice && (
        <InvoicePage order={order} setShowInvoice={setShowInvoice} />
      )}
    </div>
  );
}
