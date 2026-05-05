import axiosInstance from "@/utils/axiosInstance";
import {
  ShiftListResponse,
  CreateShiftRequest,
  UpdateShiftRequest,
  Shift
} from "@/types/shift.dto";

export const shiftApi = {
  getShifts: async (params?: { page?: number; limit?: number; search?: string }) => {
    const response = await axiosInstance.get<ShiftListResponse>("/api/shifts", { params });
    return response.data;
  },

  getShiftById: async (id: string) => {
    const response = await axiosInstance.get<{ success: boolean; data: Shift }>(`/api/shifts/${id}`);
    return response.data;
  },

  createShift: async (data: CreateShiftRequest) => {
    const response = await axiosInstance.post<{ success: boolean; message: string }>("/api/shifts", data);
    return response.data;
  },

  updateShift: async (id: string, data: UpdateShiftRequest) => {
    const response = await axiosInstance.put<{ success: boolean; message: string }>(`/api/shifts/${id}`, data);
    return response.data;
  },

  deleteShift: async (id: string) => {
    const response = await axiosInstance.delete<{ success: boolean; message: string }>(`/api/shifts/${id}`);
    return response.data;
  },
};
