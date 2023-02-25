import { readWriteDb, usersDatabase } from '../../database/index.js';
import JSEncrypt from 'node-jsencrypt';
import { serverKeys } from '../../index.js';
import decryptBody from '../../crypto/decryptBody.js';

const login = async (request, reply, authToken) => {
  const newUserData = decryptBody(request.body.data, authToken);

  await readWriteDb(usersDatabase, (data) => {
    const findUser = data.filter((user) => {
      if (user.email === newUserData.email || user.username === newUserData.username) {
        const userCrypt = new JSEncrypt();
        userCrypt?.setPublicKey(serverKeys.publicKey);
        userCrypt?.setPrivateKey(serverKeys.privateKey);

        return userCrypt?.decrypt(user.password) === newUserData.password;
      } else {
        return false;
      }
    });

    if (findUser.length !== 0) {
      reply.send(JSON.stringify({ token: findUser[0].token }));
    } else {
      reply.send(JSON.stringify({ error: 'username/email or password has incorrect' }));
    }
  });
};

export default login;
