import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">Sober <span className="highlight">Mate.</span></h1>
      <form className="form">
        <input type="email" placeholder="Email" className="input" />
        <input type="password" placeholder="New Password" className="input" />
        <input type="password" placeholder="Confirm Password" className="input" />
        <button type="submit" className="button">Continue</button>
        <button className="button" onClick={() => navigate('/login')}>Back</button>
      </form>
    </div>
  );
};

export default ResetPasswordScreen;
