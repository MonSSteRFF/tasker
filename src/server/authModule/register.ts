import { NextApiResponse } from 'next';

import { prisma } from '@/server/prisma';

interface registerBody {
  name: string;
  email: string;
  password: string;
}

type T_register = (body: registerBody, res: NextApiResponse) => void;

const register: T_register = async (body, res) => {
  const repeatedEmail = await prisma.user.findFirst({
    where: { email: body.email },
  });
  const repeatedName = await prisma.user.findFirst({
    where: { name: body.name },
  });

  if (repeatedEmail === null && repeatedName === null) {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });

    const jwt = await prisma.jwt.create({
      data: {
        time: String(new Date(Date.now()).getTime()),
        userId: user.id,
      },
    });

    res.status(200).json({ token: jwt.token, refresh: jwt.refresh, jwtTime: jwt.time });
  } else {
    const jsonErrors = [];
    if (repeatedEmail !== null) {
      jsonErrors.push(errors.email);
    }
    if (repeatedName !== null) {
      jsonErrors.push(errors.name);
    }

    res.status(200).json(jsonErrors);
  }
};

const errors = {
  email: {
    name: 'email',
    error: {
      en: 'Email already has been registered',
      ru: 'Данная почта уже зарегестрированна',
    },
  },
  name: {
    name: 'name',
    error: {
      en: 'Name already has been registered',
      ru: 'Данное имя уже зарегестрировонно',
    },
  },
};

export default register;
