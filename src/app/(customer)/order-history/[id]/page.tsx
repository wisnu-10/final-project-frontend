"use client";

import React, { useState } from "react";
import {
  Package,
  X,
  UserIcon,
  Phone,
  CreditCard,
  Clock,
  Calendar,
  MapPin,
  Building2,
  CheckCircle,
  Truck,
  XCircle,
  Timer,
  WashingMachine,
  ShoppingBag,
} from "lucide-react";
import { useGetIdOrder } from "@/features/order-customer/hooks/useGetIdOrder";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/components/loading";
import PageError from "@/components/pageError";
import OrderDetailSkeleton from "@/components/orderDetailSkeleton";
import { formatIDR } from "@/utils/formatCurrency.utils";
import { getStatusConfig } from "@/utils/orderStatus.utils";
import TrackingOrder from "./component/trackingOrder";

export default function OrderDetailStatic() {
  const { id } = useParams();
  const router = useRouter();

  const [showTracking, setShowTracking] = useState(false);

  const { data, isLoading, error } = useGetIdOrder(id as string);

  if (isLoading) return <OrderDetailSkeleton />;

  if (error || !data) return <PageError />;

  const statusConfig = getStatusConfig(
    data?.statusLogs[data?.statusLogs.length - 1]?.status,
  );
  const StatusIcon = statusConfig.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Modal Header with Gradient */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-[#FF6B4A] to-[#FF8A6E] p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Order DL_{data?.id?.slice(0, 8).toUpperCase()}
                  </h2>
                  <p className="text-sm text-white/90">
                    {new Date(data?.createdAt).toLocaleDateString("en-EN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm shadow-lg">
                <StatusIcon className={`w-4 h-4 ${statusConfig.textColor}`} />
                <span className={`font-bold text-sm ${statusConfig.textColor}`}>
                  {statusConfig.label}
                </span>
              </div>
            </div>
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5 text-[#2C2826]" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Customer Information Card */}
            <div className="bg-gradient-to-br from-[#FFF5F2] to-white rounded-2xl p-5 border-2 border-[#FFE5DD] shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B4A] flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-[#2C2826] text-lg">
                  Customer Info
                </h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-[#6B6662] mb-1">Recipient Name</p>
                  <p className="font-semibold text-[#2C2826]">
                    {data?.pickupAddress?.recipientName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6B6662] mb-1">
                    Recipient Phone Number
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#FF6B4A]/10 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-[#FF6B4A]" />
                    </div>
                    <p className="font-medium text-[#2C2826]">
                      {data?.pickupAddress?.recipientPhoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Card */}
            <div className="bg-gradient-to-br from-[#EFF6FF] to-white rounded-2xl p-5 border-2 border-[#D4E7FF] shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#4A90E2] flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-[#2C2826] text-lg">
                  Order Summary
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B6662]">Total Weight</span>
                  <span className="font-bold text-[#2C2826] text-lg">
                    {data?.totalWeight || 0} kg
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-b border-[#E5DDD3]">
                  <span className="text-sm text-[#6B6662]">Total Amount</span>
                  <span className="font-bold text-[#FF6B4A] text-xl">
                    {formatIDR(data?.totalPrice || 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6B6662]">Payment Status</span>
                  <span className="font-bold text-green-600 uppercase">
                    {data?.payments?.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Addresses Section */}
          <div className="space-y-4">
            <h3 className="font-bold text-[#2C2826] text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#FF6B4A]" /> Addresses
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Pickup */}
              <div className="relative bg-white border-2 border-[#FFE5DD] rounded-2xl p-4">
                <div className="absolute -top-3 left-4 px-3 py-1 bg-[#FF6B4A] rounded-full shadow-md text-[10px] font-bold text-white uppercase">
                  Pickup
                </div>
                <div className="mt-3">
                  <p className="font-semibold text-[#2C2826]">
                    {data?.pickupAddress?.address}
                  </p>
                  <p className="text-sm text-[#6B6662]">
                    {data?.pickupAddress?.districtName},{" "}
                    {data?.pickupAddress?.cityName},{" "}
                    {data?.pickupAddress?.provinceName}{" "}
                    {data?.pickupAddress?.postalCode}
                  </p>
                  <p className="text-xs text-[#FF6B4A] mt-2 italic">
                    Note: {data?.pickupAddress?.notes}
                  </p>
                </div>
              </div>
              {/* Delivery */}
              <div className="relative bg-white border-2 border-[#D4E7FF] rounded-2xl p-4">
                <div className="absolute -top-3 left-4 px-3 py-1 bg-[#4A90E2] rounded-full shadow-md text-[10px] font-bold text-white uppercase">
                  Delivery
                </div>
                <div className="mt-3">
                  <p className="font-semibold text-[#2C2826]">
                    {data?.deliveryAddress?.address}
                  </p>
                  <p className="text-sm text-[#6B6662]">
                    {data?.deliveryAddress?.districtName},{" "}
                    {data?.deliveryAddress?.cityName},{" "}
                    {data?.deliveryAddress?.provinceName}{" "}
                    {data?.deliveryAddress?.postalCode}
                  </p>
                  <p className="text-xs text-[#4A90E2] mt-2 italic">
                    Note: {data?.deliveryAddress?.notes}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Outlet Info */}
          <div className="bg-[#FAF6F1] border-2 border-[#E5DDD3] rounded-2xl p-5">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-[#FF6B4A]" />
              <div>
                <h3 className="font-bold text-[#2C2826]">
                  Outlet: {data?.outlet?.name}
                </h3>
                <p className="text-sm text-[#6B6662]">
                  {data?.outlet?.address}, {data?.outlet?.districtName},{" "}
                  {data?.outlet?.cityName}, {data?.outlet?.provinceName}{" "}
                  {data?.outlet?.postalCode}
                </p>
              </div>
            </div>
          </div>
          <div className="sticky bottom-0 bg-white border-t border-[#E5DDD3] p-6 rounded-b-3xl">
            <button
              onClick={() => setShowTracking(true)}
              className="w-full px-6 py-3 rounded-xl bg-[#4A90E2] hover:bg-[#2d84e7] duration-300 text-white font-bold hover:shadow-xl transition-all shadow-lg"
            >
              Tracking your Order
            </button>
          </div>
        </div>

        {showTracking && (
          <TrackingOrder
            data={data}
            onClose={() => setShowTracking(false)}
            isLoading={isLoading}
            error={error}
          />
        )}
      </div>
    </div>
  );
}
