import React from 'react';

import { createInput, Form, formFieldData } from '@/components/ui/FormModule';
import {
  emailRegex,
  validation_email,
  validation_password,
  validation_username,
} from '@/modules/AuthModule/validation';

import styles from './auth.module.scss';

const LoginPage: React.FC = () => {
  const onSubmitFormHandler = (data: Array<formFieldData>) => {
    let isValidForm = true;
    const formData: { [key: string]: string | undefined } = {};

    data.forEach((item) => {
      if (!item.isValid) {
        isValidForm = false;
      }
      if (item.name === 'username/email') {
        formData[emailRegex.test(item.value) ? 'email' : 'username'] = item.value;
        formData[!emailRegex.test(item.value) ? 'email' : 'username'] = undefined;
      } else {
        formData[item.name] = item.value;
      }
    });

    if (isValidForm) {
      // todo: post login request formData to server
    }
  };

  const fields = [
    createInput({
      placeholder: 'Username or email',
      name: 'username/email',
      onChangeField: (value: string) => {
        if (emailRegex.test(value)) {
          validation_email(
            fields.filter((item) => item.input.name === 'username/email')[0],
            value,
          );
        } else {
          validation_username(
            fields.filter((item) => item.input.name === 'username/email')[0],
            value,
          );
        }
      },
    }),
    createInput({
      placeholder: 'Password',
      name: 'password',
      type: 'password',
      onChangeField: (value: string) => {
        validation_password(
          fields.filter((item) => item.input.name === 'password')[0],
          value,
        );
      },
    }),
  ];

  return (
    <>
      <main className={'container fullHeight'}>
        <div className={styles.formBlock}>
          <Form
            title={'Login'}
            fields={fields}
            button={{ text: 'Sing in', callback: onSubmitFormHandler }}
          />
        </div>
      </main>
    </>
  );
};

export default LoginPage;
