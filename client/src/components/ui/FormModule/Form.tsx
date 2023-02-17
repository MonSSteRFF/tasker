import React from 'react';

import styles from './Form.module.scss';
import { form_props, formFieldData } from './FormModule.types';

const emailRegx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Form: React.FC<form_props> = (props) => {
  const { title, fields, button } = props;

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: Array<formFieldData> = fields.map((field) => ({
      name: field.input.name,
      value: field.input.value,
      isValid: field.validState.state,
    }));

    button.callback(data);
  };

  return (
    <form onSubmit={formSubmit} className={styles.form}>
      <h1 className={styles.form_title}>{title}</h1>
      {fields.map((field, index) => (
        <React.Fragment key={field.input.name + index}>
          {field.input.element}
        </React.Fragment>
      ))}
      <button className={styles.form_button}>{button.text}</button>
    </form>
  );
};

export default Form;
