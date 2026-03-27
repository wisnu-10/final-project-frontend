import { create } from "zustand";

type UseAuthStore = {
  firstName: string
  email: string;
  role: string;
  setAuth: ({ firstName, email, role }: { firstName: string; email: string; role: string }) => void;
};

const useAuthStore = create<UseAuthStore>((set) => ({
  firstName: "",
  email: "",
  role: "",
  setAuth: ({ firstName, email, role }: Pick<UseAuthStore, "firstName" | "email" | "role">) => {
    set({ firstName, email, role });
  },
}));

export default useAuthStore;
