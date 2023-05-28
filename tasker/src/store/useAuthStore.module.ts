import { apiWithoutToken } from '@/features/useApi';

export interface RegisterArgs {
  name: string;
  email: string;
  password: string;
}

export type T_register = (args: RegisterArgs) => Promise<{
  jwt: string;
  refresh: string;
}>;

const register: T_register = async (args) => {
  return await apiWithoutToken.post('auth', { data: args }).then((res) => {
    console.log(res.data);
    return res.data;
  });
};

export interface LoginArgs {
  identifier: string;
  password: string;
}

export type T_login = (args: LoginArgs) => Promise<{
  jwt: string;
  refresh: string;
}>;

const login: T_login = async (args) => {
  return await apiWithoutToken.post('auth', { data: args }).then((res) => {
    console.log(res.data);
    return res.data;
  });
};

export { login, register };
