import create from 'zustand';

interface AuthState {
  directionId: string | null;
  userId: string | null;
  token: string | null;
  role: string | null;  

  setDirectionId: (directionId: string) => void;
  setUserId: (userId: string) => void;
  setToken: (token: string) => void;
  setRole: (role: string) => void;  
}

export const useAuthStore = create<AuthState>((set) => ({
  directionId: localStorage.getItem("directionId"),
  userId:  localStorage.getItem("userId"),
  token:  localStorage.getItem("token"),
  role:  localStorage.getItem("role"), 

  setDirectionId: (directionId: string) => set({ directionId }),
  setUserId: (userId: string) => set({ userId }),
  setToken: (token: string) => set({ token }),
  setRole: (role: string) => set({ role }),  
}));
