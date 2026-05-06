import { create } from "zustand";

type EmployeeData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profilePicture: string;
  outletId: string | null;
  outletName: string | null;
}

type UseEmployeeStore = {
  employee: EmployeeData | null;
  editingEmployeeId: string | null;
  setEmployee: (data: EmployeeData) => void;
  setEditingEmployeeId: (id: string | null) => void;
  clearEmployee: () => void;
};

const useEmployeeStore = create<UseEmployeeStore>((set) => ({
  employee: null,
  editingEmployeeId: null,
  setEmployee: (data) => {
    set({ employee: data });
  },
  setEditingEmployeeId: (id) => {
    set({ editingEmployeeId: id });
  },
  clearEmployee: () => {
    set({ employee: null, editingEmployeeId: null });
  },
}));

export default useEmployeeStore;
