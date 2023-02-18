import React from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';

import Header from './components/Header';
import LoginPage from './modules/AuthModule/auth/Login.page';
import RegistrationPage from './modules/AuthModule/auth/Registration.page';
import HomePage from './Pages/Home.page';

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <Header />
        <HomePage />
      </>
    ),
    id: 'home',
  },
  {
    path: '/auth',
    element: <Navigate to={'/auth/login'} />,
  },
  {
    path: '/auth/login',
    element: (
      <>
        <Header />
        <LoginPage />
      </>
    ),
    id: 'login',
  },
  {
    path: '/auth/registration',
    element: (
      <>
        <Header />
        <RegistrationPage />
      </>
    ),
    id: 'registration',
  },
];

function App() {
  return <RouterProvider router={createBrowserRouter(routes)} />;
}

export { routes };

export default App;
