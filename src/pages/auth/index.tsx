import { useRouter } from 'next/router';
import React, { useState } from 'react';

import FullPageLayout from '@/components/layout/FullPageLayout';
import Form, { FormField } from '@/components/ui/Form/Form';
import Preloader from '@/components/ui/Preloader/Preloader';
import { apiWithoutToken } from '@/features/useApi';
import useGetAuthContent from '@/pages/auth/useGetAuthContent';
import useAuthStore from '@/store/useAuthStore';
import useDataStore from '@/store/useDataStore';
import { FormState } from '@/store/useDataStore.module';

interface I_ErrorMessage {
  name: string;
  error: { en: string; ru: string };
}

interface I_Jwt {
  token: string;
  refresh: string;
  jwtTime: string;
}

const AuthPage = () => {
  const [currentForm, setCurrentForm] = useState<FormState | undefined>(undefined);
  const query = useGetAuthContent(setCurrentForm);

  const currentLang = useDataStore((state) => state.currentLanguage);
  const setJwt = useAuthStore((state) => state.setJwt);

  const router = useRouter();

  const submitFormHandler = (
    fields: { [p: string]: string },
    redactorFormFields: React.Dispatch<React.SetStateAction<FormField[]>>,
  ) => {
    apiWithoutToken.post(`/auth?${query}`, fields).then((res) => {
      console.log(res.data);

      if (res.data.token === undefined) {
        const errorData: I_ErrorMessage[] = res.data;
        redactorFormFields((prev) =>
          prev.map((item) => {
            let errorMessage = '';
            console.log(errorData);

            errorData.forEach((errorItem) => {
              if (errorItem.name === item.name && currentLang !== undefined) {
                errorMessage = errorItem.error[currentLang];
              }
            });

            return errorMessage === '' ? item : { ...item, errorText: errorMessage };
          }),
        );
      } else {
        setJwt({
          token: res.data.token,
          refresh: res.data.refresh,
          jwtTime: res.data.jwtTime,
        });
        router.push('/');
      }
    });
  };

  return (
    <FullPageLayout title={query}>
      {currentForm !== undefined ? (
        <Form
          {...currentForm}
          className={'smallContainer'}
          formCallBack={submitFormHandler}
        />
      ) : (
        <Preloader type={'big'} />
      )}
    </FullPageLayout>
  );
};

export default AuthPage;
