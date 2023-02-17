import React from 'react';

import Form from '../../../components/ui/FormModule/Form';
import useInput from '../../../components/ui/FormModule/useInput';

const RegistrationPage: React.FC = () => {
  const fields = [
    useInput({ placeholder: 'Username', name: 'username' }),
    useInput({ placeholder: 'Email', name: 'email' }),
    useInput({ placeholder: 'Password', type: 'password', name: 'password' }),
    useInput({ placeholder: 'Repeat password', type: 'password', name: 'newPassword' }),
  ];

  const inputChangeHandler = () => {
    // todo: change input handler
  };

  const registerHandler = (data: { [key: string]: string }) => {
    const registerData = {
      username: data?.username,
      email: data?.email,
      password: data?.password,
      newPassword: data?.newPassword,
    };

    console.log(registerData);
  };

  return (
    <main className={'container fullHeight'}>
      {/*<Form*/}
      {/*  title={'Register'}*/}
      {/*  fields={fields}*/}
      {/*  button={{ text: 'sing up', callback: registerHandler }}*/}
      {/*/>*/}
    </main>
  );
};

export default RegistrationPage;
