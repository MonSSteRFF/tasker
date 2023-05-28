import React from 'react';

import styles from './Preloader.module.scss';

const Preloader: React.FC<{ type?: string }> = ({ type }) => {
  return (
    <div className={`${styles.preloader} ${type === 'big' ? styles.big : ''}`}>
      <span className={styles.preloader_span}>
        <span className={styles.preloader_logo} />
      </span>
    </div>
  );
};

export default Preloader;
