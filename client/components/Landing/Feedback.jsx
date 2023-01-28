import React, { useMemo } from 'react';
import styles from '@styles/Feedback.module.scss';
import Image from 'next/image';
import { santinizedFB } from 'utils';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { Avatar, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import FeedbackService from '@services/feedback';
import { setLoading, stopLoading } from 'slices/util/loading.slice';
import { showNotification } from 'slices/util/notification.slice';

const feedBackRange = Array.from({ length: 5 }, (_, i) => i + 1);

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#295270',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

export default function Feedback({ feedbackList }) {
  const user = useSelector((state) => state.user);
  const [inputFB, setInputFB] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [userFeedback, setUserFeedback] = useState(null);
  const dispatch = useDispatch();
  const santinedFBdata = useMemo(
    () => santinizedFB(feedbacks, feedBackRange),
    [feedbacks]
  );

  useEffect(() => {
    setFeedbacks(feedbackList);
  }, [feedbackList]);

  useEffect(() => {
    getMyFeedback();
  }, [user]);

  const getMyFeedback = async () => {
    if (user.id !== '') {
      const res = await FeedbackService.getFeedbackByUser();
      if (res.status === 200) {
        setUserFeedback(res.data.feedback);
      }
    }
  };

  const sendFeedback = async (data) => {
    dispatch(setLoading());
    const res = await FeedbackService.createFeedback({ rating: data });
    if (res.status === 200) {
      const newFeedbacks = await FeedbackService.getFeedbacks();
      if (newFeedbacks.status === 200) {
        setFeedbacks(newFeedbacks.data.feedbacks);
      }
      const newFB = await FeedbackService.getFeedbackByUser();
      if (newFB.status === 200) {
        setUserFeedback(newFB.data.feedback);
        dispatch(stopLoading());
        dispatch(
          showNotification({
            message: 'Send feedback success',
            type: 'success',
          })
        );
      }
    }
  };

  return (
    <React.Fragment>
      <div className={styles.heading}>Service Feedback</div>
      <div className={styles.wrapper}>
        <div className={styles.feedbackHero}>
          <Image src="/feedbackHero.svg" alt="fb" width="400" height="400" />
        </div>

        <div className={styles.feedbackStat}>
          {!isNaN(santinedFBdata.avg) && (
            <React.Fragment>
              <div className={styles.number}>{santinedFBdata.avg}</div>
              <div className={styles.star}>
                <StyledRating
                  name="half-rating-read"
                  value={santinedFBdata.avg}
                  precision={0.5}
                  readOnly
                />
              </div>

              <div className={styles.total}>
                {santinedFBdata.total} customers ratings
              </div>
            </React.Fragment>
          )}

          <div className={styles.feedback}>
            {!isNaN(santinedFBdata.avg) &&
              santinedFBdata?.percentObj?.map((item, index) => (
                <div className={styles.percent} key={index}>
                  <div className={styles.brand}>
                    <div>{index + 1}</div>{' '}
                    <StarIcon style={{ color: '#FEC868' }} />
                  </div>
                  <div className={styles.percenLine}>
                    <BorderLinearProgress
                      variant="determinate"
                      value={item}
                      key={index}
                    />
                  </div>
                  <div>
                    <span className={styles.ratio}>{item}%</span>
                  </div>
                </div>
              ))}
          </div>
          <div className={styles.feedbackSection}>
            {!user?.id ? (
              <div>Please login to create a feedback</div>
            ) : !!userFeedback ? (
              <div className={styles.yourFeedback}>
                <Avatar src={user.avatar} alt={user.username} />
                <Rating readOnly value={userFeedback?.rating} />
              </div>
            ) : (
              <div className={styles.ratingNow}>
                <span>Rating our service</span>
                <Rating
                  name="simple-rating"
                  value={inputFB}
                  onChange={(e, newValue) => {
                    setInputFB(newValue);
                    sendFeedback(newValue);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
