"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useFormik, FormikProvider } from "formik";
import { FiArrowLeft } from "react-icons/fi";
import useGetCustomers from "@/features/order-admin/hooks/useGetCustomers";
import useCreateManualOrder from "@/features/order-admin/hooks/useCreateManualOrder";
import useGetOutletWorkers from "@/features/order-admin/hooks/useGetOutletWorkers";
import { getLaundryItemsApi } from "@/features/order-admin/api/getLaundryItems.api";
import { createManualOrderSchema } from "@/features/order-admin/validation/orderSchema";
import CustomerSelector from "./components/CustomerSelector";
import LaundryItemsForm from "./components/LaundryItemsForm";
import OrderSummarySidebar from "./components/OrderSummarySidebar";
import toast from "react-hot-toast";

export default function CreateManualOrderPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { customers, loading: customersLoading } = useGetCustomers(searchTerm);
  const { handleCreateManual, loading: createLoading } = useCreateManualOrder();
  const { workers } = useGetOutletWorkers();

  const [laundryItems, setLaundryItems] = useState<any[]>([]);

  const fetchLaundryItems = useCallback(async () => {
    try {
      const res = await getLaundryItemsApi({ limit: 100 });
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
      customerId: "",
      totalWeight: "",
      workerId: "",
      orderItems: [{ laundryItemId: "", quantity: 1 }],
    },
    validationSchema: createManualOrderSchema,
    onSubmit: (values) => {
      handleCreateManual({
        customerId: values.customerId,
        totalWeight: Number(values.totalWeight),
        orderItems: values.orderItems.filter((i) => i.laundryItemId !== ""),
        workerId: values.workerId,
      });
    },
  });

  return (
    <div className="space-y-6 max-w-5xl pb-20">
      <div className="flex items-center gap-4">
        <Link
          href="/outlet-admin/orders"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Create Manual Order</h1>
          <p className="text-sm text-gray-500">Walk-in customer order</p>
        </div>
      </div>

      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* 1. Customer Selection */}
              <CustomerSelector
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                customers={customers}
                customersLoading={customersLoading}
                selectedCustomerId={formik.values.customerId}
                setFieldValue={formik.setFieldValue}
                touched={formik.touched.customerId}
                error={formik.errors.customerId}
              />

              {/* 2. Laundry Items Form */}
              <LaundryItemsForm
                values={formik.values}
                handleChange={formik.handleChange}
                laundryItems={laundryItems}
              />
            </div>

            {/* 3. Specs & Summary Sidebar */}
            <div className="lg:col-span-1">
              <OrderSummarySidebar
                values={formik.values}
                touched={formik.touched}
                errors={formik.errors}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                workers={workers}
                laundryItems={laundryItems}
                createLoading={createLoading}
              />
            </div>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
}
