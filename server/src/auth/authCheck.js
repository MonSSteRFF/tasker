const authCheck = (headers, reply) => {
  if (headers.auth !== process.env.VITE_SECRET_KEY) {
    reply.send("auth error");
  }
};

module.exports = { authCheck };
