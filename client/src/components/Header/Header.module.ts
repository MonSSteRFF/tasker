import { I_NavigationRouteList } from '@/components/Header/Header';

const hideRoutes = (pathname: string, routesList: Array<I_NavigationRouteList>) => {
  let newRoutes = [];

  if (pathname === '/auth/login' || pathname === '/auth/registration') {
    newRoutes = routesList.filter(
      (item) => item.path === '/auth/login' || item.path === '/auth/registration',
    );
  } else {
    newRoutes = routesList.filter(
      (item) => item.path !== '/auth/login' && item.path !== '/auth/registration',
    );
  }

  return newRoutes;
};

const takeCurrentPathnameId = (
  pathname: string | undefined | null,
  routes: Array<I_NavigationRouteList>,
) => {
  const path = pathname !== undefined && pathname !== null ? pathname : '/';

  let id = -1;

  routes.forEach((item, index) => {
    if (item.path.replaceAll('/', '') === path.replaceAll('/', '')) {
      id = index;
    }
  });

  return id;
};

export { hideRoutes, takeCurrentPathnameId };
