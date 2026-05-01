import React, { useState } from "react";
import { Order } from "@/types/order.dto";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

interface VerificationWizardProps {
  order: Order;
  onSubmit: (actualCounts: Record<string, number>) => void;
  onBypass: (actualCounts: Record<string, number>, discrepancies: string[]) => void;
  onCancel: () => void;
}

export const VerificationWizard: React.FC<VerificationWizardProps> = ({
  order,
  onSubmit,
  onBypass,
  onCancel,
}) => {
  const [actualCounts, setActualCounts] = useState<Record<string, number>>(
    order.orderItems?.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {}) || {}
  );
  const [showDiscrepancy, setShowDiscrepancy] = useState(false);
  const [discrepancies, setDiscrepancies] = useState<string[]>([]);

  const handleInputChange = (itemId: string, value: string) => {
    const val = parseInt(value) || 0;
    setActualCounts((prev) => ({ ...prev, [itemId]: val }));
  };

  const handleVerify = () => {
    const newDiscrepancies: string[] = [];
    order.orderItems?.forEach((item) => {
      const actual = actualCounts[item.id] || 0;
      if (actual !== item.quantity) {
        newDiscrepancies.push(`${item.laundryItem.name}: Expected ${item.quantity}, Found ${actual}`);
      }
    });

    if (newDiscrepancies.length > 0) {
      setDiscrepancies(newDiscrepancies);
      setShowDiscrepancy(true);
    } else {
      onSubmit(actualCounts);
    }
  };

  if (showDiscrepancy) {
    return (
      <div className="bg-white rounded-[40px] p-8 shadow-xl border border-[#E8E2DA] text-center">
        <div className="w-16 h-16 bg-[#FFF2F2] rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-[#FF6B4A]" />
        </div>
        
        <h2 className="text-[24px] font-bold text-[#2C2826] mb-2">Count Discrepancy Detected</h2>
        <p className="text-[#6B6662] text-sm mb-8 px-4">
          The actual count doesn't match the expected count. Please request admin approval to proceed.
        </p>

        <div className="bg-[#FFF2F2] rounded-[24px] p-6 mb-8 text-left border border-[#FFE4E4]">
          <p className="text-[#FF6B4A] text-xs font-bold uppercase tracking-wider mb-2">Discrepancies:</p>
          {discrepancies.map((d, i) => (
            <p key={i} className="text-[#2C2826] text-sm font-medium">{d}</p>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setShowDiscrepancy(false)}
            className="flex-1 border border-[#E8E2DA] text-[#6B6662] font-bold py-4 rounded-2xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onBypass(actualCounts, discrepancies)}
            className="flex-2 bg-[#FF6B4A] hover:bg-[#EF5B3A] text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-[#FF6B4A]/20"
          >
            Request Bypass to Admin
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[40px] p-8 shadow-xl border border-[#E8E2DA]">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-[#EEF9F2] rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6 text-[#4CAF50]" />
        </div>
        <div>
          <h2 className="text-[20px] font-bold text-[#2C2826] leading-tight">Quantity Re-check</h2>
          <p className="text-[#6B6662] text-xs">Please verify the actual count</p>
        </div>
      </div>

      <div className="space-y-6 mb-10">
        {order.orderItems?.map((item) => (
          <div key={item.id}>
            <label className="block text-[#6B6662] text-sm font-bold mb-2 ml-1">
              {item.laundryItem.name} (Expected: {item.quantity})
            </label>
            <input
              type="number"
              placeholder="Actual count"
              className="w-full bg-[#FAF8F6] border border-[#E8E2DA] rounded-2xl px-6 py-4 text-[#2C2826] font-bold focus:outline-none focus:border-[#4A90D9] transition-colors"
              value={actualCounts[item.id] || ""}
              onChange={(e) => handleInputChange(item.id, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleVerify}
        className="w-full bg-[#4A90D9] hover:bg-[#3A80C9] text-white font-bold py-5 rounded-2xl shadow-lg shadow-[#4A90D9]/20 transition-all active:scale-[0.98]"
      >
        Submit Verification
      </button>
    </div>
  );
};
