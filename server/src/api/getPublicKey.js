import generateNewKeyPair from "../crypto/generateNewKeyPair.js";

const getPublicKey = async (request, reply, authToken) => {
  const keyPair = await generateNewKeyPair(authToken);

  reply.status(200);
  reply.send(keyPair.public);
};

export default getPublicKey;
