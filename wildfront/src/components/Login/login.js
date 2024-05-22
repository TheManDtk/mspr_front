import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const searchParams = new URLSearchParams(useLocation().search);
  const successMessage = searchParams.get('success');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/wildlens/login/', {
        username: username,
        password: password
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/soumission'); // Redirection vers la page suivante
    } catch (error) {
      setError('Identifiants incorrects, ');
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  return (
    <div className="login-page">
      <div className="login-background"></div>
      <h2>Connectez-vous</h2>
    
      <div className="login-container">
        <form onSubmit={handleLogin}>
        <div className="message-container">
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
          <div className="form-group">
            <label htmlFor="username">Email:</label>
            <input 
              type="email"
              id="username"
              placeholder='Email'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe:</label>
            <input 
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit">Se connecter</button>
          <p className="register-link">
            Pas encore de compte, <a href="/register">inscrivez-vous</a>
          </p>
        </form>
        
      </div>
    </div>
  );
}

export default Login;
