import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { getValidation } from '@/components/ui/Form/Form.module';
import Input from '@/components/ui/Form/Input';
import { FormState } from '@/store/useDataStore.module';

import styles from './Form.module.scss';

export interface FormField {
  value: string;
  name: string;
  placeholder: string;
  isValid: boolean;
  validText: string;
  errorText: string;
}

interface FormProps extends FormState {
  className: string;
  formCallBack: (
    fields: { [key: string]: string },
    redactorFormFields: React.Dispatch<React.SetStateAction<FormField[]>>,
  ) => void;
}

const Form: React.FC<FormProps> = (props) => {
  const { fields, title, button, className, formCallBack, links } = props;

  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [buttonValid, setButtonValid] = useState<boolean>(false);

  const router = useRouter();

  const onChangeValue = (newValue: string, name: string) => {
    const valid = getValidation(newValue, name, formFields);

    console.log(valid);

    setFormFields((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, value: newValue, isValid: valid } : item,
      ),
    );
  };

  useEffect(() => {
    setFormFields(
      fields.map((item) => ({ ...item, value: '', isValid: true, errorText: '' })),
    );
  }, [fields]);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj: { [key: string]: string } = {};
    let formValid = true;

    formFields.forEach((item) => {
      if (item.name.split('-')[0] !== 'repeat') {
        obj[item.name] = item.value;
      }
      if (!item.isValid || item.value === '') {
        formValid = false;
      }
    });

    if (formValid) {
      formCallBack(obj, setFormFields);
    } else {
      setButtonValid(true);
    }
  };

  useEffect(() => {
    if (buttonValid) {
      setTimeout(() => {
        setButtonValid(false);
      }, 500);
    }
  }, [buttonValid]);

  const changeQuery = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    link: string,
  ) => {
    e.preventDefault();
    router.push({ query: link });
  };

  return (
    <form className={`${styles.form} ${className}`} onSubmit={(e) => submitForm(e)}>
      <h1 className={styles.form_title}>{title}</h1>
      {formFields &&
        formFields.map((item, index) => (
          <Input
            key={item.name + index}
            {...item}
            onChangeValue={onChangeValue}
            buttonValid={buttonValid}
          />
        ))}

      {links.map((linkItem, index) => (
        <button
          onClick={(e) => changeQuery(e, linkItem.link)}
          key={linkItem.link + index}
          className={styles.form_link}
        >
          {linkItem.name}
        </button>
      ))}

      <button className={`${styles.form_button} ${buttonValid ? styles.notValid : ''}`}>
        {button}
      </button>
    </form>
  );
};

export default Form;
