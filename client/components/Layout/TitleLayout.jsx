import React from 'react';
import styles from '@styles/Layout/TitleLayout.module.scss';
export default function TitleLayout({ children ,h1,h2}) {
  return (
    <React.Fragment>
      <div className={styles.hero}>
        <img src="/landing/bk4.jpg" alt="bg" className={styles.bgImg} />
        <div className={styles.content}>
          <h2>{h2}</h2>
          <h1>{h1}</h1>
        </div>

        <img src='/landing/dot_02.png' alt="dot" className={styles.dot}/>
      </div>
      {children}
    </React.Fragment>
  );
}
