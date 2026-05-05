import axiosInstance from "@/utils/axiosInstance";
import { Order } from "@/types/order.dto";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export const getAvailableWorkerTasks = async (): Promise<Order[]> => {
  const res = await axiosInstance.get<ApiResponse<Order[]>>("/api/worker-tasks/available");
  return res.data.data;
};

export const getMyWorkerTasks = async (): Promise<Order[]> => {
  const res = await axiosInstance.get<ApiResponse<Order[]>>("/api/worker-tasks/my-tasks");
  return res.data.data;
};

export const acceptWorkerTask = async (orderId: string): Promise<ApiResponse<any>> => {
  const res = await axiosInstance.post<ApiResponse<any>>("/api/worker-tasks/accept", { orderId });
  return res.data;
};

export const completeWorkerTask = async (orderId: string): Promise<ApiResponse<any>> => {
  const res = await axiosInstance.post<ApiResponse<any>>("/api/worker-tasks/complete", { orderId });
  return res.data;
};

export const getWorkerOrderDetail = async (id: string): Promise<Order> => {
  const res = await axiosInstance.get<ApiResponse<Order>>(`/api/worker-tasks/${id}`);
  return res.data.data;
};

export const getWorkerHistory = async (): Promise<Order[]> => {
  const res = await axiosInstance.get<ApiResponse<Order[]>>("/api/worker-tasks/history");
  return res.data.data;
};
