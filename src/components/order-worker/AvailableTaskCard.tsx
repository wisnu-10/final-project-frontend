import React from "react";
import { Order } from "@/types/order.dto";
import { PlayCircle } from "lucide-react";

interface AvailableTaskCardProps {
  order: Order;
  onAccept: (orderId: string) => void;
  isAccepting: boolean;
}

export const AvailableTaskCard: React.FC<AvailableTaskCardProps> = ({
  order,
  onAccept,
  isAccepting,
}) => {
  const currentStatus = order.statusLogs?.[0]?.status || "washing";

  return (
    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-[#E8E2DA] mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-[#2C2826]">#{order.id.slice(0, 4)}</h3>
        <span className="bg-[#EEF4FB] text-[#4A90D9] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          T{order.id.slice(-3).toUpperCase()}
        </span>
      </div>
      
      <p className="text-[#6B6662] font-medium mb-6">
        {order.customer?.firstName} {order.customer?.lastName}
      </p>

      <div className="bg-[#FAF8F6] rounded-2xl p-5 mb-6">
        <p className="text-[#6B6662] text-sm font-bold mb-3">Expected Items:</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {order.orderItems?.map((item) => (
            <div key={item.id} className="text-sm">
              <span className="text-[#2C2826] font-medium">{item.laundryItem.name}: </span>
              <span className="text-[#2C2826] font-bold">{item.quantity}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onAccept(order.id)}
        disabled={isAccepting}
        className="w-full bg-[#FF6B4A] hover:bg-[#EF5B3A] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#FF6B4A]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isAccepting ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          "Start Processing"
        )}
      </button>
    </div>
  );
};
