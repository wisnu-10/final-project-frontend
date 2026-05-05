"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Krusial buat navigasi
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  Calendar,
  CreditCard,
  Truck,
  Search,
  Filter,
  X,
  Plus,
} from "lucide-react";
import BackLink from "@/components/backLink";
import FilterOrderHistory from "./component/filterOrderHistory";
import OrderList from "./component/orderList";
import { useGetAllOrder } from "@/features/order-customer/hooks/useGetAllOrder";
import Pagination from "./component/pagination";
import Loading from "@/components/loading";
import PageError from "@/components/pageError";
import RequestPickupForm from "./component/requestPickupForm";
import PaymentModal from "./component/paymentModal";

type OrderStatus =
  | "waiting_pickup"
  | "on_the_way_to_outlet"
  | "arrived_outlet"
  | "washing"
  | "ironing"
  | "packing"
  | "waiting_payment"
  | "ready_delivery"
  | "delivering"
  | "completed"
  | "cancelled";

type PaymentStatus = "pending" | "paid" | "failed" | "expired";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  items: number;
  total: number;
  pickupAddress: string;
  deliveryAddress: string;
  deliveredAt?: string;
  confirmedAt?: string;
}

export default function CustomerOrderHistory() {
  const {
    isLoading,
    isError,
    order,
    getOrder,
    totalPage,
    totalOrder,
    currentPage,
  } = useGetAllOrder();

  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (isLoading) return <Loading />;

  if (isError) return <PageError />;

  return (
    <div className="w-full flex flex-col items-center mx-auto bg-[#FAF6F1] pt-28 pb-28 px-4">
      <div className="max-w-2xl w-full">
        <div className="mb-4">
          <BackLink link="/" page="Home" />
        </div>
        {/* Header */}
        <div className="w-full max-w-2xl flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#2C2826]">My Orders</h2>
            <p className="text-sm text-[#6B6662]">
              View and track all your orders
            </p>
          </div>
          <button
            onClick={() => setShowRequestForm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF6B4A] to-[#FF8A6E] text-white hover:bg-[#fa502a] hover:scale-110 transition-all shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Request Pickup</span>
          </button>
        </div>

        <FilterOrderHistory
          order={order?.orders}
          getOrder={getOrder}
          
          setShowPaymentModal={setShowPaymentModal}
          setSelectedOrder={setSelectedOrder}
          isLoading={isLoading}
          isError={isError}
        />

        
      </div>

      <Pagination
        order={order?.orders || []}
        totalOrder={totalOrder || 1}
        totalPage={totalPage || 0}
        currentPage={currentPage}
        pageSize={10}
        onPageChange={(newPage) => {
          getOrder({ page: newPage });
        }}
      />

      {showRequestForm && (
        <RequestPickupForm
          setShowRequestForm={setShowRequestForm}
          getOrder={getOrder}
        />
      )}
    </div>
  );
}
