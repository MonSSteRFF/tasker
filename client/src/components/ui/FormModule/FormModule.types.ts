import React from 'react';

interface useInput_props {
  init?: string;
  placeholder: string;
  type?: string;
  name: string;
  onChangeField?: (value: string) => void;
}

interface useInput_endpoint {
  input: {
    element: JSX.Element;
    value: string;
    name: string;
  };
  validState: {
    state: boolean;
    setState: React.Dispatch<React.SetStateAction<boolean>>;
  };
  errorState: {
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
  };
}

interface form_props {
  title: string;
  fields: Array<useInput_endpoint>;
  button: {
    text: string;
    callback: (data: Array<formFieldData>) => void;
  };
}

interface formFieldData {
  name: string;
  value: string;
  isValid: boolean;
}

export type { form_props, formFieldData, useInput_endpoint, useInput_props };
