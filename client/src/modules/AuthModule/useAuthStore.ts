import create from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware/devtools';
import { immer } from 'zustand/middleware/immer';

import { GetRequest, PostRequest } from '@/middleware/postGetRequest';

interface authState {
  isLoginIn: boolean;
  authToken: string;
}

const useAuthStore = create<authState>()(
  devtools(
    persist(
      immer((set, get) => ({
        isLoginIn: false,
        authToken: '',
      })),
      {
        name: 'AUTH_STORAGE',
        getStorage: () => localStorage,
        partialize: (state) => ({ isLoginIn: state.isLoginIn }),
      },
    ),
  ),
);

export default useAuthStore;
