import axios from 'axios';
import { JSEncrypt } from 'jsencrypt';

type t_unicToken = (unicAuthToken: string, data: string) => Promise<string | false>;

const unicTokenFetch: t_unicToken = async (unicAuthToken, formData) => {
  const encryptedStr = await axios
    .get(`${import.meta.env.VITE_API}/api/getPublicKey?authToken=${unicAuthToken}`)
    .then(({ data }) => {
      const crypt = new JSEncrypt();
      crypt.setPublicKey(data);
      return crypt.encrypt(formData);
    });
  return encryptedStr === false ? '' : encryptedStr;
};

export default unicTokenFetch;
