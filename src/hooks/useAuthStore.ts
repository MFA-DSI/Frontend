import create from "zustand";

interface AuthState {
  directionId: string | null;
  userId: string | null;
  token: string | null;
}

export const useAuthStore = create<AuthState>((set) => ({
  directionId: null,
  userId: null,
  token: null,

  setDirectionId: (directionId: string) => set({directionId}),
  setUserId: (userId: string) => set({userId}),
  setToken: (token: string) => set({token}),
}));
