import dotenv from 'dotenv';
dotenv.config();
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
  const newUserData = JSON.parse(crypt?.decrypt(request.body.data));


  await usersDatabase.read();
  const _userDatabase = Object.assign([],usersDatabase.data);
  const matchUsers = _userDatabase.filter((userdb) => {
    if (userdb.email === newUserData.email){
      reply.send({error: 'email is already taken'})
      return true;
    }
    if (userdb.username === newUserData.username){
      reply.send({error: 'username is already taken'})
      return true;
    }
    return false;
  })


  if (matchUsers.length === 0){
    const userCrypt = new JSEncrypt();
    userCrypt?.setPublicKey(process.env.VITE_SERVER_PUBLIC_KEY);
    userCrypt?.setPrivateKey(process.env.VITE_SERVER_PRIVATE_KEY);

    usersDatabase.data.push({
      id: `${usersDatabase.data.length + 1}`,
      username: newUserData.username,
      email: newUserData.email,
      password: userCrypt?.encrypt(newUserData.password)
    });
    reply.send({data: "user added"})
  }
  await usersDatabase.write();
};

export { registration };
