import React from 'react';

import { FormField } from '@/components/ui/Form/Form';

import styles from './Input.module.scss';

interface InputProps extends FormField {
  onChangeValue: (newValue: string, name: string) => void;
  buttonValid: boolean;
}

const Input: React.FC<InputProps> = (props) => {
  const {
    value,
    name,
    placeholder,
    validText,
    isValid,
    onChangeValue,
    errorText,
    buttonValid,
  } = props;

  const type =
    name === 'password' || name === 'repeat-password'
      ? 'password'
      : name === 'email' || name === 'repeat-email'
      ? 'email'
      : 'text';

  return (
    <label
      className={`${styles.label} ${!isValid || errorText !== '' ? styles.notValid : ''}`}
    >
      <input
        type={type}
        className={`${styles.label_input} ${value !== '' ? styles.active : ''} ${
          buttonValid ? styles.wrong : ''
        }`}
        value={value}
        onChange={(e) => {
          onChangeValue(e.target.value, name);
        }}
      />
      <span className={styles.label_placeholder}>{placeholder}</span>
      {!isValid ? (
        <span className={`${styles.label_valid} ${buttonValid ? styles.wrong : ''}`}>
          {validText}
        </span>
      ) : errorText !== '' ? (
        <span className={styles.label_error}>{errorText}</span>
      ) : null}
    </label>
  );
};

export default Input;
