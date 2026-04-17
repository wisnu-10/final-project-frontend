import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axiosInstance";

export interface Complaint {
  id: string;
  orderId: string;
  customerId: string;
  description: string;
  status: 'pending' | 'resolved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  adminResponse?: string;
  resolvedById?: string;
  order: {
    id: string;
    outletId: string;
    outlet: {
      name: string;
    }
  };
}

export interface ResolveComplaintParams {
  id: string;
  status: 'resolved' | 'rejected';
  adminResponse: string;
}

export async function resolveComplaintApi(params: ResolveComplaintParams) {
  const { id, ...data } = params;
  const res = await axiosInstance.patch(`/complaint/${id}/resolve`, data);
  return res.data;
}

export interface GetComplaintsResponse {
  complaints: Complaint[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GetComplaintsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  outletId?: string;
}

export async function getComplaintsApi(params: GetComplaintsParams) {
  try {
    const res = await axiosInstance.get<ApiResponse<GetComplaintsResponse>>(
      "/complaint",
      { params }
    );
    return res.data.data;
  } catch (error) {
    throw error;
  }
}
