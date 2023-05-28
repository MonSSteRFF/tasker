import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { getData, I_dataStore } from '@/store/useDataStore.module';

export enum E_lang {
  'ru' = 'ru',
  'en' = 'en',
}

interface I_useDataStore {
  data?: I_dataStore;
  currentLanguage?: E_lang;
  changeLanguage: (lang: E_lang) => void;
}

const useDataStore = create<I_useDataStore>()(
  persist(
    (set) => ({
      changeLanguage: async (lang) => {
        set({ data: await getData(lang), currentLanguage: lang });
      },
    }),
    {
      name: 'TASKER_PAGE',
      partialize: (state) => ({
        data: state.data,
        currentLanguage: state.currentLanguage,
      }),
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useDataStore;
