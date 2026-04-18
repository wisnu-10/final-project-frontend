"use client";

import Loading from "@/components/loading";
import PageError from "@/components/pageError";
import {
  CheckCircle,
  CreditCard,
  MapPin,
  Package,
  ShoppingBag,
  Timer,
  Truck,
  WashingMachine,
  X,
} from "lucide-react";

interface TrackingOrderProps {
  data: any;
  isLoading: boolean;
  error: boolean;
  onClose: (value: boolean) => void;
}

export default function TrackingOrder({
  data,
  isLoading,
  error,
  onClose,
}: TrackingOrderProps) {
  if (isLoading) return <Loading />;
  if (error || !data) return <PageError />;

  const orderStatus = [
    { id: "waiting_pickup", label: "Waiting Pickup", icon: Timer },
    { id: "on_the_way_to_outlet", label: "Driver Heading to You", icon: Truck },
    { id: "arrived_outlet", label: "Arrived at Outlet", icon: MapPin },
    { id: "washing", label: "Washing & Cleaning", icon: WashingMachine },
    { id: "ironing", label: "Ironing", icon: ShoppingBag },
    { id: "packing", label: "Packing", icon: Package },
    { id: "waiting_payment", label: "Waiting Payment", icon: CreditCard },
    { id: "ready_delivery", label: "Ready for Delivery", icon: CheckCircle },
    { id: "delivering", label: "On the Way to You", icon: Truck },
    { id: "completed", label: "Completed", icon: CheckCircle },
  ];

  const orders = data;

  // Logic ambil status terakhir dari logs
  const currentStatus = orders?.statusLogs?.[0]?.status?.toLowerCase() || "";
  const currentOrderIndex = orderStatus.findIndex(
    (step) => step.id === currentStatus,
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm space-y-1">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-[#FF6B4A] to-[#FF8A6E] p-6 border-b border-gray-100 flex justify-between items-center z-20">
          <h2 className="text-xl font-bold text-white">Order Tracking</h2>
          <button
            onClick={() => onClose(false)}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5 text-[#2C2826]" />
          </button>
        </div>

        <div className="p-8">
          {!orders || (Array.isArray(orders) && orders.length === 0) ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
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
            <div className="space-y-0">
              {orderStatus.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentOrderIndex;
                const isCompleted = index < currentOrderIndex;
                const isLast = index === orderStatus.length - 1;

                return (
                  <div key={step.id} className="relative flex gap-6">
                    {/* Connector Line */}
                    {!isLast && (
                      <div
                        className={`absolute left-[19px] top-10 w-0.5 h-12 ${
                          isCompleted ? "bg-[#FF6B4A]" : "bg-[#E5DDD3]"
                        }`}
                      />
                    )}

                    {/* Icon Container */}
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

                    {/* Description Content */}
                    <div className="flex-1 pb-10">
                      <p
                        className={`font-bold ${isActive ? "text-[#FF6B4A]" : "text-[#2C2826]"}`}
                      >
                        {step.label}
                      </p>

                      {isActive && (
                        <p className="text-sm text-[#6B6662] mt-1 animate-pulse">
                          {step.id === "completed"
                            ? "Your laundry is ready for pickup!"
                            : "In progress... Please wait a moment"}
                        </p>
                      )}

                      {isCompleted && (
                        <p className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Done
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
