import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface OrderData {
  orders: any[];
}

export const useGetAllOrder = () => {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getOrder = async (params: OrderParams = {}) => {
    try {
      setIsLoading(true);

      const res = await axiosInstance.get<ApiResponse<any>>("/order/", { params: params });

      setOrder(res.data.data)
      setCurrentPage(res.data.data.orders.currentPage)
      setTotalPage(res.data.data.orders.totalPage);
      setTotalOrder(res.data.data.orders.totalOrders);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setIsError(true)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrder()
  }, [])

  return {order, isLoading, isError, getOrder, totalPage, totalOrder, currentPage}
};
