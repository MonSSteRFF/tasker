import { keysDatabase, readWriteDb } from '../database/index.js';
import JSEncrypt from 'node-jsencrypt';

const decryptBody = async (data, authToken) => {
  const allKeys = await readWriteDb(keysDatabase);
  const keyPair = allKeys[authToken];

  const crypt = new JSEncrypt();
  crypt?.setPrivateKey(keyPair.private);

  return JSON.parse(crypt?.decrypt(data));
};

export default decryptBody;
