import React, { useEffect, useState } from 'react';

import styles from '@styles/Major/Grades.module.scss';

import { Subject } from '@constants';
import { Button, TextField } from '@mui/material';
import { StudentPoints } from '@constants';
import { majorsSuggest } from '@services/majorSuggest';
import GradesResults from './GradesResults';

const initialPts = {
    Math: 0,
    English: 0,
    Physics: 0,
    Biology: 0,
    Chemistry: 0,
    Literature: 0,
    History: 0,
    Geography: 0
}
export default function Grades() {
  const [grades, setGrades] = useState({ ...initialPts });
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const result = await majorsSuggest({ ...StudentPoints });
//       console.log({ result })
//       setResult(result);
//     })();
//   }, []);

  const closeModal = () => {
    setOpen(false);
    setGrades({ ...initialPts });
  };

  const onSubmit = async () => {
    const result = await majorsSuggest(grades);
    setResult(result);
    setOpen(true);
  };

  return (
    <React.Fragment>
      <GradesResults open={open} closeModal={closeModal} result={result} />
      <div className={styles.wrapper}>
        <h2>Enter your grades</h2>
        <div className={styles.gradeBox}>
          {Subject &&
            Object.entries(Subject).map(([key, value]) => (
              <div key={value} className={styles.inputBox}>
                <div className={styles.subject}>
                  <span>{value}</span>
                </div>
                <TextField
                  type="number"
                //   defaultValue={0}
                placeholder='0'
                  value={grades[value]}
                  onChange={(e) =>
                    setGrades((prev) => ({
                      ...prev,
                      [value]:
                        Number(e.target.value) > 10
                          ? 10
                          : (e.target.value<0)?0:Number(e.target.value),
                    }))
                  }
                />
              </div>
            ))}
        </div>

        <Button onClick={onSubmit} variant="contained">
          Submit
        </Button>
      </div>
    </React.Fragment>
  );
}
