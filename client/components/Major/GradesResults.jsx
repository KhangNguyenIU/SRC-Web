import React from 'react';

import { Chip, CircularProgress, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import styles from '@styles/Major/Grades.module.scss';

const pastelColors = [
  '#D7C0AE',
  '#F2BED1',
  '#99A98F',
  '#E06469',
  '#B8E7E1',
  '#B0A4A4',
  '#9384D1',
  '#A4BC92',
  '#57C5B6',
  '#F8CBA6',
];
export default function GradesResults({ open, closeModal, result }) {
;
  const handleClick = (link) => {
    window.open(link, '_blank');
  };
  return (
    <React.Fragment>
      <Modal open={open} onClose={closeModal} style={{ padding: '0px' }}>
        <Box sx={modalBox}>
          <div className={styles.resultBox}>
            <h1 className={styles.heading}>Your Result</h1>
            <div className={styles.ptsResult}>
              {!!result?.stuCombPts &&
                Object.entries(result.stuCombPts).map(([comb, pts], index) => (
                  <div
                    key={comb}
                    className={styles.combPts}
                    style={{ color: `${pastelColors[index]}` }}
                  >
                    <div className={styles.pts}>{pts}</div>
                    <div className={styles.comb}>{comb} </div>
                  </div>
                ))}
            </div>

            <div className={styles.suggestMajor}>
              {
                !!result?.majors?.size ? (<p>
                    International University has some major that could be suitable
                    for you:
                  </p>) : (<p>Currently, International University doesnt have majors that are suitable for you</p>)
              }
              <div className={styles.suggestMajorList}>
                {!!result?.majors?.size &&
                  [...result.majors].map((item, index) => (
                    <Chip
                      key={index}
                      label={item}
                      variant="outlined"
                      color="primary"
                      size="small"
                      className={styles.major}
                      onClick={() => handleClick(item.link)}
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
