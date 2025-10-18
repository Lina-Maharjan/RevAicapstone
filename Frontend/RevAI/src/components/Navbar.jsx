import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { clearToken } from "../utils/api";
import "./Navbar.css";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    clearToken();
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className="nav">
      <NavLink to="/" className="site-title">
        <img src="/logo.png" alt="Logo" className="logo" />
        RevAI
      </NavLink>
      <ul>
        <li>
          <NavLink to="/" end className="nav_link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/analyzer" className="nav_link">Analyzer</NavLink>
        </li>
        {isAuthenticated && (
          <li>
            <NavLink to="/dashboard" className="nav_link">Dashboard</NavLink>
          </li>
        )}
        <li>
          <NavLink to="/about" className="nav_link">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="nav_link">Contact</NavLink>
        </li>
        {!isAuthenticated ? (
          <>
            <li>
              <NavLink to="/signup" className="nav_link">SignUp</NavLink>
            </li>
            <li>
              <NavLink to="/login" className="nav_link">Login</NavLink>
            </li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout} className="nav_link">Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

// import React from 'react'
// import { Link } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   return (
//     <nav className="nav">
//       <a href="/" className="site-title">
//         {/* <img src="/path/to/logo.png" alt="Logo" /> */}
//         Site Name
//       </a>
//       <ul>
//         <li>
//           <a href="/Home">Home</a>
//         </li>
//         <li>
//           <a href="/Analyzer">Analyzer</a>
//         </li>
//         <li>
//           <a href="/Dashboard">Dashboard</a>
//         </li>
//         <li>
//           <a href="/Insight">Insight</a>
//         </li>
//         <li>
//           {" "}
//           <a href="/AnalyzeAReview">Analyze a Review</a>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar
