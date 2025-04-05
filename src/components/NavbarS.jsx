import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/NavbarS.css';

const NavbarS = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    setIsLoggedIn(!!userId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    setIsLoggedIn(false);
    navigate('/loginP');
  };

  const isHomePage = location.pathname === '/';

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-logo">
          <i className="fas fa-book-reader"></i> Book Recommender
        </Link>
      </div>
      
      <div className="navbar-links">
        {!isHomePage && (
          <Link to="/" className="nav-link">
            <i className="fas fa-home"></i> Home
          </Link>
        )}
        {isLoggedIn ? (
          <>
            <Link to="/Userdash" className="nav-link">
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </Link>
            <button onClick={handleLogout} className="nav-button logout">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/loginP" className="nav-button login">
              <i className="fas fa-sign-in-alt"></i> Login
            </Link>
            <Link to="/signupP" className="nav-button signup">
              <i className="fas fa-user-plus"></i> Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavbarS;