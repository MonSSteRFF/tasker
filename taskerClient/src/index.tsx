import './index.scss';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Helmet } from 'react-helmet';
import { BrowserRouter } from 'react-router-dom';

import favicon from '../public/favicon.svg';
import App from './App';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <>
    <Helmet>
      <link rel="icon" href={favicon} type="image/x-icon" />
    </Helmet>

    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>,
);
