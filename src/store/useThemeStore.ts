import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export enum E_theme {
  'white' = 'white',
  'black' = 'black',
}

interface I_useThemeStore {
  theme: E_theme;
  changeTheme: (newTheme: E_theme) => void;
}

const useThemeStore = create<I_useThemeStore>()(
  persist(
    (set) => ({
      theme: E_theme.white,
      changeTheme: (newTheme) => set({ theme: newTheme }),
    }),
    {
      name: 'TASKER_THEME',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);

export default useThemeStore;
