import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/BackToHome.css';

const BackToHome = () => {
  return (
    <Link to="/" className="back-to-home">
      <i className="fas fa-arrow-left"></i> Back to Home
    </Link>
  );
};

export default BackToHome; 