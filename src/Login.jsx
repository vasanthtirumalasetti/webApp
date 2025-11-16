import React, { useState } from 'react';
import './App.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2 id="LoginHeader">User Login</h2>
        <input id="LoginInput"
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" id="loginBTN">Login</button>
      </form>
    </div>
  );
}

export default Login;
