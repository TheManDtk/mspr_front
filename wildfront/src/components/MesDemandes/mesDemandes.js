import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './mesDemandes.css';

function MesDemandes() {
  const [soumissions, setSoumissions] = useState([]);

  useEffect(() => {
    // Récupération des soumissions de l'utilisateur connecté
    axios.get('http://localhost:8000/wildlens/list-soumissions/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setSoumissions(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  return (
    <div>
    // Affichage du tableau avec les données des soumissions
    <div className="back"> </div>
    <div className="mes-demandes-container">
      <h2>Historique de mes demandes</h2>
      <div className="table-container">
        <table className="demandes-table">
          <thead>
            <tr>
              <th>Date de Soumission</th>
              <th>Photofile</th>
              <th>Identification</th>
              <th>Taux de Correspondance(%)</th>
            </tr>
          </thead>
          <tbody>
            {soumissions.map(soumission => (
              <tr key={soumission.id}>
                <td>{soumission.date_soumission}</td>
                <td><img src={`http://localhost:8000${soumission.image}`} alt="image" /></td>
                <td>{soumission.id_identification.especetrouve}</td>
                <td>{soumission.id_identification.niveau_correspondance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default MesDemandes;
