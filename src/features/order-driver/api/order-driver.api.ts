import axiosInstance from "@/utils/axiosInstance";
import { Order, DriverTasksResponse } from "@/types/order.dto";

export const getAvailableDriverTasks = async () => {
  const res = await axiosInstance.get<{ success: boolean; data: DriverTasksResponse }>("/order-driver/available");
  return res.data.data;
};

export const getMyDriverTasks = async () => {
  const res = await axiosInstance.get<{ success: boolean; data: Order[] }>("/order-driver/my-tasks");
  return res.data.data;
};

export const acceptPickup = async (orderId: string) => {
  const res = await axiosInstance.post("/order-driver/accept-pickup", { orderId });
  return res.data;
};

export const completePickup = async (orderId: string) => {
  const res = await axiosInstance.post("/order-driver/complete-pickup", { orderId });
  return res.data;
};

export const acceptDelivery = async (orderId: string) => {
  const res = await axiosInstance.post("/order-driver/accept-delivery", { orderId });
  return res.data;
};

export const completeDelivery = async (orderId: string) => {
  const res = await axiosInstance.post("/order-driver/complete-delivery", { orderId });
  return res.data;
};

export const getDriverHistory = async () => {
  const res = await axiosInstance.get<{ success: boolean; data: Order[] }>("/order-driver/history");
  return res.data.data;
};
