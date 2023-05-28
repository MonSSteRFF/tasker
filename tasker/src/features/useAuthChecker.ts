import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useAuthStore from '@/store/useAuthStore';

const useAuthChecker = () => {
  const jwtToken = useAuthStore((state) => state.token);
  const router = useRouter();

  useEffect(() => {
    if (jwtToken === undefined && router.pathname !== '/auth') {
      router.push('/auth?login');
    }
    if (jwtToken !== undefined && jwtToken !== '' && jwtToken.length > 0) {
      router.push('/home');
    }
  }, [jwtToken]);
};

export default useAuthChecker;
