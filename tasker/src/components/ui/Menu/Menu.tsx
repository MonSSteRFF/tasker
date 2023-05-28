'use client';

import React, { useEffect, useState } from 'react';

import useDataStore, { E_lang } from '@/store/useDataStore';
import useThemeStore, { E_theme } from '@/store/useThemeStore';

import styles from './Menu.module.scss';

const Menu = () => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const changeOpen = () => {
    setMenuIsOpen((prev) => !prev);
  };

  const changeLang = useDataStore((state) => state.changeLanguage);
  const currentLang = useDataStore((state) => state.currentLanguage);

  const changeTheme = useThemeStore((state) => state.changeTheme);
  const currentTheme = useThemeStore((state) => state.theme);

  const [theme, setTheme] = useState<E_theme>();
  const [lang, setLang] = useState<E_lang>();

  useEffect(() => {
    setTheme(currentTheme);
    setLang(currentLang);
  }, [currentLang, currentTheme]);

  return (
    <div className={styles.menu}>
      <div
        className={`${styles.menu_button} ${menuIsOpen ? styles.open : ''}`}
        onClick={changeOpen}
      >
        <span />
        <span />
        <span />
      </div>
      <div className={`${styles.menu_fields} ${menuIsOpen ? styles.open : ''}`}>
        <div className={styles.lang}>
          {[E_lang.ru, E_lang.en].map((item, index) => (
            <button
              className={`${styles.lang_btn} ${lang === item ? styles.active : ''}`}
              key={item + index}
              onClick={() => changeLang(item)}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
        <div className={styles.theme}>
          {[E_theme.white, E_theme.black].map((item, index) => (
            <button
              className={`${styles.theme_btn} ${theme === item ? styles.active : ''}`}
              key={item + index}
              onClick={() => changeTheme(item)}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
