import JSEncrypt from 'node-jsencrypt';
import { keysDatabase, readWriteDb } from '../database/index.js';

const generateNewKeyPair = async (authToken) => {
  const crypt = new JSEncrypt({ default_key_size: '1024' });

  const keyPair = {
    public: crypt?.getPublicKey(),
    private: crypt?.getPrivateKey(),
  };

  await readWriteDb(keysDatabase, async (data) => {
    data[authToken] = keyPair;
  }).then(() => {
    setTimeout(async () => {
      await readWriteDb(keysDatabase, (data) => {
        delete data[authToken];
        return data;
      });
    }, 1000);
  });

  return keyPair;
};

export default generateNewKeyPair;
