import React, { useState } from 'react';

import styles from './Form.module.scss';
import { useInput_endpoint, useInput_props } from './FormModule.types';

type I_useInput = (props: useInput_props) => useInput_endpoint;

const createInput: I_useInput = (props) => {
  const { init = '', placeholder, type = 'text', name, onChangeField } = props;
  const [value, setValue] = useState<string>(init);
  const [error, setError] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChangeField !== undefined) {
      onChangeField(newValue);
    }
  };

  const Element = (
    <label className={`${styles.label}  ${error !== '' ? `${styles.IsError}` : ''}`}>
      <input
        name={name}
        autoComplete={name}
        type={type}
        value={value}
        onChange={inputChangeHandler}
        className={`${styles.input} ${value !== '' ? `${styles.isActive}` : ''}`}
      />
      <span className={styles.placeholder}>{placeholder}</span>
      <span className={styles.error}>{error}</span>
    </label>
  );

  return {
    input: { element: Element, value: value, name: name },
    validState: { state: isValid, setState: setIsValid },
    errorState: { state: error, setState: setError },
  };
};

export default createInput;
