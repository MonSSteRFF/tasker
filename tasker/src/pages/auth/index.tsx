import React, { useState } from 'react';

import Form, { FormField } from '@/components/ui/Form/Form';
import Preloader from '@/components/ui/Preloader/Preloader';
import useGetAuthContent from '@/pages/auth/useGetAuthContent';
import { FormState } from '@/store/useDataStore.module';

const AuthPage = () => {
  const [currentForm, setCurrentForm] = useState<FormState | undefined>(undefined);
  const query = useGetAuthContent(setCurrentForm);

  const submitFormHandler = (
    fields: { [p: string]: string },
    redactorFormFields: React.Dispatch<React.SetStateAction<FormField[]>>,
  ) => {
    console.log(query, fields);
  };

  return (
    <main className={'container fullHeight'}>
      {currentForm !== undefined ? (
        <Form
          {...currentForm}
          className={'smallContainer'}
          formCallBack={submitFormHandler}
        />
      ) : (
        <Preloader type={'big'} />
      )}
    </main>
  );
};

export default AuthPage;
