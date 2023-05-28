import React from 'react';

import styles from './PreloaderLine.module.scss';

const PreloaderLine: React.FC<{ lineStamp: number }> = ({ lineStamp }) => {
  return (
    <div className={styles.line}>
      <div className={styles.line_th} style={{ width: `${lineStamp}%` }}></div>
    </div>
  );
};

export default PreloaderLine;
