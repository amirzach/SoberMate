import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './reset-password.css';

const ResetPasswordScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();
      
      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (error) {
      setError('Error: ' + error.message);
    }
  };

  return (
    <div className="reset-password-container">
      <h1 className="title">Sober <span className="highlight">Mate.</span></h1>
      <p className="subtitle">Reset your password</p>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          className="input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" className="button">Continue</button>
        <button className="button back-button" onClick={() => navigate('/login')}>Back</button>
      </form>
    </div>
  );
};

export default ResetPasswordScreen;
