import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './Pages/Home.page';
import LoginPage from './Pages/Login.page';
import RegistrationPage from './Pages/Registration.page';

const routes = [
  {
    path: '/',
    element: HomePage,
    id: 'home',
  },
  {
    path: '/login',
    element: LoginPage,
    id: 'login',
  },
  {
    path: '/registration',
    element: RegistrationPage,
    id: 'registration',
  },
];

function App() {
  return (
    <>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.id}
            index={route.id === 'home'}
            element={
              <>
                <Header />
                <route.element />
              </>
            }
            path={route.path}
          />
        ))}
      </Routes>
    </>
  );
}

export { routes };

export default App;
