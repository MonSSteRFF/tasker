require("dotenv").config();
const fastify = require("fastify")({ logger: true });

fastify.get("/api/getPublicKey", async (request, reply) => {
  reply.send("token");
});

fastify.post("/api/auth/register", async (request, reply) => {
  reply.send("true/false sing up");
});

fastify.post("/api/auth/login", async (request, reply) => {
  reply.send("true/false sing in");
});

fastify.listen({ port: 3000 }).then((ip, err) => {
  console.log(`server start on ${ip}`);
  if (err) {
    throw new Error(err);
  }
});
