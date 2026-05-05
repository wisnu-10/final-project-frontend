import React from "react";
import { MapPin, Clock, User } from "lucide-react";
import { Order } from "@/types/order.dto";
import { StatusBadge } from "./StatusBadge";

interface OrderCardProps {
  order: Order;
  children?: React.ReactNode;
  className?: string;
  showCustomer?: boolean;
  showAddress?: boolean;
  showTime?: boolean;
}

export function OrderCard({
  order,
  children,
  className = "",
  showCustomer = true,
  showAddress = true,
  showTime = true,
}: OrderCardProps) {
  const currentStatus =
    order.statusLogs?.[0]?.status || "unknown";
  const createdDate = new Date(order.createdAt);
  const customerName = order.customer?.firstName
    ? `${order.customer.firstName} ${order.customer.lastName}`
    : order.customerName || "Unknown";

  const displayAddress =
    order.deliveryAddress?.address ||
    order.pickupAddress?.address ||
    "No address";

  return (
    <div
      className={`bg-white rounded-2xl p-5 shadow-sm border border-[#E8E2DA] transition-all duration-200 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <StatusBadge status={currentStatus} />
        <span className="text-xs text-[#6B6662] font-medium">
          #{order.id?.slice(0, 8) || "N/A"}
        </span>
      </div>

      {/* Customer Name */}
      {showCustomer && (
        <div className="flex items-center gap-2 mb-3">
          <User className="w-4 h-4 text-[#6B6662]" />
          <h4 className="font-bold text-sm text-[#2C2826]">{customerName}</h4>
        </div>
      )}

      {/* Address */}
      {showAddress && (
        <div className="flex items-start gap-2 mb-4">
          <MapPin className="w-4 h-4 text-[#6B6662] mt-0.5 shrink-0" />
          <p className="text-xs text-[#6B6662] line-clamp-2">
            {displayAddress}
          </p>
        </div>
      )}

      {/* Time */}
      {showTime && (
        <div className="flex items-center gap-2 mb-4 text-xs text-[#6B6662]">
          <Clock className="w-4 h-4" />
          <span>
            {createdDate.toLocaleDateString()}{" "}
            {createdDate.toLocaleTimeString()}
          </span>
        </div>
      )}

      {/* Children (buttons, actions) */}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
