const dotenv = require("dotenv");
const { authCheck } = require("./auth/authCheck");
dotenv.config();

const fastify = require("fastify")({ logger: true });

fastify.get("/*", async (request, reply) => {
  authCheck(request.headers, reply);

  return { req: "data" };
});

fastify.listen({ port: 3000 }).then((ip, err) => {
  console.log(`server start on ${ip}`);
  if (err) {
    throw new Error(err);
  }
});
