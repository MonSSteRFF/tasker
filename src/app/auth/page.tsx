'use server';

import fs from 'fs';
import React from 'react';

import AuthPage from '@/app/auth/AuthPage';
import { T_Page } from '@/app/typings';

const Page: T_Page = (req) => {
  const authData = JSON.parse(fs.readFileSync('./data/auth/authData.json', 'utf8'));

  console.log(req.searchParams.login);

  const currentPage =
    req.searchParams.login !== undefined
      ? 'login'
      : req.searchParams.register !== undefined
      ? 'register'
      : req.searchParams.refresh !== undefined
      ? 'refresh'
      : 'wrong';

  return (
    <main>
      <AuthPage currentPage={currentPage} authData={authData[currentPage]} />
    </main>
  );
};

export default Page;
