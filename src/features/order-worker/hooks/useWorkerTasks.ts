import { useState, useEffect, useCallback } from "react";
import * as api from "../api/order-worker.api";
import { Order } from "@/types/order.dto";
import toast from "react-hot-toast";

export function useWorkerTasks() {
  const [myOrders, setMyOrders] = useState<any[]>([]);
  const [available, setAvailable] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [mine, avail] = await Promise.all([
        api.getMyWorkerOrders(),
        api.getAvailableWorkerTasks(),
      ]);
      setMyOrders(mine);
      setAvailable(avail);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAcceptTask = async (orderId: string) => {
    try {
      await api.acceptWorkerTask(orderId);
      toast.success("Task accepted");
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to accept");
    }
  };

  const handleCompleteTask = async (orderId: string) => {
    try {
      await api.completeWorkerTask(orderId);
      toast.success("Station completed");
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to complete");
    }
  };

  return {
    myOrders,
    available,
    isLoading,
    refresh: fetchData,
    handleAcceptTask,
    handleCompleteTask,
  };
}

export function useWorkerHistory() {
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await api.getWorkerHistory();
      setHistory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { history, isLoading, refresh: fetchHistory };
}
