import React from 'react';

import { Chip, Divider, Modal } from '@mui/material';
import { Box } from '@mui/system';
import styles from '@styles/Major/Major.module.scss';

export default function Result({ open, closeModal, charac }) {

  const handleClick =(link)=>{
    window.open(link, '_blank');
  }
  return (
    <React.Fragment>
      <Modal open={open} onClose={closeModal} style={{ padding: '0px' }}>
        <Box sx={modalBox}>
          <div className={styles.resultBox}>
            <h1 className={styles.heading}>{charac.charac}</h1>
            <img src={charac.img} alt="characteristics" />
            <p className={styles.desc}>{charac.des}</p>

            <div className={styles.suitableCareer}>
              <p>Careers for {charac.charac} person :</p>
              <div className={styles.careerList}>
                {charac.career.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </div>
            </div>

            <div className={styles.suggestMajor}>
              <p>
                International University has some major that could be suitable
                for you:
              </p>

              <div className={styles.suggestMajorList}>
                {charac.sugest.map((item, index) => (
                  <Chip key={index} label={item.name} variant="outlined" 
                  color='primary'
                  size="small"
                  onClick={()=>handleClick(item.link)}
                  />
                ))}
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
  width: ['100%', 600, 800, 1000],
  height: [800, 600],
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
};
