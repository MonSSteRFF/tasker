import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate, useOutlet } from 'react-router-dom';

import useAuthStore from '@/modules/AuthModule/store/useAuthStore';

import Header from './components/Header/Header';
import LoginPage from './modules/AuthModule/authPages/Login.page';
import RegistrationPage from './modules/AuthModule/authPages/Registration.page';
import HomePage from './modules/HomeModule/Home.page';

const Layout = () => {
  const outlet = useOutlet();
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const isLoginIn = useAuthStore((state) => state.isLoginIn);

  useEffect(() => {
    if (pathname === '/auth') {
      navigate('/auth/login');
    }
    if (isLoginIn && pathname.includes('/auth')) {
      navigate('/');
    }
    if (!isLoginIn && !pathname.includes('/auth')) {
      navigate('/auth');
    }
  }, [pathname, outlet, isLoginIn]);

  return (
    <>
      <Header />
      {outlet}
    </>
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route path={'/'}>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>

          <Route path={'/auth'} element={<Layout />}>
            <Route path={'login'} element={<LoginPage />} />
            <Route path={'registration'} element={<RegistrationPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
