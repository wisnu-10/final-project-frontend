export interface AttendanceShift {
  id: string;
  shiftName: string;
  startTime: string;
  endTime: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  shiftId: string;
  checkIn: string;
  checkOut: string | null;
  date: string;
  status: "present" | "late" | "absent";
  notes: string | null;
  shift: AttendanceShift;
  createdAt: string;
}

export interface AttendanceStatus {
  isCheckedIn: boolean;
  isCheckedOut: boolean;
  attendance: AttendanceRecord | null;
}

export interface AttendancePagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface AttendanceHistoryResponse {
  success: boolean;
  message: string;
  attendances: AttendanceRecord[];
  pagination: AttendancePagination;
}

export interface AttendanceStatusResponse {
  success: boolean;
  message: string;
  data: AttendanceStatus;
}

export interface AttendanceActionResponse {
  success: boolean;
  message: string;
  data: AttendanceRecord;
}
