import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { I_User } from '@/typings';

interface I_UserState extends I_User {
  token: string;
}

interface I_useAuth {
  userData: I_UserState;
  setUser: (newUser: I_UserState) => void;
  logOut: () => void;
}

const clearUserState: I_UserState = {
  name: '',
  email: '',
  password: '',
  token: '',
};

const useAuth = create<I_useAuth>()(
  persist(
    (set) => ({
      userData: clearUserState,
      setUser: (newUser) => set({ userData: newUser }),
      logOut: () => set({ userData: clearUserState }),
    }),
    {
      name: 'TASKER_USER_INFO',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ authToken: state.userData }),
    },
  ),
);

export default useAuth;
