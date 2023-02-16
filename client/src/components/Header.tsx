import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { routes } from '../App';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const [routesList, setRoutesList] = useState(routes);

  useEffect(() => {
    if (
      pathname.replaceAll('/', '') === 'login' ||
      pathname.replaceAll('/', '') === 'registration'
    ) {
      setRoutesList(
        routes.filter((route) => route.id === 'login' || route.id === 'registration'),
      );
    } else {
      setRoutesList(
        routes.filter((route) => route.id !== 'login' && route.id !== 'registration'),
      );
    }
  }, []);

  return (
    <header className={styles.header}>
      <nav className={styles.header_nav}>
        <ul className={styles.nav_list}>
          {routesList.map((route) => {
            const active =
              route.path.replaceAll('/', '') === pathname.replaceAll('/', '');

            return (
              <li key={route.id} className={styles.nav_item}>
                <Link
                  to={route.path}
                  className={`${styles.nav_item_link}${
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
