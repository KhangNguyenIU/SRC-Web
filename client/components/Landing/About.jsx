import React from 'react';
import styles from '@styles/Landing/About.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
export default function About() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <img src="landing/iu_02.jpg" alt="iu1" />
      </div>

      <div className={styles.right}>
        <span>ABOUT US</span>
        <h1>
          INTERNATION
          <br /> UNIVERSITY
        </h1>
        <p>
          One of seven member universities of Vietnam National University HCMC.
          As an interdisciplinary university, it is the first public university
          in Vietnam that uses English as the primary language in teaching and
          researching.
        </p>

        <button>View More</button>
      </div>
    </div>
  );
}
