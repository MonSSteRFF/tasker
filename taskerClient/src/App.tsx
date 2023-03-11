import React from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path={'/'}>
          {/*<Route element={<Layout />}>*/}
          {/*  <Route index element={<HomePage />} />*/}
          {/*  <Route path={'profile'} element={<ProfilePage />} />*/}
          {/*</Route>*/}

          {/*<Route path={'/auth'} element={<Layout />}>*/}
          {/*  <Route path={'login'} element={<LoginPage />} />*/}
          {/*  <Route path={'registration'} element={<RegistrationPage />} />*/}
          {/*</Route>*/}
        </Route>
      </Routes>
    </>
  );
}

export default App;
