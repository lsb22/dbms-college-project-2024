import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  teacherId: number;
  login: (id: number) => void;
  logout: () => void;
}

type AuthStorePersist = (
  config: StateCreator<AuthState>,
  options: PersistOptions<AuthState>
) => StateCreator<AuthState>;

const authStorePersist = persist as AuthStorePersist;

const AuthStore = create<AuthState>(
  authStorePersist(
    (set) => ({
      isLoggedIn: false,
      teacherId: 0,
      login: (id) => set({ isLoggedIn: true, teacherId: id }),
      logout: () => set({ isLoggedIn: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default AuthStore;
