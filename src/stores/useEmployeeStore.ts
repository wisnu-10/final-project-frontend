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
  setEmployee: (data: EmployeeData) => void;
  clearEmployee: () => void;
};

const useEmployeeStore = create<UseEmployeeStore>((set) => ({
  employee: null,
  setEmployee: (data) => {
    set({ employee: data });
  },
  clearEmployee: () => {
    set({ employee: null });
  },
}));

export default useEmployeeStore;
