import { create } from "zustand";

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profilePicture: string;
}

type UseAuthStore = {
  user: UserData | null;
  setAuth: (data: UserData) => void;
  clearAuth: () => void;
};

const useAuthStore = create<UseAuthStore>((set) => ({
  user: null,
  setAuth: (data) => {
    set({ user: data });
  },
  clearAuth: () => {
    set({ user: null });
  },
}));

export default useAuthStore;
