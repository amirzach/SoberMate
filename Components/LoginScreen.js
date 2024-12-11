import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">Sober <span className="highlight">Mate.</span></h1>
      <form className="form">
        <input type="text" placeholder="Username" className="input" />
        <input type="password" placeholder="Password" className="input" />
        <a href="#" className="link" onClick={() => navigate('/reset-password')}>Forgot password?</a>
        <button type="submit" className="button">Continue</button>
        <button className="button" onClick={() => navigate('/')}>Back</button>
      </form>
    </div>
  );
};

export default LoginScreen;
