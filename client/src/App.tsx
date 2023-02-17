import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Form from './components/ui/FormModule/Form';
import {
  formFieldData,
  useInput_endpoint,
} from './components/ui/FormModule/FormModule.types';
import useInput from './components/ui/FormModule/useInput';
import LoginPage from './modules/AuthModule/auth/Login.page';
import RegistrationPage from './modules/AuthModule/auth/Registration.page';
import HomePage from './Pages/Home.page';

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
  const onSubmitFormHandler = (data: Array<formFieldData>) => {
    console.log(data);
  };

  const usernameValidation = (value: string) => {
    console.log(value);

    const field = fields.filter((item) => item.input.name === 'username')[0];

    console.log(field.validState.state);
    console.log(field.validState.setState);
    console.log(field.errorState.state);
    console.log(field.errorState.setState);
    // todo: fieldValidation type username
  };
  const passwordValidation = (value: string) => {
    console.log(value);
  };

  const fields: Array<useInput_endpoint> = [
    useInput({
      placeholder: 'Username',
      name: 'username',
      onChangeField: usernameValidation,
    }),
    useInput({
      placeholder: 'Password',
      name: 'password',
      type: 'password',
      onChangeField: passwordValidation,
    }),
  ];

  return (
    <>
      <Form
        title={'test form'}
        fields={fields}
        button={{ text: 'send', callback: onSubmitFormHandler }}
      />

      {/*<Routes>*/}
      {/*  {routes.map((route) => (*/}
      {/*    <Route*/}
      {/*      key={route.id}*/}
      {/*      index={route.id === 'home'}*/}
      {/*      element={*/}
      {/*        <>*/}
      {/*          <Header />*/}
      {/*          <route.element />*/}
      {/*        </>*/}
      {/*      }*/}
      {/*      path={route.path}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</Routes>*/}
    </>
  );
}

export { routes };

export default App;
