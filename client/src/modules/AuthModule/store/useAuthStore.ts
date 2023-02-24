import axios from 'axios';
import { JSEncrypt } from 'jsencrypt';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { makeRandomId } from '@/modules/AuthModule/store/useAuthStore.module';

interface authState {
  isLoginIn: boolean;
  loginToken: string;
  registration: (formData: { [key: string]: string }) => void;
  loginIn: (formData: { [key: string]: string | undefined }) => void;
  logout: () => void;
}

const useAuthStore = create<authState>()(
  persist(
    (set, get) => ({
      isLoginIn: false,
      loginToken: '',
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
                if (data.error !== undefined) {
                  console.log('error', data);
                  set({ loginToken: '', isLoginIn: false });
                } else {
                  set({ loginToken: data.token, isLoginIn: true });
                }
              });
          });
      },
      loginIn: async (formData) => {
        const unicAuthToken = makeRandomId(32);

        axios
          .get(`${import.meta.env.VITE_API}/api/getPublicKey?authToken=${unicAuthToken}`)
          .then(({ data }) => {
            const crypt = new JSEncrypt();
            crypt.setPublicKey(data);

            const encryptData = crypt.encrypt(JSON.stringify(formData));

            axios
              .post(
                `${import.meta.env.VITE_API}/api/auth/login?authToken=${unicAuthToken}`,
                { data: encryptData },
              )
              .then(({ data }) => {
                if (data.error !== undefined) {
                  console.log('error', data);
                  set({ loginToken: '', isLoginIn: false });
                } else {
                  set({ loginToken: data.token, isLoginIn: true });
                }
              });
          });
      },
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

export default useAuthStore;
