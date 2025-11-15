import "@fontsource/inter"; // Defaults to 400 weight
import React, { useEffect } from "react";
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
import { Outlet, useLocation, useNavigationType } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer";
// Scroll to top on route change (but preserve scroll on Back/Forward)
function ScrollToTopOnRouteChange() {
  const location = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    
    if (navType !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, navType]);

  return null;
}

function App() {
  return (
    <div>
      <ScrollToTopOnRouteChange />
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  
  );
}

export default App;
