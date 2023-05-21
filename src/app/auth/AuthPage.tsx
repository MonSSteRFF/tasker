'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import Form from '@/components/Form/Form';
import { FormProps } from '@/typings';

interface AuthPageProps {
  currentPage: string;
  authData?: FormProps;
}

const AuthPage: React.FC<AuthPageProps> = (props) => {
  const { currentPage, authData } = props;

  const router = useRouter();

  useEffect(() => {
    if (currentPage === 'wrong') {
      router.push('/auth?login');
    }
  }, [currentPage, router]);

  return (
    <div>
      {authData === undefined ? (
        'loading...'
      ) : (
        <Form authData={authData} currentPage={currentPage} />
      )}
    </div>
  );
};

export default AuthPage;
