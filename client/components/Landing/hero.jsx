import React from 'react';

import styles from '@styles/Landing/Hero.module.scss';
import Link from 'next/link';

export default function Hero() {
  return (
    <React.Fragment>
      <div className={styles.wrapper}>

        <h1>Major Suggesting Tool</h1>
        <h2>
        Discover yourself through your personality group and suitable career path
        </h2>

        <button className={styles.button}>
            <Link href="marjor-suggest">
            Start Exploring
            </Link>
        </button>
        <img
          src="rocket.svg"
          alt="hero"
          
        />
      </div>
    </React.Fragment>
  );
}
