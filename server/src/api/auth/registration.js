import dotenv from 'dotenv';
dotenv.config();
import JSEncrypt from "node-jsencrypt";
import { keysDatabase, usersDatabase } from "../../database/index.js";

const registration = async (request, reply, authToken) => {
  await keysDatabase.read();
  const keyPair = keysDatabase.data[authToken];
  await keysDatabase.write();

  const crypt = new JSEncrypt();
  crypt?.setPrivateKey(keyPair.private);
  const newUserData = JSON.parse(crypt?.decrypt(request.body.data));


  await usersDatabase.read();
  const _userDatabase = Object.assign([],usersDatabase.data);
  const matchUsers = _userDatabase.filter((userdb) => {
    let error = '';

    if (userdb.email === newUserData.email){
      error += 'email is already taken'
    }
    if (userdb.username === newUserData.username){
      error += 'username is already taken'
    }

    if (error.length !== 0){
      reply.send(JSON.stringify({error: error}));
      return true;
    } else {
      return false;
    }
  })


  if (matchUsers.length === 0){
    const userCrypt = new JSEncrypt();
    userCrypt?.setPublicKey(process.env.VITE_SERVER_PUBLIC_KEY);
    userCrypt?.setPrivateKey(process.env.VITE_SERVER_PRIVATE_KEY);

    usersDatabase.data.push({
      id: `${usersDatabase.data.length + 1}`,
      username: newUserData.username,
      email: newUserData.email,
      password: userCrypt?.encrypt(newUserData.password),
      token: authToken,
    });
    reply.send(JSON.stringify({token: authToken}))
  }
  await usersDatabase.write();
};

export default registration;
