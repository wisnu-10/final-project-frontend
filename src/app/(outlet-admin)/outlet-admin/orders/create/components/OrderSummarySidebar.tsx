import { FiDollarSign } from "react-icons/fi";
import { formatIDR } from "@/utils/formatCurrency.utils";

interface OrderSummarySidebarProps {
  values: any;
  touched: any;
  errors: any;
  handleChange: any;
  handleBlur: any;
  workers: any[];
  laundryItems: any[];
  createLoading: boolean;
}

export default function OrderSummarySidebar({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  workers,
  laundryItems,
  createLoading,
}: OrderSummarySidebarProps) {
  const calcEstimatedTotal = () => {
    const kiloanPrice = laundryItems.find((li) => li.pricingType === "kiloan")?.price || 0;
    const weightPrice = Number(values.totalWeight) * Number(kiloanPrice);
    const itemsPrice = values.orderItems.reduce((sum: number, item: any) => {
      const laundryItem = laundryItems.find((li: any) => li.id === item.laundryItemId);
      if (laundryItem && laundryItem.pricingType === "per_item") {
        return sum + Number(laundryItem.price) * item.quantity;
      }
      return sum;
    }, 0);
    return weightPrice + itemsPrice;
  };

  const kiloanItem = laundryItems.find((li) => li.pricingType === "kiloan");
  const estimatedTotal = calcEstimatedTotal();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Specs & Worker</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Total Weight (kg)</label>
            <input
              type="number"
              name="totalWeight"
              step="0.1"
              min="0.1"
              value={values.totalWeight}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="0.0"
              className={`w-full px-4 py-2 border rounded-xl text-lg font-bold text-gray-800 focus:ring-2 focus:ring-[#ff7143] outline-none transition-all ${
                touched.totalWeight && errors.totalWeight ? "border-red-500 bg-red-50/20" : "bg-orange-50/30 border-orange-100"
              }`}
            />
            {touched.totalWeight && errors.totalWeight && (
              <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.totalWeight as string}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Worker assignment</label>
            <select
              name="workerId"
              value={values.workerId}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-xl text-sm bg-white transition-all outline-none ${
                touched.workerId && errors.workerId ? "border-red-500 bg-red-50/20" : "border-gray-200 focus:ring-2 focus:ring-[#ff7143]/20"
              }`}
            >
              <option value="">Select worker...</option>
              {workers.map((w: any) => (
                <option key={w.id} value={w.id}>
                  {w.firstName} {w.lastName}
                </option>
              ))}
            </select>
            {touched.workerId && errors.workerId && (
              <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.workerId}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-linear-to-br from-[#ff7143] to-[#ff9b7a] rounded-2xl shadow-lg p-6 text-white sticky top-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <FiDollarSign className="w-5 h-5 text-white/80" />
          Grand Total
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-white/90">
            <span>Weight Price</span>
            <span className="font-bold">
              {values.totalWeight ? formatIDR(Number(values.totalWeight) * Number(kiloanItem?.price || 0)) : "—"}
            </span>
          </div>
          <div className="flex justify-between text-sm text-white/90">
            <span>Items Extra</span>
            <span className="font-bold">
              {formatIDR(estimatedTotal - Number(values.totalWeight) * Number(kiloanItem?.price || 0))}
            </span>
          </div>
          <hr className="border-white/20" />
          <div className="flex justify-between items-end">
            <span className="font-medium text-white/80">Total</span>
            <span className="text-3xl font-black">{formatIDR(estimatedTotal)}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={createLoading}
          className="w-full mt-6 bg-white text-[#ff7143] py-4 rounded-xl font-black shadow-lg hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 tracking-wider"
        >
          {createLoading ? "CREATING..." : "CREATE ORDER"}
        </button>
      </div>
    </div>
  );
}
