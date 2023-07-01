import React from 'react';

import styles from '@styles/Landing/Hero.module.scss';
import Link from 'next/link';
import { Box, Modal, SvgIcon } from '@mui/material';
import buttonStyles from '@styles/Component/Button.module.scss';

export default function Hero() {
  const [open, setOpen] = React.useState(false);
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.box}>
            <span> Special Feature</span>
            <h1>Major Suggesting Tool</h1>
            <p>
              Discover yourself through your characteristics group and suitable
              career path
            </p>

            <div className={styles.options}>
              <div className={styles.select}>
                <div className={styles.head}>
                  <SvgIcon sx={{ fontSize: '3rem', marginRight: '1rem' }}>
                    <svg className="svg-icon" viewBox="0 0 20 20">
                      <path d="M15.573,11.624c0.568-0.478,0.947-1.219,0.947-2.019c0-1.37-1.108-2.569-2.371-2.569s-2.371,1.2-2.371,2.569c0,0.8,0.379,1.542,0.946,2.019c-0.253,0.089-0.496,0.2-0.728,0.332c-0.743-0.898-1.745-1.573-2.891-1.911c0.877-0.61,1.486-1.666,1.486-2.812c0-1.79-1.479-3.359-3.162-3.359S4.269,5.443,4.269,7.233c0,1.146,0.608,2.202,1.486,2.812c-2.454,0.725-4.252,2.998-4.252,5.685c0,0.218,0.178,0.396,0.395,0.396h16.203c0.218,0,0.396-0.178,0.396-0.396C18.497,13.831,17.273,12.216,15.573,11.624 M12.568,9.605c0-0.822,0.689-1.779,1.581-1.779s1.58,0.957,1.58,1.779s-0.688,1.779-1.58,1.779S12.568,10.427,12.568,9.605 M5.06,7.233c0-1.213,1.014-2.569,2.371-2.569c1.358,0,2.371,1.355,2.371,2.569S8.789,9.802,7.431,9.802C6.073,9.802,5.06,8.447,5.06,7.233 M2.309,15.335c0.202-2.649,2.423-4.742,5.122-4.742s4.921,2.093,5.122,4.742H2.309z M13.346,15.335c-0.067-0.997-0.382-1.928-0.882-2.732c0.502-0.271,1.075-0.429,1.686-0.429c1.828,0,3.338,1.385,3.535,3.161H13.346z"></path>
                    </svg>
                  </SvgIcon>
                  <span>Characteristics Test</span>
                </div>
                <p>
                  The Holland Theory is a personality theory developed by
                  psychologist John L. Holland. The theory proposes that there
                  are six personality types, and each personality type is
                  ideally suited for particular occupations or fields of work
                </p>
              </div>
              <hr />
              <br />
              <div className={styles.select}>
                <div className={styles.head}>
                  <SvgIcon sx={{ fontSize: '2rem' ,marginRight:'1rem'}}>
                    <svg className="svg-icon" viewBox="0 0 20 20">
                      <path d="M17.431,2.156h-3.715c-0.228,0-0.413,0.186-0.413,0.413v6.973h-2.89V6.687c0-0.229-0.186-0.413-0.413-0.413H6.285c-0.228,0-0.413,0.184-0.413,0.413v6.388H2.569c-0.227,0-0.413,0.187-0.413,0.413v3.942c0,0.228,0.186,0.413,0.413,0.413h14.862c0.228,0,0.413-0.186,0.413-0.413V2.569C17.844,2.342,17.658,2.156,17.431,2.156 M5.872,17.019h-2.89v-3.117h2.89V17.019zM9.587,17.019h-2.89V7.1h2.89V17.019z M13.303,17.019h-2.89v-6.651h2.89V17.019z M17.019,17.019h-2.891V2.982h2.891V17.019z"></path>
                    </svg>
                  </SvgIcon>
                  <span>High school grades</span>
                </div>

                <p>
                  The input data is the scores of the subjects that the student
                  took in the mock test. And the output data will be a list of
                  composite scores that industries that match those score
                  combinations.
                </p>
              </div>
            </div>

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
          </div>
        </div>

        <div className={styles.right}>
          <img src="landing/major.png" alt="major" />
        </div>
      </div>
      <Modal open={open} onClose={closeModal} style={{ padding: '0px' }}>
        <Box sx={modalBox}>
          <div className={styles.modalBox}>
            <h2>Select one major suggest method</h2>
            <div className={styles.selectBox}>
              <div className={styles.card}>
                <div className={styles.title}>
                  <h3>Holland Test</h3>
                </div>
                <div className={styles.image}>
                  <img src="quiz1.png" alt="holland" />
                </div>

                <button className={styles.button}>
                  <Link href="marjor-suggest/characteristics">Try now</Link>
                </button>
              </div>

              <div className={styles.card}>
                <div className={styles.title}>
                  <h3>High school test grades</h3>
                </div>
                <div className={styles.image}>
                  <img src="quiz2.png" alt="holland" />
                </div>

                <button className={styles.button}>
                  <Link href="marjor-suggest/grades">Try now</Link>
                </button>
              </div>
            </div>
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
  height: [500, 600],
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 99,
};
