import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignupScreen = () => {
    const navigate = useNavigate();    

  return (
    <div className="container">
      <h1 className="title">Sober <span className="highlight">Mate.</span></h1>
      <button className="button" onClick={() => navigate('/login')}>Login</button>
      <button className="button" onClick={() => navigate('/register')}>Sign Up</button>
    </div>
  );
};

export default SignupScreen;
