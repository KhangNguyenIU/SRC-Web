import React from 'react'
import styles from '@styles/Landing/Intro.module.scss';
import Link from 'next/link';

export default function Intro() {
  return (
    <div className={styles.wrapper}>
        <div className={styles.box}>
            
            <div className={styles.content}>
                <span>International University</span>
                <h1>Recruit & Consult</h1>
                <p>The first public interdisciplinary university in Vietnam to use English as the main language of instruction</p>

                <button>
                    <Link href="/contact">Consult Now</Link>
                </button>
            </div>

            <img className={styles.imgBK} src="landing/draw_paint.png" alt="background"/>
            <img className={styles.dot} src="landing/dot_03.png" alt="dot1"/>
        </div>
    </div>
  )
}
