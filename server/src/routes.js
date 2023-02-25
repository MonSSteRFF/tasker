import checkAuthToken from './modules/checkAuthToken.js';
import getPublicKey from './api/getPublicKey.js';
import registration from './api/auth/registration.js';
import login from './api/auth/login.js';

const routes = [
  {
    path: '/api/getPublicKey',
    cb: getPublicKey,
    type: 'get',
  },
  {
    path: '/api/auth/register',
    cb: registration,
    type: 'post',
  },
  {
    path: '/api/auth/login',
    cb: login,
    type: 'post',
  },
];

const addRoutes = (fastify) => {
  routes.forEach((item) => {
    switch (item.type) {
      case 'get': {
        fastify.get(item.path, (request, reply) => {
          checkAuthToken(request, reply, item.cb);
        });
        break;
      }
      case 'post': {
        fastify.post(item.path, (request, reply) => {
          checkAuthToken(request, reply, item.cb);
        });
        break;
      }
    }
  });
};

export default addRoutes;
