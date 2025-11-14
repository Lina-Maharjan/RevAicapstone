import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isAuthenticated, clearToken } from "../utils/api";
import { toast } from 'react-toastify';
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on component mount and when storage changes
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(isAuthenticated());
    };
    
    checkAuth();
    
    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkAuth);
    
    // Custom event for login/logout in same tab
    window.addEventListener('authChange', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    clearToken();
    setIsLoggedIn(false);
    setOpen(false);
    
    // Dispatch custom event to update other components
    window.dispatchEvent(new Event('authChange'));
    
    // Show toast notification instead of alert
    toast.success('User Logout successfully', {
      position: "top-right",
      autoClose: 2000,
    });
    
    // Redirect to home page
    navigate('/');
  };

  return (
    <>
      {/* TOP NAVBAR */}
      <nav className="nav">
        <div className="nav-left">
          <img src="/logo.png" alt="Logo" className="logo" />
          <NavLink to="/" className="site-title">RevAI</NavLink>
        </div>

        {/* HAMBURGER (MOBILE ONLY) */}
        <div className="hamburger" onClick={() => setOpen(true)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* DESKTOP MENU */}
        <ul className="desktop-menu">
          <li><NavLink to="/" end className="nav_link">Home</NavLink></li>
          <li><NavLink to="/analyzer" className="nav_link">Analyzer</NavLink></li>
          <li><NavLink to="/dashboard" className="nav_link">Dashboard</NavLink></li>
          <li><NavLink to="/about" className="nav_link">About</NavLink></li>
          <li><NavLink to="/contact" className="nav_link">Contact</NavLink></li>
          
          {/* Show SignUp/Login OR Logout based on auth status */}
          {!isLoggedIn ? (
            <>
              <li><NavLink to="/signup" className="nav_link">SignUp</NavLink></li>
              <li><NavLink to="/login" className="nav_link">Login</NavLink></li>
            </>
          ) : (
            <li>
              <button onClick={handleLogout} className="nav_link logout-btn">
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* OVERLAY (when sidebar is open) */}
      <div
        className={`overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      ></div>

      {/* MOBILE SIDEBAR */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>×</button>

        <ul>
          <li><NavLink to="/" className="nav_link" onClick={() => setOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/analyzer" className="nav_link" onClick={() => setOpen(false)}>Analyzer</NavLink></li>
          <li><NavLink to="/dashboard" className="nav_link" onClick={() => setOpen(false)}>Dashboard</NavLink></li>
          <li><NavLink to="/about" className="nav_link" onClick={() => setOpen(false)}>About</NavLink></li>
          <li><NavLink to="/contact" className="nav_link" onClick={() => setOpen(false)}>Contact</NavLink></li>
          
          {/* Show SignUp/Login OR Logout based on auth status */}
          {!isLoggedIn ? (
            <>
              <li><NavLink to="/signup" className="nav_link" onClick={() => setOpen(false)}>SignUp</NavLink></li>
              <li><NavLink to="/login" className="nav_link" onClick={() => setOpen(false)}>Login</NavLink></li>
            </>
          ) : (
            <li>
              <button onClick={handleLogout} className="nav_link logout-btn">
                Logout
              </button>
            </li>
          )}
        </ul>
      </aside>
    </>
  );
};

export default Navbar;



