import { create } from "zustand";

interface AttendanceState {
  selectedEmployeeId: string | null;
  selectedEmployeeName: string | null;
  setEmployee: (id: string, name: string) => void;
  clearEmployee: () => void;
}

export const useAttendanceStore = create<AttendanceState>((set) => ({
  selectedEmployeeId: null,
  selectedEmployeeName: null,
  setEmployee: (id, name) =>
    set({ selectedEmployeeId: id, selectedEmployeeName: name }),
  clearEmployee: () => set({ selectedEmployeeId: null, selectedEmployeeName: null }),
}));
