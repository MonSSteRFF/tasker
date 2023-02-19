import dotenv from "dotenv";
import fastifyApp from "fastify";
dotenv.config();

const fastify = fastifyApp({ logger: true });

import { getPublicKey } from "./auth/getPublicKey.js";
import { registration } from "./auth/registration.js";
import { keysDatabase } from "./database/index.js";

fastify.get("/api/getPublicKey", (request, reply) => {
  getPublicKey(request, reply);
});

fastify.post("/api/auth/register", async (request, reply) => {
  registration(request, reply);
});

fastify.post("/api/auth/login", async (request, reply) => {
  reply.send("true/false sing in");
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
