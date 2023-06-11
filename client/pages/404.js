import React from 'react';
import styles from '@styles/404.module.scss';
export default function Custom404() {
  return (
    <React.Fragment>
      <div className={styles.number}>404</div>
      <div className={styles.text}>
        <span>Ooops...</span>page not found
      </div>
    </React.Fragment>
  );
}
