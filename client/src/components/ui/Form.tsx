import React from 'react';

import styles from './Form.module.scss';

interface FormPropsFields {
  element: JSX.Element;
  value: string;
  name: string;
}

interface FormProps {
  title: string;
  fields: Array<FormPropsFields>;
  button: {
    text: string;
    callback: (data: { [key: string]: string }) => void;
  };
}

const Form: React.FC<FormProps> = (props) => {
  const { title, fields, button } = props;

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: { [key: string]: string } = {};

    fields.forEach((field) => {
      data[field.name] = field.value;
    });

    button.callback(data);
  };

  return (
    <form onSubmit={formSubmit} className={styles.form}>
      <h1 className={styles.form_title}>{title}</h1>
      {fields.map((field, index) => (
        <React.Fragment key={field.name + index}>{field.element}</React.Fragment>
      ))}
      <button className={styles.form_button}>{button.text}</button>
    </form>
  );
};

export default Form;
