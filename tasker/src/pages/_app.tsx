import '@fontsource/montserrat/200.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/800.css';
import '@/styles/globals.scss';

import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

import Menu from '@/components/ui/Menu/Menu';
import Preloader from '@/components/ui/Preloader/Preloader';
import PreloaderLine from '@/components/ui/Preloader/PreloaderLine';
import useAuthChecker from '@/features/useAuthChecker';
import useLangTheme from '@/features/useLangTheme';

export default function App({ Component, pageProps }: AppProps) {
  useAuthChecker();
  useLangTheme();

  const [isShow, setIsShow] = useState<boolean>(false);
  const [lineStamp, setLineStamp] = useState<number>(0);

  useEffect(() => {
    const time = 500;

    const interval = setInterval(() => {
      setLineStamp((prev) => {
        const newStamp = prev + 100 / time;
        if (newStamp >= 100) {
          setIsShow(true);
          clearInterval(interval);
        }
        return newStamp;
      });
    }, 1);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {isShow ? (
        <>
          <Component {...pageProps} />
          <Menu />
        </>
      ) : (
        <div className={'fullHeight smallContainer'}>
          <Preloader type={'big'} />
          <PreloaderLine lineStamp={lineStamp} />
        </div>
      )}
    </>
  );
}
