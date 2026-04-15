"use client";

import useGetOrders from "@/features/order-admin/hooks/useGetOrders";
import useGetOutletWorkers from "@/features/order-admin/hooks/useGetOutletWorkers";
import OrderHeader from "./components/OrderHeader";
import OrderFilters from "./components/OrderFilters";
import OrderTable from "./components/OrderTable";

export default function OutletAdminOrdersPage() {
  const {
    orders,
    pagination,
    loading,
    search,
    setSearch,
    orderStatus,
    setOrderStatus,
    workerId,
    setWorkerId,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    page,
    setPage,
  } = useGetOrders();

  const { workers } = useGetOutletWorkers();

  return (
    <div className="space-y-6">
      {/* 1. Header Section */}
      <OrderHeader />

      {/* 2. Filters & Search Section */}
      <OrderFilters
        search={search}
        setSearch={setSearch}
        orderStatus={orderStatus}
        setOrderStatus={setOrderStatus}
        workerId={workerId}
        setWorkerId={setWorkerId}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        workers={workers}
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
