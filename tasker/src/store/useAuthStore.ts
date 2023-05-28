import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { login, LoginArgs, register, RegisterArgs } from '@/store/useAuthStore.module';

interface I_useAuthStore {
  jwt?: string;
  refresh?: string;
  register: (args: RegisterArgs) => void;
  login: (args: LoginArgs) => void;
}

const useAuthStore = create<I_useAuthStore>()(
  persist(
    (set) => ({
      register: async (args) => {
        const tokens = await register(args);
        set({ jwt: tokens.jwt, refresh: tokens.refresh });
      },
      login: async (args) => {
        const tokens = await login(args);
        set({ jwt: tokens.jwt, refresh: tokens.refresh });
      },
    }),
    {
      name: 'TASKER_AUTH',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ jwt: state.jwt, refresh: state.refresh }),
    },
  ),
);

export default useAuthStore;
