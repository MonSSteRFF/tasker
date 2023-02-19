import './index.scss';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';

import montserrat400 from '@fontsource/montserrat/files/montserrat-all-400-normal.woff';
import montserrat500 from '@fontsource/montserrat/files/montserrat-all-500-normal.woff';
import montserrat600 from '@fontsource/montserrat/files/montserrat-all-600-normal.woff';
import montserrat400w2 from '@fontsource/montserrat/files/montserrat-cyrillic-ext-400-normal.woff2';
import montserrat500w2 from '@fontsource/montserrat/files/montserrat-cyrillic-ext-500-normal.woff2';
import montserrat600w2 from '@fontsource/montserrat/files/montserrat-cyrillic-ext-600-normal.woff2';

import favicon from '@/assets/icons/favicon.svg';

const montserratFontsPack = [
  { font: montserrat400, type: 'woff' },
  { font: montserrat500, type: 'woff' },
  { font: montserrat600, type: 'woff' },
  { font: montserrat400w2, type: 'woff2' },
  { font: montserrat500w2, type: 'woff2' },
  { font: montserrat600w2, type: 'woff2' },
];

import { createRoot } from 'react-dom/client';
import { Helmet } from 'react-helmet';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <>
    <Helmet>
      <meta charSet="UTF-8" />
      <title>Tasker</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <link rel="icon" href={favicon} type="image/x-icon" />

      {montserratFontsPack.map((item, index) => (
        <link key={index} href={item.font} type={`font/${item.type}`} />
      ))}
    </Helmet>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>,
);
