import { FormField } from '@/components/ui/Form/Form';

const emailRegx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

type T_getValidation = (value: string, name: string, fields: FormField[]) => boolean;

const getValidation: T_getValidation = (value, name, fields) => {
  switch (name) {
    case 'identifier': {
      return emailRegx.test(value) ? true : getValidation(value, 'name', fields);
    }
    case 'name': {
      return value.length > 4 || value.length === 0;
    }
    case 'email': {
      return emailRegx.test(value);
    }
    case 'repeat-email': {
      return fields.filter((item) => item.name === 'email')[0].value === value;
    }
    case 'password': {
      return value.length > 6 || value.length === 0;
    }
    case 'repeat-password': {
      return fields.filter((item) => item.name === 'password')[0].value === value;
    }
  }

  return false;
};

export { getValidation };
