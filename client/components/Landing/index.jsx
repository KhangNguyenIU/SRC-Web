import { Container } from '@mui/system';
import React from 'react';
import Feedback from './Feedback';
import Hero from './hero';

export default function Landing({feedbacks}) {
  return (
    <React.Fragment>
      <Container>
        <Feedback feedbackList={feedbacks} />
      </Container>
      {/* < Hero/> */}
    </React.Fragment>
  );
}
