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
    const line = refLine.current;
    const list = refList.current;

    if (line === null || list === null) {
      return false;
    }

    const listElements = list.querySelectorAll('li');

    if (listElements.length === 0) {
      return false;
    }

    const listElement = listElements[pickedRouteId];

    setTimeout(() => {
      line.setAttribute(
        'style',
        `max-width: ${listElement.offsetWidth}px; left: ${listElement.offsetLeft}px;`,
      );
    }, 50);

    console.log();
  };

  useEffect(() => {
    changeLineState();
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
