import axios from 'axios';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import unicTokenFetch from '@/middleware/unicToken';
import {
  makeRandomId,
  postLogin,
  postRegistration,
} from '@/modules/AuthModule/store/useAuthStore.module';

interface authState {
  isLoginIn: boolean;
  loginToken: string;
  registration: (formData: { [key: string]: string }) => void;
  loginIn: (formData: { [key: string]: string | undefined }) => void;
  logout: () => void;
}

type authSetType = (
  partial:
    | authState
    | Partial<authState>
    | ((state: authState) => authState | Partial<authState>),
  replace?: boolean | undefined,
) => void;

const useAuthStore = create<authState>()(
  persist(
    (set, get) => ({
      isLoginIn: false,
      loginToken: '',
      registration: (formData) => postRegistration(formData, set),
      loginIn: (formData) => postLogin(formData, set),
      logout: () => set({ isLoginIn: false, loginToken: '' }),
    }),
    {
      name: 'AUTH_STORAGE',
      getStorage: () => localStorage,
      partialize: (state) => ({
        isLoginIn: state.isLoginIn,
        loginToken: state.loginToken,
      }),
    },
  ),
);

export type { authSetType, authState };
export default useAuthStore;
