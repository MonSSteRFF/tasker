import JSEncrypt from 'node-jsencrypt';
import { keysDatabase, readWriteDb, usersDatabase } from '../../database/index.js';
import { serverKeys } from '../../index.js';
import decryptBody from '../../crypto/decryptBody.js';

const registration = async (request, reply, authToken) => {
  const newUserData = decryptBody(request.body.data, authToken);

  await readWriteDb(usersDatabase, (data) => {
    const matchUsers = data.filter((userdb) => {
      let error = '';

      if (userdb.email === newUserData.email) {
        error += 'email is already taken';
      }
      if (userdb.username === newUserData.username) {
        error += 'username is already taken';
      }

      if (error.length !== 0) {
        reply.send(JSON.stringify({ error: error }));
        return true;
      } else {
        return false;
      }
    });

    if (matchUsers.length === 0) {
      const userCrypt = new JSEncrypt();
      userCrypt?.setPublicKey(serverKeys.publicKey);
      userCrypt?.setPrivateKey(serverKeys.privateKey);

      usersDatabase.data.push({
        id: `${usersDatabase.data.length + 1}`,
        username: newUserData.username,
        email: newUserData.email,
        password: userCrypt?.encrypt(newUserData.password),
        token: authToken,
      });
      reply.send(JSON.stringify({ token: authToken }));
    }
  });
};

export default registration;
