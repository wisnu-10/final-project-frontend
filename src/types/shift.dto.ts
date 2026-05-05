export interface Shift {
  id: string;
  shiftName: string;
  startTime: string; // Format: "HH:mm"
  endTime: string;   // Format: "HH:mm"
  createdAt: string;
  updatedAt: string;
}

export interface CreateShiftRequest {
  shiftName: string;
  startTime: string;
  endTime: string;
}

export interface UpdateShiftRequest extends Partial<CreateShiftRequest> {}

export interface ShiftListResponse {
  success: boolean;
  message: string;
  data: {
    shifts: Shift[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}
