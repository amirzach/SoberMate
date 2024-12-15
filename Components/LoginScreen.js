import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setWelcomeMessage(`Welcome, ${result.username}!`);
        // Navigate to Welcome screen after successful login
        navigate('/welcome');
      } else {
        setError(result.error || 'Failed to log in');
      }
    } catch (err) {
      setError('Server error, please try again later');
    }
  };

  return (
    <div className="login-container">
      <h1 className="title">Sober <span className="highlight">Mate.</span></h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
        <div className="link-container">
          <a href="#" className="forgot-link" onClick={() => navigate('/reset-password')}>Forgot password?</a>
        </div>
        <button type="submit" className="submit-btn">Continue</button>
        <button type="button" className="back-btn" onClick={() => navigate('/')}>Back</button>
      </form>

      {/* Show the welcome message if login is successful */}
      {welcomeMessage && <p className="welcome-message">{welcomeMessage}</p>}
    </div>
  );
};

export default LoginScreen;
