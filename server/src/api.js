const getApi = (query) => {
  console.log(query);

  return { hello: query };
};

const postApi = (query, body) => {
  console.log(query, body);

  return { hello: "world" };
};

module.exports = { getApi, postApi };
