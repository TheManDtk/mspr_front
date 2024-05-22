import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/navigation'; // Importe le composant Navigation
import Login from './components/Login/login'; // Importe le composant Login
import SoumissionImage from './components/SoumissionImage';
import MesDemandes from './components/MesDemandes';
import Identification from './components/Identification';
import Register from './components/Register/register';
// import Register from './components/Register/register'; // Mettre en commentaire l'importation de Register

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation /> {/* Utilise le composant Navigation à la place du header */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/soumission" element={<SoumissionImage />} />
          <Route path="/mesdemandes" element={<MesDemandes />} />
          <Route path="/identification" element={<Identification />} />
          <Route path="/register" element={<Register />} />


          {/* Ajoute d'autres routes si nécessaire */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
