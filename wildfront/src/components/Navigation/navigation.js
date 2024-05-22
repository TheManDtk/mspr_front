import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import './navigation.css';

function Navigation() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navigation">
      <div className="logo-container">
        <img src="images/logo_blanc.png" alt="Logo de l'application" className="logo" />
      </div>
      <div className="burger-menu">
        <FaBars className="burger-icon" onClick={toggleMenu} />
        {isMenuOpen && <DropdownMenu location={location} toggleMenu={toggleMenu} onLogout={handleLogout} />}
      </div>
    </nav>
  );
}

function DropdownMenu({ location, toggleMenu, onLogout }) {
  const isLoginPage = location.pathname === '/';
  const isRegisterPage = location.pathname === '/register';
  const isSoumissionPage = location.pathname === '/soumission';
  const isMesDemandesPage = location.pathname === '/mesdemandes';

  return (
    <div className="dropdown-menu">
      <ul>
        {(isRegisterPage && (
          <li><a href="/" onClick={toggleMenu}>Se connecter</a></li>
        ))}
         {(isLoginPage && (
          <li><a href="/register" onClick={toggleMenu}>S'inscrire</a></li>
        ))}
        {(isSoumissionPage && (
          <>
          <li><a href="/mesdemandes" onClick={toggleMenu}>Mes Requêtes</a></li>
          <li><a href="/" onClick={onLogout}>Déconnexion</a></li>
          </>
        ))}
        {(isMesDemandesPage && (
          <>
          <li><a href="/soumission" onClick={toggleMenu}>Soumettre</a></li>
          <li><a href="/" onClick={onLogout}>Déconnexion</a></li>
          </>
        ))}
        {!isLoginPage && !isRegisterPage && !isSoumissionPage && !isMesDemandesPage && (
          <>
            <li><a href="/soumission" onClick={toggleMenu}>Soumettre</a></li>
            <li><a href="/mesdemandes" onClick={toggleMenu}>Mes Requêtes</a></li>
          </>
        )}
        
      </ul>
    </div>
  );
}

export default Navigation;
