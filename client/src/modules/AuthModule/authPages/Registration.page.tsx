import React from 'react';

import {
  createInput,
  Form,
  formFieldData,
  useInput_endpoint,
} from '@/components/ui/FormModule';
import {
  validation_compareFields,
  validation_email,
  validation_password,
  validation_username,
} from '@/modules/AuthModule/validation';

import styles from './auth.module.scss';

const RegistrationPage: React.FC = () => {
  const onSubmitFormHandler = (data: Array<formFieldData>) => {
    let isValidForm = true;
    const formData: { [key: string]: string } = {};

    data.forEach((item) => {
      if (!item.isValid) {
        isValidForm = false;
      }
      if (item.name !== 'password-repeat') {
        formData[item.name] = item.value;
      }
    });

    if (isValidForm) {
      // todo: post register request formData to server
    }
  };

  const fields: Array<useInput_endpoint> = [
    createInput({
      placeholder: 'Username',
      name: 'username',
      onChangeField: (value: string) => {
        validation_username(
          fields.filter((item) => item.input.name === 'username')[0],
          value,
        );
      },
    }),
    createInput({
      placeholder: 'Email',
      name: 'email',
      type: 'email',
      onChangeField: (value: string) => {
        validation_email(fields.filter((item) => item.input.name === 'email')[0], value);
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
    createInput({
      placeholder: 'Repeat password',
      name: 'password-repeat',
      type: 'password',
      onChangeField: (value: string) => {
        validation_compareFields(
          fields.filter((item) => item.input.name === 'password-repeat')[0],
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
            title={'Registration'}
            fields={fields}
            button={{ text: 'Sing up', callback: onSubmitFormHandler }}
          />
        </div>
      </main>
    </>
  );
};

export default RegistrationPage;
