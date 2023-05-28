import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useAuthStore from '@/store/useAuthStore';

const useAuthChecker = () => {
  const jwtToken = useAuthStore((state) => state.jwt);
  const router = useRouter();

  useEffect(() => {
    if (jwtToken === undefined && router.pathname !== '/auth') {
      router.push('/auth?login');
    }
  }, [jwtToken]);
};

export default useAuthChecker;
