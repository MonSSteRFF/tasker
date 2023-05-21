'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import useAuth from '@/store/useAuth';

const Home = () => {
  const navigationRouter = useRouter();

  const token = useAuth((state) => state.userData.token);

  useEffect(() => {
    if (token === '') {
      navigationRouter.push('/auth?login');
    }
  }, [token, navigationRouter]);

  return <p>home page</p>;
};

export default Home;
