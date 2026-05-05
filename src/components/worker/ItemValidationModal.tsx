"use client";

import { useState } from "react";
import { AlertTriangle, X, Plus, Minus, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import useCreateBypassRequest from "@/features/bypass-request/hooks/useCreateBypassRequest";

interface LaundryItemWithQuantity {
  id: string;
  name: string;
  expectedQuantity: number;
  pricingType: "kiloan" | "per_item";
}

interface ItemValidationModalProps {
  orderId: string;
  items: LaundryItemWithQuantity[];
  totalExpectedItems: number;
  currentStation: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ItemValidationModal({
  orderId,
  items,
  totalExpectedItems,
  currentStation,
  onClose,
  onSuccess,
}: ItemValidationModalProps) {
  const [actualQuantities, setActualQuantities] = useState<Record<string, number>>(
    items.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {})
  );
  const [bypassNotes, setBypassNotes] = useState("");
  const [showBypassForm, setShowBypassForm] = useState(false);

  const { handleCreate: createBypassRequest, loading: isBypassLoading } = useCreateBypassRequest(() => {
    onSuccess?.();
    onClose();
  });

  const totalActualItems = Object.values(actualQuantities).reduce((a, b) => a + b, 0);
  const isMatching = totalActualItems === totalExpectedItems;
  const isMismatched = totalActualItems > 0 && !isMatching;

  const handleQuantityChange = (itemId: string, change: number) => {
    setActualQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(0, prev[itemId] + change),
    }));
  };

  const handleSubmitBypass = async () => {
    if (!bypassNotes.trim()) {
      toast.error("Please provide notes for the bypass request");
      return;
    }

    await createBypassRequest(orderId, {
      notes: bypassNotes,
      expectedQuantity: totalExpectedItems,
      actualQuantity: totalActualItems,
      station: currentStation,
    });
  };

  const handleValidationSuccess = () => {
    toast.success("Items validated successfully!");
    onSuccess?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-lg font-bold text-gray-900">Item Validation</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[70vh] px-4 py-4">
          {/* Expected vs Actual */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">
                Expected
              </p>
              <p className="text-2xl font-bold text-blue-700">{totalExpectedItems}</p>
              <p className="text-xs text-blue-600">items</p>
            </div>
            <div
              className={`rounded-lg p-3 border font-bold transition-all ${
                isMatching
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-orange-50 border-orange-200 text-orange-700"
              }`}
            >
              <p className="text-xs uppercase tracking-wide mb-1">
                {isMatching ? "Actual" : "Actual Count"}
              </p>
              <p className="text-2xl">{totalActualItems}</p>
              <p className="text-xs">{isMatching ? "✓ Match" : "Mismatch"}</p>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-3 mb-4">
            <p className="text-sm font-semibold text-gray-700">Re-input Items:</p>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    Expected: {item.expectedQuantity} {item.pricingType === "kiloan" ? "kg" : "item(s)"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="p-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-md transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="w-10 text-center">
                    <p className="font-bold text-gray-900">{actualQuantities[item.id]}</p>
                  </div>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="p-1 bg-green-100 hover:bg-green-200 text-green-600 rounded-md transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Status Alert */}
          {isMismatched && (
            <div className="flex gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg mb-4">
              <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-orange-900 text-sm">Items Mismatch</p>
                <p className="text-xs text-orange-700 mt-1">
                  You counted {totalActualItems} items but expected {totalExpectedItems}. You'll need
                  to request a bypass approval.
                </p>
              </div>
            </div>
          )}

          {/* Bypass Request Form */}
          {isMismatched && (
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Bypass Request Notes
              </label>
              <textarea
                value={bypassNotes}
                onChange={(e) => setBypassNotes(e.target.value)}
                placeholder="Explain why the count is different (e.g., damaged items, customer error, etc.)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                rows={3}
              />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-4 space-y-2 rounded-b-3xl">
          {isMatching ? (
            <button
              onClick={handleValidationSuccess}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <CheckCircle2 className="w-5 h-5" />
              Confirm Items
            </button>
          ) : isMismatched ? (
            <button
              onClick={handleSubmitBypass}
              disabled={isBypassLoading || !bypassNotes.trim()}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              {isBypassLoading ? "Submitting..." : "Request Bypass Approval"}
            </button>
          ) : null}

          <button
            onClick={onClose}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-4 rounded-xl transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
