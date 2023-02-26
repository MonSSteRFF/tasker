import dotenv from 'dotenv';
import fastifyApp from 'fastify';
import cors from '@fastify/cors';
import { keysDatabase, readWriteDb } from './database/index.js';
import addRoutes from './routes.js';
dotenv.config();

const fastify = fastifyApp({ logger: true });
fastify.register(cors);

addRoutes(fastify);

fastify.listen({ port: 3000 }).then(async (ip, err) => {
  console.log(`server start on ${ip}`);
  await readWriteDb(keysDatabase, (data) => {
    data = {};
    return data;
  });
  if (err) {
    throw new Error(err);
  }
});

const serverKeys = {
  publicKey: process.env.VITE_SERVER_PUBLIC_KEY,
  privateKey: process.env.VITE_SERVER_PRIVATE_KEY,
};

export { serverKeys };
