"use client";

import { use, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useFormik, FieldArray, FormikProvider } from "formik";
import {
  FiArrowLeft,
  FiPlus,
  FiTrash2,
  FiPackage,
  FiDollarSign,
  FiUser,
} from "react-icons/fi";
import useGetOrderById from "@/features/order-admin/hooks/useGetOrderById";
import useProcessOrder from "@/features/order-admin/hooks/useProcessOrder";
import useGetOutletWorkers from "@/features/order-admin/hooks/useGetOutletWorkers";
import { getLaundryItemsApi } from "@/features/order-admin/api/getLaundryItems.api";
import { processOrderSchema } from "@/features/order-admin/validation/orderSchema";
import { formatIDR } from "@/utils/formatCurrency.utils";
import toast from "react-hot-toast";

export default function ProcessOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { order, loading: orderLoading } = useGetOrderById(id);
  const { handleProcess, loading: processLoading } = useProcessOrder();
  const { workers } = useGetOutletWorkers();

  const [laundryItems, setLaundryItems] = useState<any[]>([]);

  const fetchLaundryItems = useCallback(async () => {
    try {
      const res = await getLaundryItemsApi();
      if (res.success) {
        setLaundryItems(res.data.laundryItems || []);
      }
    } catch {
      toast.error("Failed to load laundry items");
    }
  }, []);

  useEffect(() => {
    fetchLaundryItems();
  }, [fetchLaundryItems]);

  const formik = useFormik({
    initialValues: {
      totalWeight: "",
      workerId: "",
      orderItems: [{ laundryItemId: "", quantity: 1 }],
    },
    validationSchema: processOrderSchema,
    onSubmit: (values) => {
      const validItems = values.orderItems.filter(
        (item) => item.laundryItemId && item.quantity > 0,
      );
      handleProcess(id, {
        totalWeight: Number(values.totalWeight),
        orderItems: validItems,
        workerId: values.workerId,
      });
    },
  });

  const calcEstimatedTotal = () => {
    if (!order || !formik.values.totalWeight) return 0;
    const weightPrice =
      Number(formik.values.totalWeight) * Number(order.pricePerKg);
    const itemsPrice = formik.values.orderItems.reduce((sum, item) => {
      const laundryItem = laundryItems.find(
        (li: any) => li.id === item.laundryItemId,
      );
      if (laundryItem && laundryItem.pricingType === "per_item") {
        return sum + Number(laundryItem.price) * item.quantity;
      }
      return sum;
    }, 0);
    return weightPrice + itemsPrice;
  };

  if (orderLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-3 border-[#ff7143] border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-gray-500">Loading order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">Order not found</p>
        <Link
          href="/outlet-admin/orders"
          className="text-[#ff7143] hover:underline mt-2 inline-block"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const estimatedTotal = calcEstimatedTotal();

  return (
    <div className="space-y-6 max-w-3xl pb-10">
      <div className="flex items-center gap-4">
        <Link
          href={`/outlet-admin/orders/${id}`}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Process Order</h1>
          <p className="text-sm text-gray-400">
            Customer: {order.customer?.firstName} {order.customer?.lastName}
          </p>
        </div>
      </div>

      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FiPackage className="w-5 h-5 text-[#ff7143]" />
                Total Weight
              </h2>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  name="totalWeight"
                  step="0.1"
                  min="0.1"
                  value={formik.values.totalWeight}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="0.0"
                  className={`flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#ff7143] focus:border-transparent outline-none text-lg font-medium transition-all ${
                    formik.touched.totalWeight && formik.errors.totalWeight
                      ? "border-red-500 bg-red-50/30"
                      : "border-gray-200"
                  }`}
                />
                <span className="text-gray-500 font-medium text-lg">kg</span>
              </div>
              {formik.touched.totalWeight && formik.errors.totalWeight && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.totalWeight as string}
                </p>
              )}
              <p className="text-[10px] text-gray-400 mt-2 italic">
                Price/kg applicable: {formatIDR(Number(order.pricePerKg))}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FiUser className="w-5 h-5 text-[#ff7143]" />
                Assign Worker
              </h2>
              <select
                name="workerId"
                value={formik.values.workerId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#ff7143] focus:border-transparent outline-none text-sm transition-all ${
                  formik.touched.workerId && formik.errors.workerId
                    ? "border-red-500 bg-red-50/30"
                    : "border-gray-200"
                }`}
              >
                <option value="">Select worker for washing...</option>
                {workers.map((w: any) => (
                  <option key={w.id} value={w.id}>
                    {w.firstName} {w.lastName} ({w.role})
                  </option>
                ))}
              </select>
              {formik.touched.workerId && formik.errors.workerId && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.workerId}
                </p>
              )}
              <p className="text-[10px] text-gray-400 mt-2">
                Who will be responsible for the washing stage.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FiPackage className="w-5 h-5 text-[#ff7143]" />
                Laundry Items
              </h2>
              <button
                type="button"
                onClick={() =>
                  formik.setFieldValue("orderItems", [
                    ...formik.values.orderItems,
                    { laundryItemId: "", quantity: 1 },
                  ])
                }
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors text-sm font-medium"
              >
                <FiPlus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            <FieldArray
              name="orderItems"
              render={(arrayHelpers) => (
                <div className="space-y-3">
                  {formik.values.orderItems.map((item, index) => {
                    const selectedItem = laundryItems.find(
                      (li: any) => li.id === item.laundryItemId,
                    );

                    return (
                      <div
                        key={index}
                        className="flex flex-col gap-1 p-3 bg-gray-50 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <select
                              name={`orderItems.${index}.laundryItemId`}
                              value={item.laundryItemId}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff7143] focus:border-transparent outline-none bg-white text-sm"
                            >
                              <option value="">Select item...</option>
                              {laundryItems.map((li: any) => (
                                <option key={li.id} value={li.id}>
                                  {li.name} (
                                  {li.pricingType === "kiloan"
                                    ? "Kiloan"
                                    : `${formatIDR(Number(li.price))}/pcs`}
                                  )
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="w-24">
                            <input
                              type="number"
                              name={`orderItems.${index}.quantity`}
                              min="1"
                              value={item.quantity}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff7143] focus:border-transparent outline-none bg-white text-sm text-center"
                            />
                          </div>
                          {selectedItem?.pricingType === "per_item" && (
                            <div className="w-32 text-sm text-gray-600 font-medium text-right">
                              {formatIDR(
                                Number(selectedItem.price) * item.quantity,
                              )}
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiDollarSign className="w-5 h-5 text-[#ff7143]" />
              <h3 className="text-lg font-semibold text-gray-800">
                Price Summary
              </h3>
            </div>
            <div className="space-y-2 mb-6">
              {formik.values.totalWeight && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Kiloan (
                    {formik.values.totalWeight} kg ×{" "}
                    {formatIDR(Number(order.pricePerKg))})
                  </span>
                  <span className="text-gray-800 font-medium">
                    {formatIDR(
                      Number(formik.values.totalWeight) *
                        Number(order.pricePerKg),
                    )}
                  </span>
                </div>
              )}
              {formik.values.orderItems.map((item, index) => {
                const li = laundryItems.find(
                  (l: any) => l.id === item.laundryItemId,
                );
                if (!li || li.pricingType !== "per_item") return null;
                return (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {li.name} ({item.quantity} × {formatIDR(Number(li.price))}
                      )
                    </span>
                    <span className="text-gray-800 font-medium">
                      {formatIDR(Number(li.price) * item.quantity)}
                    </span>
                  </div>
                );
              })}
              <hr className="border-gray-100 my-2" />
              <div className="flex justify-between">
                <span className="text-gray-800 font-bold text-lg">Total</span>
                <span className="text-[#ff7143] font-bold text-xl">
                  {formatIDR(estimatedTotal)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={processLoading}
              className="w-full bg-[#ff7143] hover:bg-[#e05e32] text-white py-4 rounded-xl font-bold transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
            >
              {processLoading ? "Processing..." : "Complete & Start Washing"}
            </button>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
}
