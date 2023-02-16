import React, { useState } from 'react';

import styles from './useInput.module.scss';

interface useInput_props {
  init?: string;
  placeholder: string;
  type?: string;
  name: string;
}
interface useInput_endpoint {
  element: JSX.Element;
  value: string;
  name: string;
  isValid: boolean;
}

const emailRegx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

type I_useInput = (props: useInput_props) => useInput_endpoint;

const useInput: I_useInput = (props) => {
  const { init = '', placeholder, type = 'text', name } = props;
  const [value, setValue] = useState<string>(init);
  const [error, setError] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    switch (name) {
      case 'Username': {
        setIsValid(newValue.length > 4);
        break;
      }
      case 'Email': {
        setIsValid(emailRegx.test(newValue));
        break;
      }
      case 'Password': {
        setIsValid(newValue.length > 6);
        break;
      }
      case 'Repeat password': {
        setIsValid(newValue.length > 6);
        break;
      }
    }
  };

  const Element = (
    <label className={styles.label}>
      <input
        name={name}
        type={type}
        value={value}
        onChange={inputChangeHandler}
        className={`${styles.input} ${value !== '' ? `${styles.isActive}` : ''}`}
      />
      <span className={styles.placeholder}>{placeholder}</span>
    </label>
  );

  return {
    element: Element,
    value: value,
    name: name,
    isValid: isValid,
  };
};

export default useInput;
