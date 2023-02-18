import './index.scss';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';

import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(<App />);
