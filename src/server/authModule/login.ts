import { NextApiResponse } from 'next';

import { prisma } from '@/server/prisma';

interface registerBody {
  identifier: string;
  password: string;
}

type T_login = (body: registerBody, res: NextApiResponse) => void;

const login: T_login = async (body, res) => {
  const findUser = await prisma.user.findFirst({
    where: { OR: [{ email: body.identifier }, { name: body.identifier }] },
  });

  if (findUser !== null) {
    if ((await prisma.jwt.findFirst({ where: { userId: findUser.id } })) !== null) {
      const deleteJwt = await prisma.jwt.delete({ where: { userId: findUser.id } });
    }

    const jwt = await prisma.jwt.create({
      data: {
        time: String(new Date(Date.now()).getTime()),
        userId: findUser.id,
      },
    });

    res.status(200).json({ token: jwt.token, refresh: jwt.refresh, jwtTime: jwt.time });
  } else {
    res.status(200).json([
      {
        name: 'identifier',
        error: {
          en: 'name/email and/or password has incorrect',
          ru: 'Логин/почта или/и пароль не верные',
        },
      },
    ]);
  }
};

export default login;
