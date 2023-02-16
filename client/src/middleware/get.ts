import axios from 'axios';

//const
const headers = { Auth: import.meta.env.VITE_SECRET_KEY };
const apiLink = import.meta.env.VITE_API;

//types
type T_getFields = (query?: string) => any;
type T_postFields = (query?: string, body?: object) => any;

const getFields: T_getFields = async (query = '') => {
  const queryString = query !== '' ? `?${query}` : '';

  const data = await axios
    .get(`${apiLink}api${queryString}`, { headers: headers })
    .then((res) => res.data);

  return data;
};

const postFields: T_postFields = async (query = '', body = {}) => {
  const queryString = query !== '' ? `?${query}` : '';

  const response = await axios
    .post(`${apiLink}api${queryString}`, {
      headers: headers,
      data: body,
    })
    .then((res) => res.data);

  return response;
};

export { getFields, postFields };
