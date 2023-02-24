import React from 'react';

import { I_NavigationRouteList } from '@/components/Header/Header';

type T_hideRoutes = (
  pathname: string,
  routesList: Array<I_NavigationRouteList>,
) => Array<I_NavigationRouteList>;

const hideRoutes: T_hideRoutes = (pathname, routesList) => {
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

type T_takeCurrentPathnameId = (
  pathname: string | undefined | null,
  routes: Array<I_NavigationRouteList>,
) => number;

const takeCurrentPathnameId: T_takeCurrentPathnameId = (pathname, routes) => {
  const path = pathname !== undefined && pathname !== null ? pathname : '/';

  let id = -1;

  routes.forEach((item, index) => {
    if (item.path.replaceAll('/', '') === path.replaceAll('/', '')) {
      id = index;
    }
  });

  return id;
};

type T_counterInTo = (
  count_in: number,
  count_to: number,
  changeState: React.Dispatch<React.SetStateAction<number>>,
) => void;

const counterInTo: T_counterInTo = (count_in, count_to, changeState) => {
  let counter = count_in;

  const interval = setInterval(() => {
    counter += Math.ceil(count_to / 4);
    changeState(counter > count_to ? count_to : counter);

    if (counter === count_to) clearInterval(interval);
  }, 50);
};

export { hideRoutes, takeCurrentPathnameId };
