import axios from 'axios';

import unicTokenFetch from '@/middleware/unicToken';
import { authSetType } from '@/modules/AuthModule/store/useAuthStore';

const makeRandomId = (length: number) => {
  let result = '';
  const time = new Date(Date.now()).getTime();

  const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz${time}`;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return `userid-${time}-${result}`;
};

const postRegistration = async (
  formData: { [key: string]: string },
  set: authSetType,
) => {
  const unicAuthToken = makeRandomId(32);

  await unicTokenFetch(unicAuthToken, JSON.stringify(formData)).then((encryptData) => {
    axios
      .post(`${import.meta.env.VITE_API}/api/auth/register?authToken=${unicAuthToken}`, {
        data: encryptData,
      })
      .then(({ data }) => {
        if (data.error !== undefined) {
          console.log('error', data);
          set({ loginToken: '', isLoginIn: false });
        } else {
          set({ loginToken: data.token, isLoginIn: true });
        }
      });
  });
};

const postLogin = async (
  formData: { [key: string]: string | undefined },
  set: authSetType,
) => {
  const unicAuthToken = makeRandomId(32);

  unicTokenFetch(unicAuthToken, JSON.stringify(formData)).then((encryptData) => {
    axios
      .post(`${import.meta.env.VITE_API}/api/auth/login?authToken=${unicAuthToken}`, {
        data: encryptData,
      })
      .then(({ data }) => {
        if (data.error !== undefined) {
          console.log('error', data);
          set({ loginToken: '', isLoginIn: false });
        } else {
          set({ loginToken: data.token, isLoginIn: true });
        }
      });
  });
};

export { makeRandomId, postLogin, postRegistration };
