import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { FormFieldNameEnum, FormProps } from '@/typings';

interface FormField {
  name: FormFieldNameEnum;
  value: string;
  isValid: boolean;
}

const Form: React.FC<{ authData: FormProps; currentPage: string }> = (props) => {
  const { authData, currentPage } = props;
  const { title, fields, switchPage, button } = authData;

  const [formState, setFormState] = useState<Array<FormField>>([]);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registrationLogin(currentPage, formState);
  };

  const router = useRouter();
  const switchPageFunc = (link: string) => {
    router.push(`/auth?${link}`);
  };

  return (
    <form onSubmit={submitForm}>
      <h1>{title}</h1>

      {switchPage &&
        switchPage.map((item, index) => (
          <button
            key={item.to + index}
            onClick={(e) => {
              e.preventDefault();
              switchPageFunc(item.to);
            }}
          >
            {item.text}
          </button>
        ))}

      <button>{button}</button>
    </form>
  );
};

export default Form;

const registrationLogin = (type: string, formState: Array<FormField>) => {
  const obj: { [key: string]: string } = {};

  formState.forEach((item) => (obj[item.name] = item.value));

  console.log(obj);

  // const userObject: I_User = {
  //   name: '',
  //   email: '',
  //   password: '',
  // };
  //
  // formState.forEach((item) => {
  //   if (item.name === 'name' || item.name === 'email' || item.name === 'password') {
  //     userObject[item.name] = item.value;
  //   }
  // });
  // return new Promise((resolve, reject) => {
  //   axios.post(`/api/user?${type}`, { ...userObject }).then((res) => {
  //     if (res.data !== undefined) {
  //       resolve(res.data);
  //     } else {
  //       reject(`error ${type}`);
  //     }
  //   });
  // });
};
