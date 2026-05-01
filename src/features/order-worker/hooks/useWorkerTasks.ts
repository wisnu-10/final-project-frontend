import { useState, useEffect, useCallback } from "react";
import * as api from "../api/order-worker.api";
import * as apiBypass from "../api/bypass-request.api";
import { Order } from "@/types/order.dto";
import useWorkerStore from "@/stores/useWorkerStore";
import toast from "react-hot-toast";

export function useWorkerTasks() {
  const { setAvailableTasks, setActiveTask, setHistory } = useWorkerStore();
  const [available, setAvailable] = useState<Order[]>([]);
  const [myTasks, setMyTasks] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [avail, mine] = await Promise.all([
        api.getAvailableWorkerTasks(),
        api.getMyWorkerTasks(),
      ]);
      setAvailable(avail);
      setMyTasks(mine);
      
      // Update store
      setAvailableTasks(avail);
      setActiveTask(mine.length > 0 ? mine[0] : null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [setAvailableTasks, setActiveTask]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAcceptTask = async (orderId: string) => {
    try {
      await api.acceptWorkerTask(orderId);
      toast.success("Tugas diterima!");
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal menerima tugas");
    }
  };

  const handleCompleteTask = async (orderId: string) => {
    try {
      const res = await api.completeWorkerTask(orderId);
      const nextStatus = res.data?.nextStatus?.replace(/_/g, " ") || "selesai";
      toast.success(`Stasiun selesai! Status: ${nextStatus}`);
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal menyelesaikan");
    }
  };

  const handleBypassRequest = async (orderId: string, payload: any) => {
    try {
      await apiBypass.createBypassRequest(orderId, payload);
      toast.success("Bypass request sent to admin!");
      fetchData();
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send bypass request");
      return false;
    }
  };

  return {
    available,
    myTasks,
    isLoading,
    refresh: fetchData,
    handleAcceptTask,
    handleCompleteTask,
    handleBypassRequest,
  };
}

export function useWorkerHistory() {
  const { setHistory: setStoreHistory } = useWorkerStore();
  const [history, setHistory] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await api.getWorkerHistory();
      setHistory(data);
      setStoreHistory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [setStoreHistory]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { history, isLoading, refresh: fetchHistory };
}
