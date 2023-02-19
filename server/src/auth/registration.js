import JSEncrypt from "node-jsencrypt";
import { keysDatabase, usersDatabase } from "../database/index.js";

const registration = async (request, reply) => {
  request.query.authToken ||= undefined;
  const authToken = request.query.authToken;
  if (authToken === undefined) {
    reply.status(401);
    reply.send("authToken required");
  }

  await keysDatabase.read();
  const keyPair = keysDatabase.data[authToken];
  await keysDatabase.write();

  const crypt = new JSEncrypt();
  crypt?.setPrivateKey(keyPair.private);
  const newUserData = crypt?.decrypt(request.body.data);

  console.log(newUserData);

  await usersDatabase.read();
  const currentUsers = usersDatabase.data;

  await usersDatabase.write();

  console.log(newUserData);
};

export { registration };
