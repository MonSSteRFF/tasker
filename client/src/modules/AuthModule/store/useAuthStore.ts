import axios from 'axios';
import { JSEncrypt } from 'jsencrypt';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { makeRandomId } from '@/modules/AuthModule/store/useAuthStore.module';

interface authState {
  isLoginIn: boolean;
  registration: (formData: { [key: string]: string }) => void;
  loginIn: (formData: { [key: string]: string }) => void;
}

const useAuthStore = create<authState>()(
  persist(
    (set, get) => ({
      isLoginIn: false,
      registration: async (formData) => {
        const unicAuthToken = makeRandomId(32);

        axios
          .get(`${import.meta.env.VITE_API}/api/getPublicKey?authToken=${unicAuthToken}`)
          .then(({ data }) => {
            const crypt = new JSEncrypt();
            crypt.setPublicKey(data);
            const encryptData = crypt.encrypt(JSON.stringify(formData));

            axios
              .post(
                `${
                  import.meta.env.VITE_API
                }/api/auth/register?authToken=${unicAuthToken}`,
                { data: encryptData },
              )
              .then(({ data }) => {
                console.log(data);
              });
          });
      },
      loginIn: async (data) => {
        return {};
      },
    }),
    {
      name: 'AUTH_STORAGE',
      getStorage: () => localStorage,
      partialize: (state) => ({ isLoginIn: state.isLoginIn }),
    },
  ),
);

export default useAuthStore;
