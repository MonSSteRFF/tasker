import JSEncrypt from "node-jsencrypt";
import { keysDatabase } from "../database/index.js";

const getPublicKey = async (request, reply, authToken) => {
  const crypt = new JSEncrypt({ default_key_size: "1024" });
  const keyPair = {
    public: crypt?.getPublicKey(),
    private: crypt?.getPrivateKey(),
  };

  await keysDatabase.read();
  keysDatabase.data[authToken] = keyPair;
  await keysDatabase.write();

  setTimeout(async () => {
    await keysDatabase.read();
    delete keysDatabase.data[authToken];
    await keysDatabase.write();
  }, 5000);

  reply.status(200);
  reply.send(keyPair.public);
};

export default getPublicKey;
