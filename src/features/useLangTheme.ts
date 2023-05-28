import { useEffect } from 'react';

import useDataStore, { E_lang } from '@/store/useDataStore';
import useThemeStore from '@/store/useThemeStore';

const useLangTheme = () => {
  const currentTheme = useThemeStore((state) => state.theme);
  const currentLang = useDataStore((state) => state.currentLanguage);

  const changeLang = useDataStore((state) => state.changeLanguage);

  useEffect(() => {
    const root = document.querySelector('html');
    if (root !== null) {
      root.setAttribute('theme', currentTheme);
    }
  }, [currentTheme]);

  useEffect(() => {
    if (currentLang === undefined) {
      changeLang(E_lang.ru);
    }
  }, []);
};

export default useLangTheme;
