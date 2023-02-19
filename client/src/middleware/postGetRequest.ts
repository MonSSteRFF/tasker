import axios from 'axios';

const apiLink = import.meta.env.VITE_API;

const GetRequest: (query?: string, authToken?: string) => any = async (
  query = '',
  authToken = '',
) => {
  const queryString = query !== '' ? `${query}` : '';

  const data = await axios
    .get(`${apiLink}api${queryString}`, { headers: { AuthToken: authToken } })
    .then((res) => res.data);

  return data;
};

const PostRequest: (query?: string, body?: object, authToken?: string) => any = async (
  query = '',
  body = {},
  authToken = '',
) => {
  const queryString = query !== '' ? `?${query}` : '';

  const response = await axios
    .post(`${apiLink}api${queryString}`, {
      headers: { AuthToken: authToken },
      data: body,
    })
    .then((res) => res.data);

  return response;
};

export { GetRequest, PostRequest };
