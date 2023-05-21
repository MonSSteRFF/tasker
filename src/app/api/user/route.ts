'use server';

import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/prisma';
import { I_User } from '@/typings';

const POST = async (req: NextRequest) => {
  const user = (await req.json()) as I_User;

  console.log(`user: `, user);

  if (req.nextUrl.searchParams.has('login')) {
    const currentUser = await prisma.user.findFirst({
      where: {
        OR: [
          { name: user.name, password: user.password },
          { email: user.email, password: user.password },
        ],
      },
    });

    if (currentUser === null) return NextResponse.json('user undefined');

    const updateToken = await prisma.user.update({
      where: { id: currentUser.id },
      data: { token: '' },
    });

    return NextResponse.json(updateToken);
  }

  if (req.nextUrl.searchParams.has('register')) {
    const newUser = await prisma.user.create({ data: user });
    return NextResponse.json(newUser);
  }

  return NextResponse.json('error method');
};

export { POST };
