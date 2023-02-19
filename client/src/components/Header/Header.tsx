import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { hideRoutes, takeCurrentPathnameId } from '@/components/Header/Header.module';

import styles from './Header.module.scss';

export interface I_NavigationRouteList {
  path: string;
  id: string;
}

const routesList: Array<I_NavigationRouteList> = [
  {
    path: '/',
    id: 'home',
  },
  {
    path: '/auth/login',
    id: 'login',
  },
  {
    path: '/auth/registration',
    id: 'registration',
  },
];

const Header: React.FC = () => {
  const pathname = useLocation().pathname;

  const [routes, setRoutes] = useState<Array<I_NavigationRouteList>>([]);
  const [currentPathnameId, setCurrentPathnameId] = useState<number>(0);
  const [pickedRouteId, setPickedRouteId] = useState<number>(0);

  useEffect(() => {
    const newRoutes = hideRoutes(pathname, routesList);
    const defaultId = takeCurrentPathnameId(pathname, newRoutes);

    setRoutes(newRoutes);
    setCurrentPathnameId(defaultId);
    setPickedRouteId(defaultId);
  }, [pathname]);

  const mouseHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    switch (e.type) {
      case 'mouseleave': {
        setPickedRouteId(currentPathnameId);
        break;
      }
      case 'mouseenter': {
        setPickedRouteId(
          takeCurrentPathnameId(
            e.currentTarget.querySelector('a')?.getAttribute('href'),
            routes,
          ),
        );
        break;
      }
    }
  };

  const refLine = useRef<HTMLElement>(null);
  const refList = useRef<HTMLUListElement>(null);

  const changeLineState = () => {
    const empty: HTMLElement = document.createElement('p');
    const emptyList: NodeListOf<HTMLLIElement> = empty.querySelectorAll('li');

    const line = refLine.current !== null ? refLine.current : empty;
    const list = refList.current !== null ? refList.current : empty;
    const listElements =
      list.querySelectorAll('li').length > 0 ? list.querySelectorAll('li') : emptyList;

    if (line === empty || list === empty || listElements === emptyList) {
      return false;
    }

    const listElement = listElements[pickedRouteId];

    line.setAttribute(
      'style',
      `max-width: ${listElement.offsetWidth}px; left: ${listElement.offsetLeft}px;`,
    );
  };

  useEffect(() => {
    window.addEventListener('load', changeLineState);

    changeLineState();

    return () => window.removeEventListener('load', changeLineState);
  }, [pickedRouteId]);

  return (
    <header className={styles.header}>
      <nav className={styles.header_nav}>
        <span ref={refLine} className={styles.nav_line} />
        <ul ref={refList} className={styles.nav_list}>
          {routes.map((route) => {
            const active =
              route.path.replaceAll('/', '') === pathname.replaceAll('/', '');

            return (
              <li
                key={route.id}
                className={styles.nav_item}
                onMouseEnter={mouseHandler}
                onMouseLeave={mouseHandler}
              >
                <Link
                  to={route.path}
                  className={`${styles.nav_item_link} ${
                    active ? ` ${styles.isActive}` : ''
                  }`}
                >
                  {route.id.charAt(0).toUpperCase() +
                    route.id.split('').splice(1).join('')}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
