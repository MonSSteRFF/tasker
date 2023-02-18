import React from 'react';

import Header from '../../../components/Header';
import Form from '../../../components/ui/FormModule/Form';
import useInput from '../../../components/ui/FormModule/useInput';

const LoginPage: React.FC = () => {
  const fields = [
    useInput({ placeholder: 'Username', name: 'username' }),
    useInput({ placeholder: 'Password', type: 'password', name: 'password' }),
  ];

  const loginHandler = (data: { [key: string]: string }) => {
    console.log(data);
  };

  return (
    <>
      <main className={'container fullHeight'}>
        {/*<Form*/}
        {/*  title={'Login'}*/}
        {/*  fields={fields}*/}
        {/*  button={{ text: 'sing in', callback: loginHandler }}*/}
        {/*/>*/}
      </main>
    </>
  );
};

export default LoginPage;