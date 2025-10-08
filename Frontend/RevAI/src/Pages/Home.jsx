import React from 'react'
import ReviewCheckerLanding from '../components/ReviewCheckerLanding';
import KeyFeatures from '../components/KeyFeatures';
import HowItWorks from '../components/HowItWorks';
import ReminderAnalyze from '../components/ReminderAnalyze';

const Home = () => {
  return (
    <div>
      <div className="w-full">
        <ReviewCheckerLanding />
        <KeyFeatures />
        <HowItWorks />
        <ReminderAnalyze />
</div>
    </div>
  )
}

export default Home
