import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface I_useAuthStore {
  token?: string;
  refresh?: string;
  jwtTime?: string;
  setJwt: (jwt: { token: string; refresh: string; jwtTime: string }) => void;
}

const useAuthStore = create<I_useAuthStore>()(
  persist(
    (set) => ({
      setJwt: (jwt) =>
        set({ token: jwt.token, refresh: jwt.refresh, jwtTime: jwt.jwtTime }),
    }),
    {
      name: 'TASKER_AUTH',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        refresh: state.refresh,
        jwtTime: state.jwtTime,
      }),
    },
  ),
);

export default useAuthStore;
