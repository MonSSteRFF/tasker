import { useRouter } from 'next/router';
import React, { SetStateAction, useEffect } from 'react';

import useDataStore from '@/store/useDataStore';
import { FormState } from '@/store/useDataStore.module';

const useGetAuthContent = (
  setCurrentForm: React.Dispatch<SetStateAction<FormState | undefined>>,
) => {
  const router = useRouter();
  const content = useDataStore((state) => state.data?.authForm);

  const query =
    router.query.refresh === ''
      ? 'refresh'
      : router.query.register === ''
      ? 'register'
      : 'login';

  useEffect(() => {
    if (
      router.query.refresh === undefined &&
      router.query.register === undefined &&
      router.query.login === undefined
    ) {
      return;
    }

    if (content !== undefined) {
      setCurrentForm(content[query]);
    }
  }, [router.query, content, setCurrentForm]);

  return query;
};

export default useGetAuthContent;
