import { apiWithoutToken } from '@/features/useApi';
import { E_lang } from '@/store/useDataStore';

export interface FormState_field {
  name: string;
  placeholder: string;
  validText: string;
  repeat?: string;
}

export interface FormState {
  title: string;
  fields: FormState_field[];
  links: { link: string; name: string }[];
  button: string;
}

export interface I_dataStore_authForm {
  login: FormState;
  register: FormState;
  refresh: FormState;
}

export interface I_dataStore {
  authForm: I_dataStore_authForm;
}

export const getData = async (lang: E_lang): Promise<I_dataStore> => {
  return apiWithoutToken.get(`/data?${lang}`).then((res) => JSON.parse(res.data));
};
