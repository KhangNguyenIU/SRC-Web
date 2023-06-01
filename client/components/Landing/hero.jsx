import React from 'react';

import styles from '@styles/Landing/Hero.module.scss';
import Link from 'next/link';
import { Box, Modal } from '@mui/material';
import buttonStyles from '@styles/Component/Button.module.scss';

export default function Hero() {
  const [open, setOpen] = React.useState(false);
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className={styles.wrapper}>
      <img src="rocket.svg" alt="hero" />
      <img src="blob1.svg" alt="blob-hero" className={styles.blob} />
        <h1>Major Suggesting Tool</h1>
        <h2>
          Discover yourself through your personality group and suitable career
          path
        </h2>

        <div className={buttonStyles.container}>
          <div
          
            className={buttonStyles.button}
            onClick={() => setOpen(true)}
          >
            <div className={buttonStyles.buttonLine}></div>
            <div className={buttonStyles.buttonLine}></div>
            <span className={buttonStyles.buttonText}>Explore Now</span>
            <div className={buttonStyles.buttonDrow1}></div>
            <div className={buttonStyles.buttonDrow2}></div>
          </div>
        </div>

        {/* <button className={styles.button}>
          <Link href="marjor-suggest/characteristics">Start Exploring</Link>
        </button> */}
        
      </div>
      <Modal open={open} onClose={closeModal} style={{ padding: '0px' }}>
        <Box sx={modalBox}>
          <div className={styles.modalBox}>
            <button className={styles.button}>
              <Link href="marjor-suggest/characteristics">Holland Quiz</Link>
            </button>

            <button className={styles.button}>
              <Link href="marjor-suggest/grades">Grades</Link>
            </button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const modalBox = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: [400, 600, 800],
  height: [400, 500],
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 99,
};
