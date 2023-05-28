import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const deleteJwtByTimeStamp = async () => {
  const currentTime = new Date(Date.now()).getTime();
  const maxTime = 1000 * 60 * 60 * 30; // 30 минут 1000 * 60 * 60 * 30

  const filteredJwtForDelete = await prisma.jwt
    .findMany()
    .then((jwts) =>
      jwts
        .filter((jwt) => Number(jwt.time) < currentTime - maxTime)
        .map((i) => ({ time: i.time })),
    );

  const deleteJwt = await prisma.jwt.deleteMany({
    where: { OR: filteredJwtForDelete },
  });
  console.log(`deleted jwt count: `, deleteJwt.count);
};

export { deleteJwtByTimeStamp, prisma };
