import '@fontsource/montserrat/200.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/800.css';
import '@/styles/globals.scss';

import type { AppProps } from 'next/app';

import FullPageLayout from '@/components/layout/FullPageLayout';
import Menu from '@/components/ui/Menu/Menu';
import Preloader from '@/components/ui/Preloader/Preloader';
import PreloaderLine from '@/components/ui/Preloader/PreloaderLine';
import useAuthChecker from '@/features/useAuthChecker';
import useLangTheme from '@/features/useLangTheme';
import useMainPreload from '@/features/useMainPreload';

export default function App({ Component, pageProps }: AppProps) {
  useAuthChecker();
  useLangTheme();

  const { isShow, lineStamp } = useMainPreload();

  return (
    <>
      {isShow ? (
        <>
          <Component {...pageProps} />
          <Menu />
        </>
      ) : (
        <FullPageLayout className={'fullHeight smallContainer'}>
          <Preloader type={'big'} />
          <PreloaderLine lineStamp={lineStamp} />
        </FullPageLayout>
      )}
    </>
  );
}
