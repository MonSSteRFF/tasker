import { useInput_endpoint } from './FormModule.types';
const emailRegex = /[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+/i;

type validationFunc = (field: useInput_endpoint, value: string) => void;
type validationFuncСompare = (
  field: useInput_endpoint,
  compareField: useInput_endpoint,
  value: string,
) => void;

const validation_username: validationFunc = (field, value) => {
  const _setIsValid = field.validState.setState;
  const _setError = field.errorState.setState;

  if (value.length > 2) {
    _setIsValid(true);
    _setError('');
  } else {
    _setIsValid(false);
    _setError('username to short');
  }
};

const validation_email: validationFunc = (field, value) => {
  const _setIsValid = field.validState.setState;
  const _setError = field.errorState.setState;

  if (emailRegex.test(value)) {
    _setIsValid(true);
    _setError('');
  } else {
    _setIsValid(false);
    _setError('wrong email');
  }
};

const validation_password: validationFunc = (field, value) => {
  const _setIsValid = field.validState.setState;
  const _setError = field.errorState.setState;

  if (value.length > 8) {
    _setIsValid(true);
    _setError('');
  } else {
    _setIsValid(false);
    _setError('password to short');
  }
};

const validation_compareFields: validationFuncСompare = (field, compareField, value) => {
  const _setIsValid = field.validState.setState;
  const _setError = field.errorState.setState;

  if (compareField.input.value === value) {
    _setIsValid(true);
    _setError('');
  } else {
    _setIsValid(false);
    _setError(`passwords don't match`);
  }
};

export {
  validation_compareFields,
  validation_email,
  validation_password,
  validation_username,
};
