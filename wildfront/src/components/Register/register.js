import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css'; // Importe le fichier CSS pour les styles du formulaire d'inscription

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Empêche le formulaire de se soumettre automatiquement

    const formData = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      phoneNumber: phoneNumber
    };

    try {
      const response = await axios.post('http://localhost:8000/wildlens/register/', formData);
      console.log(response.data); // Affiche la réponse de l'API (par exemple, le token)
      // Ajoutez ici votre logique pour gérer la réponse de l'API (par exemple, rediriger l'utilisateur)
      navigate('/?success=Compte%20cr%C3%A9%C3%A9%20avec%20succ%C3%A8s%2C%20veuillez%20vous%20connecter')
      //navigate('/');
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      // Ajoutez ici votre logique pour gérer les erreurs d'inscription
    }
  };

  return (
    <div className="register-page">
    <div className="register-background"></div>
      <h2>Inscription</h2>
      <div className="register-container">
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="firstName">Prénom:</label>
            <input 
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Nom:</label>
            <input 
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Email:</label>
            <input 
              type="usermail"
              id="username"
              value={username}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="form-group">
            <label htmlFor="phoneNumber">Numéro de téléphone:</label>
            <input 
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
