import {keysDatabase, usersDatabase} from "../../database/index.js";
import JSEncrypt from "node-jsencrypt";

const login = async (request, reply, authToken) => {
  await keysDatabase.read();
  const keyPair = keysDatabase.data[authToken];
  await keysDatabase.write();

  const crypt = new JSEncrypt();
  crypt?.setPrivateKey(keyPair.private);
  const newUserData = JSON.parse(crypt?.decrypt(request.body.data));

  await usersDatabase.read();
  const _userDatabase = Object.assign([],usersDatabase.data);
  const findUser = _userDatabase.filter((user) => {
    if (user.email === newUserData.email || user.username === newUserData.username){
      const userCrypt = new JSEncrypt();
      userCrypt?.setPublicKey(process.env.VITE_SERVER_PUBLIC_KEY);
      userCrypt?.setPrivateKey(process.env.VITE_SERVER_PRIVATE_KEY);

      return userCrypt?.decrypt(user.password) === newUserData.password
    } else {
      return false;
    }
  });
  await usersDatabase.write();

  if (findUser.length !== 0){
    reply.send(JSON.stringify({token: findUser[0].token}))
  } else {
    reply.send(JSON.stringify({error: 'username/email or password has incorrect'}))
  }
}

export default login;