import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { hideRoutes, takeCurrentPathnameId } from '@/components/Header/Header.module';
import useAuthStore from '@/modules/AuthModule/store/useAuthStore';

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
    path: '/profile',
    id: 'profile',
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

  const [lineWidthValue, setLineWidthValue] = useState<number>(0);
  const [lineLeftValue, setLineLeftValue] = useState<number>(0);
  const [lineTopValue, setLineTopValue] = useState<number>(0);

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

  const refList = useRef<HTMLUListElement>(null);

  const changeLineState = () => {
    const listElements = refList.current?.querySelectorAll('li');
    if (listElements === undefined) {
      return false;
    }
    const listElement = listElements[pickedRouteId];

    const width = listElement?.offsetWidth;
    const left = listElement?.offsetLeft;
    const top = listElement?.offsetHeight;

    if (width !== undefined || left !== undefined) {
      setLineWidthValue(width);
      setLineLeftValue(left);
      setLineTopValue(top);
    } else {
      setTimeout(() => {
        changeLineState();
      }, 50);
    }
  };

  useEffect(() => {
    document.fonts.ready.then(() => {
      changeLineState();
    });
  }, [pickedRouteId]);

  const logout = useAuthStore((state) => state.logout);
  const isLoginIn = useAuthStore((state) => state.isLoginIn);

  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.header_wrapper} container`}>
        <nav className={styles.header_nav}>
          <span
            className={styles.nav_line}
            style={{ maxWidth: lineWidthValue, left: lineLeftValue, top: lineTopValue }}
          />
          <ul ref={refList} className={styles.nav_list}>
            {routes.map((route, index) => {
              const active =
                route.path.replaceAll('/', '') === pathname.replaceAll('/', '');

              return (
                <li
                  key={route.id + index}
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
        {isLoginIn ? (
          <button className={styles.nav_logoutButton} onClick={() => logout()}>
            logout
          </button>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
