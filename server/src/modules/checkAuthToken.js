const checkAuthToken = (request, reply, func) => {
  request.query.authToken ||= undefined;
  const authToken = request.query.authToken;
  if (authToken === undefined) {
    reply.status(401);
    reply.send('authToken required');
    return false;
  }

  func(request, reply, authToken);
};

export default checkAuthToken;
