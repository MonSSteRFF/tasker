import axios from 'axios';

import useAuthStore from '@/store/useAuthStore';

const useApi = () => {
  const token = useAuthStore((state) => state.jwt);

  return axios.create({
    baseURL: '/api/',
    headers: {
      Authorization: process.env.NEXT_PUBLIC_AUTHENTICATION_TOKEN,
      token,
    },
  });
};

const apiWithoutToken = axios.create({
  baseURL: '/api/',
  headers: {
    Authorization: process.env.NEXT_PUBLIC_AUTHENTICATION_TOKEN,
  },
});
export { apiWithoutToken };

export default useApi;
