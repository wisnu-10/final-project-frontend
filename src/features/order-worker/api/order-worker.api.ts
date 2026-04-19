import axiosInstance from "@/utils/axiosInstance";
import { Order } from "@/types/order.dto";

export const getMyWorkerOrders = async () => {
  const res = await axiosInstance.get<{ success: boolean; data: any[] }>("/order-worker/my-orders");
  return res.data.data;
};

export const getAvailableWorkerTasks = async () => {
  const res = await axiosInstance.get<{ success: boolean; data: Order[] }>("/order-worker/available");
  return res.data.data;
};

export const acceptWorkerTask = async (orderId: string) => {
  const res = await axiosInstance.post("/order-worker/accept", { orderId });
  return res.data;
};

export const completeWorkerTask = async (orderId: string) => {
  const res = await axiosInstance.post("/order-worker/complete", { orderId });
  return res.data;
};

export const getWorkerHistory = async () => {
  const res = await axiosInstance.get<{ success: boolean; data: any[] }>("/order-worker/history");
  return res.data.data;
};

export const getWorkerOrderDetail = async (id: string) => {
  const res = await axiosInstance.get<{ success: boolean; data: Order }>("/order-worker/" + id);
  return res.data.data;
};
