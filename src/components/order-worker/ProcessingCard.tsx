import React from "react";
import { Order } from "@/types/order.dto";
import { WashingMachine, Wind, Package } from "lucide-react";

interface ProcessingCardProps {
  order: Order;
  onComplete: () => void;
}

export const ProcessingCard: React.FC<ProcessingCardProps> = ({ order, onComplete }) => {
  const currentStatus = order.statusLogs?.[0]?.status || "washing";

  const getStatusIcon = () => {
    switch (currentStatus) {
      case "washing": return <WashingMachine className="w-10 h-10 text-[#FF6B4A]" />;
      case "ironing": return <Wind className="w-10 h-10 text-[#FF6B4A]" />;
      case "packing": return <Package className="w-10 h-10 text-[#FF6B4A]" />;
      default: return <WashingMachine className="w-10 h-10 text-[#FF6B4A]" />;
    }
  };

  return (
    <div className="bg-white rounded-[40px] p-8 shadow-xl border border-[#E8E2DA] flex flex-col items-center text-center">
      <div className="w-20 h-20 bg-[#FFF5F2] rounded-full flex items-center justify-center mb-6">
        {getStatusIcon()}
      </div>

      <h2 className="text-[28px] font-bold text-[#2C2826] mb-1">
        Processing #{order.id.slice(0, 4)}
      </h2>
      <p className="text-[#6B6662] font-medium mb-8">
        {order.customer?.firstName} {order.customer?.lastName}
      </p>

      <div className="w-full bg-[#FAF8F6] rounded-[32px] p-6 mb-8 text-left">
        <p className="text-[#6B6662] text-sm font-bold mb-6">Expected Items:</p>
        <div className="grid grid-cols-3 gap-4">
          {order.orderItems?.map((item) => (
            <div key={item.id} className="text-center">
              <p className="text-[24px] font-bold text-[#2C2826] leading-none mb-1">
                {item.quantity}
              </p>
              <p className="text-[10px] font-bold text-[#6B6662] uppercase tracking-wider">
                {item.laundryItem.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onComplete}
        className="w-full bg-[#FF6B4A] hover:bg-[#EF5B3A] text-white font-bold py-5 rounded-[24px] shadow-lg shadow-[#FF6B4A]/20 transition-all active:scale-[0.98]"
      >
        Complete & Verify
      </button>
    </div>
  );
};
