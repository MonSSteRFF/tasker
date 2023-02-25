import JSEncrypt from "node-jsencrypt";
import { keysDatabase } from "../database/index.js";

const getPublicKey = async (request, reply) => {
  request.query.authToken ||= undefined;
  const authToken = request.query.authToken;
  if (authToken === undefined) {
    reply.status(401);
    reply.send("authToken required");
  }

  const crypt = new JSEncrypt({ default_key_size: "1024" });
  const keyPair = {
    public: crypt?.getPublicKey(),
    private: crypt?.getPrivateKey(),
  };
  console.log(keyPair);

  await keysDatabase.read();
  keysDatabase.data[authToken] = keyPair;
  setTimeout(async () => {
    await keysDatabase.read();
    delete keysDatabase.data[authToken];
    await keysDatabase.write();
  }, 5000);
  await keysDatabase.write();

  reply.status(200);
  reply.send(keyPair.public);
};

export { getPublicKey };
