const { authCheck } = require("./auth/authCheck");
const { getApi, postApi } = require("./api");
require("dotenv").config();
const fastify = require("fastify")({ logger: true });

// get

// todo: https://github.com/typicode/lowdb

fastify.get("/*", async (request, reply) => {
  authCheck(request.headers, reply);

  if (request.url.split("?").shift() === "/api") {
    return getApi(request.query);
  }

  return "bad request";
});

fastify.post("/*", async (request, reply) => {
  authCheck(request.headers, reply);

  if (request.url.split("?").shift() === "/api") {
    return postApi(request.query, request.body);
  }

  return "bad request";
});

fastify.listen({ port: 3000 }).then((ip, err) => {
  console.log(`server start on ${ip}`);
  if (err) {
    throw new Error(err);
  }
});
