import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });

      const result = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setError(result.error || 'Failed to register');
      }
    } catch (err) {
      setError('Server error, please try again later');
    }
  };

  return (
    <div className="register-container">
      <h1 className="title">Sober <span className="highlight">Mate.</span></h1>
      <p className="subtitle">Create an account to get started</p>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <button type="button" className="button back-button" onClick={() => navigate('/')}>Back</button>
      </form>
    </div>
  );
};

export default Register;
