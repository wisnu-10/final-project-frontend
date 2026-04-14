import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  firstName: string | null;
  role: string | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      firstName: null,
      role: null,
      setAuth: (user, token) =>
        set({
          user,
          token,
          firstName: user.firstName,
          role: user.role,
        }),
      clearAuth: () =>
        set({
          user: null,
          token: null,
          firstName: null,
          role: null,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
