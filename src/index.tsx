import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import MainRouter from './components/layouts/MainRouter';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <BrowserRouter>
    <MainRouter />
  </BrowserRouter>,
);
