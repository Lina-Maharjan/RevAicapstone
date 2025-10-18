import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Analyzer from "./Pages/Analyzer.jsx";
import About from "./Pages/About.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Contact from "./Pages/Contact.jsx";
import SignUp from "./pages/SignUp.jsx";
import LoginPage from "./Pages/LoginPage.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        {/* <Route path="/Home" element={<Home />} /> */}
         <Route path="/" element={<App />}>
         <Route index element={<Home />} />   
        <Route path="/analyzer" element={<Analyzer />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

{/* // import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// ) */}
