import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import ResetPasswordScreen from './components/ResetPasswordScreen';
import Register from './components/Register';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<SignupScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/reset-password" element={<ResetPasswordScreen />} />
        <Route path="/register" element={<Register />} />        
      </Routes>
  );
};

export default App;
