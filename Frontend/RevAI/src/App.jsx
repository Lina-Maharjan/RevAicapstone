import "@fontsource/inter"; // Defaults to 400 weight
import React from "react";
import Navbar from "./components/Navbar";
import KeyFeatures from "./components/KeyFeatures";
import HowItWorks from "./components/HowItWorks";
import ReminderAnalyze from "./components/ReminderAnalyze";
import AboutUs from "./components/AboutUs";
import AboutUsMission from "./components/AboutUSMission";
import AboutUsTeam from "./components/AboutUsTeam";
import ReviewAnalyzer from "./components/ReviewAnalyzer";
import Login from "./components/Login";
import ContactUsIntro from "./components/ContactUsIntro";
import FrequentQuestions from "./components/FrequentQuestions";
import ReviewCheckerLanding from "./components/ReviewCheckerLanding";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
      {/* <Navbar></Navbar> */}
      {/* <ReviewCheckerLanding></ReviewCheckerLanding>
      <KeyFeatures></KeyFeatures>
      <HowItWorks></HowItWorks>
      <ReminderAnalyze></ReminderAnalyze>
      <AboutUs></AboutUs>
      <AboutUsMission></AboutUsMission>
      <AboutUsTeam></AboutUsTeam>
      <ReviewAnalyzer></ReviewAnalyzer>
      <Login></Login>
      <ContactUsIntro></ContactUsIntro>
      <FrequentQuestions></FrequentQuestions> */}
    </div>
  );
}

export default App;
