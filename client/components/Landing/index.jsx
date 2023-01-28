import { Container } from '@mui/system';
import React from 'react';
import Feedback from './Feedback';
import Hero from './hero';
import IntroVideo from './IntroVideo';

export default function Landing({ feedbacks }) {
  return (
    <React.Fragment>
      {/* <Hero /> */}
      <Container>
        <IntroVideo/>
        <Feedback feedbackList={feedbacks} />
      </Container>
    </React.Fragment>
  );
}
