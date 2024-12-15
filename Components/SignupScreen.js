import React from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

const SignupScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <h1 className="title">Sober <span className="highlight">Mate</span></h1>
      <p className="subtitle">Welcome! Please choose an option</p>
      <div className="button-container">
        <button className="button" onClick={() => navigate('/login')}>
          Login
        </button>
        <button className="button signup-button" onClick={() => navigate('/register')}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignupScreen;
