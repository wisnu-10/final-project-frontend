import { useState, useEffect, useCallback } from "react";
import * as api from "../api/order-driver.api";
import { Order, DriverTasksResponse } from "@/types/order.dto";
import toast from "react-hot-toast";

export function useDriverTasks() {
  const [available, setAvailable] = useState<DriverTasksResponse>({ pickups: [], deliveries: [] });
  const [myTasks, setMyTasks] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [avail, mine] = await Promise.all([
        api.getAvailableDriverTasks(),
        api.getMyDriverTasks(),
      ]);
      setAvailable(avail);
      setMyTasks(mine);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAcceptPickup = async (orderId: string) => {
    try {
      await api.acceptPickup(orderId);
      toast.success("Pickup accepted");
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to accept");
    }
  };

  const handleCompletePickup = async (orderId: string) => {
    try {
      await api.completePickup(orderId);
      toast.success("Pickup completed");
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to complete");
    }
  };

  const handleAcceptDelivery = async (orderId: string) => {
    try {
      await api.acceptDelivery(orderId);
      toast.success("Delivery accepted");
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to accept");
    }
  };

  const handleCompleteDelivery = async (orderId: string) => {
    try {
      await api.completeDelivery(orderId);
      toast.success("Delivery completed");
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to complete");
    }
  };

  return {
    available,
    myTasks,
    isLoading,
    refresh: fetchData,
    handleAcceptPickup,
    handleCompletePickup,
    handleAcceptDelivery,
    handleCompleteDelivery,
  };
}

export function useDriverHistory() {
  const [history, setHistory] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await api.getDriverHistory();
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
