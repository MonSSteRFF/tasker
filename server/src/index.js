import dotenv from "dotenv";
import fastifyApp from "fastify";
dotenv.config();

import cors from '@fastify/cors'

const fastify = fastifyApp({ logger: true });
fastify.register(cors);


import getPublicKey from "./api/getPublicKey.js";
import registration from "./api/auth/registration.js";
import { keysDatabase } from "./database/index.js";
import checkAuthToken from "./modules/checkAuthToken.js";
import login from "./api/auth/login.js";

fastify.get("/api/getPublicKey", (request, reply) => {
  const authToken = checkAuthToken(request, reply);
  if (authToken !== false){
    getPublicKey(request, reply, authToken);
  }
});


fastify.post("/api/auth/register", (request, reply) => {
  const authToken = checkAuthToken(request, reply);
  if (authToken !== false){
    registration(request, reply, authToken);
  }
});

fastify.post("/api/auth/login", (request, reply) => {
  const authToken = checkAuthToken(request, reply);
  if (authToken !== false){
    login(request, reply, authToken);
  }
});

fastify.listen({ port: 3000 }).then((ip, err) => {
  console.log(`server start on ${ip}`);
  clearKeys();
  if (err) {
    throw new Error(err);
  }
});

const clearKeys = async () => {
  await keysDatabase.read();
  keysDatabase.data = {};
  await keysDatabase.write();
};
