import React, { useState } from 'react';

import Header from '../../../components/Header';
import Form from '../../../components/ui/FormModule/Form';
import {
  formFieldData,
  useInput_endpoint,
} from '../../../components/ui/FormModule/FormModule.types';
import useInput from '../../../components/ui/FormModule/useInput';
import {
  validation_compareFields,
  validation_email,
  validation_password,
  validation_username,
} from '../../../components/ui/FormModule/validation';

const RegistrationPage: React.FC = () => {
  const onSubmitFormHandler = (data: Array<formFieldData>) => {
    console.log(data);
  };

  //
  // validation
  const usernameValidation = (value: string) => {
    validation_username(
      fields.filter((item) => item.input.name === 'username')[0],
      value,
    );
  };
  const emailValidation = (value: string) => {
    validation_email(fields.filter((item) => item.input.name === 'email')[0], value);
  };
  const passwordValidation = (value: string) => {
    validation_password(
      fields.filter((item) => item.input.name === 'password')[0],
      value,
    );
  };
  const repeatPasswordValidation = (value: string) => {
    validation_compareFields(
      fields.filter((item) => item.input.name === 'password-repeat')[0],
      fields.filter((item) => item.input.name === 'password')[0],
      value,
    );
  };

  //
  // form fields
  const fields: Array<useInput_endpoint> = [
    useInput({
      placeholder: 'Username',
      name: 'username',
      onChangeField: usernameValidation,
    }),
    useInput({
      placeholder: 'Email',
      name: 'email',
      type: 'email',
      onChangeField: emailValidation,
    }),
    useInput({
      placeholder: 'Password',
      name: 'password',
      type: 'password',
      onChangeField: passwordValidation,
    }),
    useInput({
      placeholder: 'Repeat password',
      name: 'password-repeat',
      type: 'password',
      onChangeField: repeatPasswordValidation,
    }),
  ];

  return (
    <>
      <main className={'container fullHeight'}>
        <Form
          title={'Registration'}
          fields={fields}
          button={{ text: 'send', callback: onSubmitFormHandler }}
        />
      </main>
    </>
  );
};

export default RegistrationPage;
