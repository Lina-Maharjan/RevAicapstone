import React from 'react'
import AboutUs from '../components/AboutUs'
import AboutUsMission from '../components/AboutUSMission'
import AboutUsTeam from '../components/AboutUsTeam'

const About = () => {
  return (
    <div>
      <div className="w-full">
        <AboutUs></AboutUs>
        <AboutUsMission></AboutUsMission>
        <AboutUsTeam></AboutUsTeam>
      </div>
    </div>
  )
}

export default About
