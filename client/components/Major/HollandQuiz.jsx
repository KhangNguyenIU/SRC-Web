import React, { useEffect } from 'react';
import styles from '@styles/Major/Major.module.scss';
import { styled } from '@mui/material/styles';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Rating from '@mui/material/Rating';

import { majorData } from 'data';
import CharacteristicsResult from './CharacteristicsResult';
// import { MAX_QUESTIONS_LENGTH, MAX_QUESTIONS_SET } from 'constants';

const MAX_QUESTIONS_LENGTH = 9;
const MAX_QUESTIONS_SET = 6;

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#827397',
  },
  '& .MuiRating-iconHover': {
    color: '#827397',
  },
});

const initialStates = Array.from(Array(MAX_QUESTIONS_LENGTH)).fill(0);

export default function HollandQuiz() {
  const [listValue, setListValue] = React.useState(initialStates);
  const [ListPoints, setListPoints] = React.useState([]);
  const [curPage, setCurPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const closeModal = () => setOpen(false);

  const handleChangeRating = (index, value) => {
    const newListValue = [...listValue];
    newListValue[index] = value;
    setListValue(newListValue);
  };

  const sumPoints = (array) => {
    return array.reduce((a, b) => a + b, 0);
  };

  const handleNext = () => {
    const sum = sumPoints(listValue);
    setListValue(initialStates);
    let prevState = [...ListPoints, sum];
    setListPoints(prevState);
    setCurPage((state) => state + 1);
  };

  const onSubmit = () => {
    const sum = sumPoints(listValue);
    setListValue(initialStates);
    setCurPage(0);
    let prevState = [...ListPoints, sum];
    setListPoints(prevState);

    // console.log({ prevState });
    let max = Math.max(...prevState);
    let index = prevState.indexOf(max);
    // console.log({ max, index });
    // console.log({ result: majorData[index] });
    setResult(majorData[index]);
    setOpen(true);
  };

  const checkFillAllAns = (array) => {
    return array.every((item) => item !== 0);
  };

  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        <h2>Holland quiz</h2>
        <div className={styles.questions}>
          {Array.from(Array(MAX_QUESTIONS_LENGTH))
            .fill(0)
            .map((_, index) => (
              <div className={styles.card} key={index}>
                <div className={styles.number}>
                  {curPage * MAX_QUESTIONS_LENGTH + index + 1}
                </div>

                <div className={styles.content}>
                  <div className={styles.question}>
                    {majorData[curPage].question.vn[index]}
                  </div>
                  <div className={styles.rating}>
                    <StyledRating
                      name="customized-color"
                      value={listValue[index]}
                      icon={<CircleIcon fontSize="inherit" />}
                      emptyIcon={<CircleOutlinedIcon fontSize="inherit" />}
                      onChange={(event, newValue) =>
                        handleChangeRating(index, newValue)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className={styles.directTool}>
          {curPage < MAX_QUESTIONS_SET - 1 ? (
            <button
              className={
                styles.button +
                (checkFillAllAns(listValue) ? ' ' + styles.active : ' disabled')
              }
              onClick={handleNext}
              disabled={!checkFillAllAns(listValue)}
            >
              <KeyboardDoubleArrowRightIcon />
            </button>
          ) : (
            <button
              className={
                styles.button +
                (checkFillAllAns(listValue) ? ' ' + styles.active : ' disabled')
              }
              onClick={onSubmit}
              disabled={!checkFillAllAns(listValue)}
            >
              Submit
            </button>
          )}
        </div>
      </div>

      {!!result && (
        <CharacteristicsResult
          open={open}
          closeModal={closeModal}
          charac={result}
        />
      )}
    </React.Fragment>
  );
}
