import { Container } from '@mui/system';
import React from 'react';
import Feedback from './Feedback';
import Hero from './Hero';
import Intro from './Intro';
import About from './About';
import Hotline from './Hotline';

export default function Landing({ feedbacks }) {
  return (
    <React.Fragment>
      <Intro />
      <About/>
      <Hero />
      <Hotline/>
      <Container>
        <Feedback feedbackList={feedbacks} />
      </Container>
    </React.Fragment>
  );
}
