interface I_User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

type T_Page = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => JSX.Element;

interface FormProps {
  title: string;
  switchPage?: Array<{ text: string; to: string }>;
  button: string;
  fields: Array<string>;
}

enum FormFieldNameEnum {
  'nameEmail' = 'nameEmail',
  'name' = 'name',
  'email' = 'email',
  'password' = 'password',
  'repeat_password' = 'repeat_password',
}

export { FormFieldNameEnum };
export type { FormProps, I_User, T_Page };
