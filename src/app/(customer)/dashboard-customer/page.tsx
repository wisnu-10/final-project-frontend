"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  MapPin,
  Calendar,
  Clock,
  Package,
  Truck,
  WashingMachine,
  CheckCircle,
  Home,
  User,
  Receipt,
  ChevronRight,
  X,
  Briefcase,
  MapPinned,
  Check,
  Timer,
  ShoppingBag,
  CreditCard,
} from "lucide-react";
import RequestPickupForm from "../order-history/component/requestPickupForm";
import BackLink from "@/components/backLink";
import { useGetAllOrder } from "@/features/order-customer/hooks/useGetAllOrder";
import Loading from "@/components/loading";
import PageError from "@/components/pageError";

export default function CustomerDashboard() {
  const [showRequestForm, setShowRequestForm] = useState(false);

  const { order, isLoading, isError, getOrder } = useGetAllOrder();

  const orderStatus = {
    steps: [
      { id: "waiting_pickup", label: "Waiting Pickup", icon: Timer },
      {
        id: "on_the_way_to_outlet",
        label: "Driver Heading to You",
        icon: Truck,
      },
      { id: "arrived_outlet", label: "Arrived at Outlet", icon: MapPin },
      { id: "washing", label: "Washing & Cleaning", icon: WashingMachine },
      { id: "ironing", label: "Ironing", icon: ShoppingBag }, // Pake icon strika kalau ada
      { id: "packing", label: "Packing", icon: Package },
      { id: "waiting_payment", label: "Waiting Payment", icon: CreditCard },
      { id: "ready_delivery", label: "Ready for Delivery", icon: CheckCircle },
      { id: "delivering", label: "On the Way to You", icon: Truck },
      { id: "completed", label: "Completed", icon: CheckCircle },
    ],
  };

  const orders = (order as any)?.orders?.orders || [];
  const firstOrder = orders[0];

  const currentOrder = orderStatus.steps.findIndex(
    (step: any) => step.id === firstOrder?.statusLogs[0]?.status?.toLowerCase(),
  );

  if (isLoading) return <Loading />;

  if (isError) return <PageError />;

  return (
    <div className="min-h-screen bg-[#FAF6F1] pt-28 pb-28">
      {/* Main Content */}
      <main className="max-w-lg mx-auto p-4 space-y-4">
        <BackLink link="/" page="Home" />
        <>
          {showRequestForm && (
            <RequestPickupForm
              setShowRequestForm={setShowRequestForm}
              getOrder={getOrder}
            />
          )}

          {/* Need Pickup Button Card */}
          <button
            onClick={() => setShowRequestForm(true)}
            className="w-full bg-gradient-to-r from-[#FF6B4A] to-[#FF8A6E] rounded-2xl shadow-lg p-6 text-left hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-2">
                  Need a Pickup?
                </h2>
                <p className="text-sm text-white/90 leading-relaxed">
                  Schedule your laundry pickup in just a few taps
                </p>
              </div>
              <ChevronRight className="w-8 h-8 text-white flex-shrink-0" />
            </div>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm">
              <Package className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">
                Request Pickup
              </span>
            </div>
          </button>

          {/* Order Tracking Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#2C2826]">
                Order Tracking
              </h2>
              <span className="px-3 py-1 rounded-full bg-[#FFF5F2] text-xs font-semibold text-[#FF6B4A]">
                {firstOrder
                  ? `Order #${firstOrder.id.slice(0, 5).toUpperCase()}`
                  : null}
              </span>
            </div>

            {/* Vertical Stepper */}
            <div className="space-y-1">
              {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  {/* Pake icon atau gambar biar asik */}
                  <div className="w-20 h-20 bg-[#FFF5F2] rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-[#FF6B4A] opacity-50" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C2826]">
                    No Active Orders
                  </h3>
                  <p className="text-[#6B6662] max-w-[250px] mt-2 text-sm leading-relaxed">
                    Looks like you haven't placed any laundry orders yet.
                  </p>
                </div>
              ) : (
                orderStatus.steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === currentOrder;
                  const isCompleted = index < currentOrder;
                  const isLast = index === orderStatus.steps.length - 1;

                  return (
                    <div key={step.id} className="relative flex gap-4">
                      {/* Connector Line */}
                      {!isLast && (
                        <div
                          className={`absolute left-[19px] top-10 w-0.5 h-12 ${
                            isCompleted ? "bg-[#FF6B4A]" : "bg-[#E5DDD3]"
                          }`}
                        />
                      )}

                      {/* Icon */}
                      <div
                        className={`relative w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                          isActive
                            ? "bg-[#FF6B4A] shadow-lg shadow-[#FF6B4A]/30"
                            : isCompleted
                              ? "bg-[#FF6B4A]"
                              : "bg-[#E5DDD3]"
                        }`}
                      >
                        {isActive && (
                          <span className="absolute inset-0 rounded-full bg-[#FF6B4A] animate-ping opacity-75"></span>
                        )}
                        <Icon
                          className={`w-5 h-5 ${
                            isActive || isCompleted
                              ? "text-white"
                              : "text-[#6B6662]"
                          }`}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-6">
                        <p
                          className={`font-semibold mb-1 ${
                            isActive ? "text-[#FF6B4A]" : "text-[#2C2826]"
                          }`}
                        >
                          {step.label}
                        </p>

                        {step.id === "completed" && isActive && (
                          <p className="text-sm text-[#6B6662]">
                            Your laundry is ready for pickup!
                          </p>
                        )}

                        {isActive && step.id !== "completed" && (
                          <p className="text-sm text-[#6B6662]">
                            In progress... Estimated completion in 30 mins
                          </p>
                        )}
                        {isCompleted && (
                          <p className="text-sm text-[#6B6662]">Completed</p>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      </main>

      {/* Request Pickup Modal will be rendered inside main content */}
    </div>
  );
}
