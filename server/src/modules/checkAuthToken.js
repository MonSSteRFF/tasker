const checkAuthToken = (request, reply) => {
  request.query.authToken ||= undefined;
  const authToken = request.query.authToken;
  if(authToken === undefined) {
    reply.status(401);
    reply.send("authToken required");
    return false;
  }
  return authToken;
}

export default checkAuthToken;