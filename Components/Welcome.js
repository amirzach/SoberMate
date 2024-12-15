import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './welcome.css';

const Welcome = () => {
  const [feeling, setFeeling] = useState('');
  const navigate = useNavigate();

  const handleEmojiClick = (emoji) => {
    setFeeling(emoji);
    // After user selects an emoji, navigate to Blog.js
    setTimeout(() => {
      navigate('/blog');
    }, 1000);  // Delay to show the user's choice before navigating
  };

  return (
    <div className="welcome-container">
      <h1 className="title">Welcome!</h1>
      <p className="subtitle">How are you feeling today?</p>

      {/* Emoji selection */}
      <div className="emoji-container">
        <span
          role="button"
          onClick={() => handleEmojiClick('😊')}
          className="emoji"
        >
          😊
        </span>
        <span
          role="button"
          onClick={() => handleEmojiClick('😐')}
          className="emoji"
        >
          😐
        </span>
        <span
          role="button"
          onClick={() => handleEmojiClick('😞')}
          className="emoji"
        >
          😞
        </span>
      </div>

      {feeling && <p className="feeling-message">You are feeling {feeling} today!</p>}
    </div>
  );
};

export default Welcome;
