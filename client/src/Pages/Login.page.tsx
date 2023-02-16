import React from 'react';

import Form from '../components/ui/Form';
import useInput from '../components/ui/hooks/useInput';

const LoginPage: React.FC = () => {
  const fields = [
    useInput({ placeholder: 'Username', name: 'username' }),
    useInput({ placeholder: 'Password', type: 'password', name: 'password' }),
  ];

  const loginHandler = (data: { [key: string]: string }) => {
    console.log(data);
  };

  return (
    <main className={'container fullHeight'}>
      <Form
        title={'Login'}
        fields={fields}
        button={{ text: 'sing in', callback: loginHandler }}
      />
    </main>
  );
};

export default LoginPage;
