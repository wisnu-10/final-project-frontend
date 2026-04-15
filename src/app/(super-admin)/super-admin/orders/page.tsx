"use client";

import { useState, useEffect, useCallback } from "react";
import useGetOrders from "@/features/order-admin/hooks/useGetOrders";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import OrderHeader from "./components/OrderHeader";
import OrderFilters from "./components/OrderFilters";
import OrderTable from "./components/OrderTable";

export default function SuperAdminOrdersPage() {
  const {
    orders,
    pagination,
    loading,
    search,
    setSearch,
    outletId,
    setOutletId,
    orderStatus,
    setOrderStatus,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    page,
    setPage,
  } = useGetOrders();

  const [outlets, setOutlets] = useState<any[]>([]);

  const fetchOutlets = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/super-admin/outlets");
      if (res.data.success) {
        setOutlets(res.data.data.outlets || []);
      }
    } catch (error: any) {
      toast.error("Failed to load outlets");
    }
  }, []);

  useEffect(() => {
    fetchOutlets();
  }, [fetchOutlets]);

  return (
    <div className="space-y-6">
      {/* 1. Header Section */}
      <OrderHeader />

      {/* 2. Filters Section */}
      <OrderFilters
        search={search}
        setSearch={setSearch}
        outletId={outletId}
        setOutletId={setOutletId}
        orderStatus={orderStatus}
        setOrderStatus={setOrderStatus}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        outlets={outlets}
        setPage={setPage}
      />

      {/* 3. Data Table Section */}
      <OrderTable
        orders={orders}
        loading={loading}
        pagination={pagination}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
