import React from 'react';
import './identification.css';

const Identification = () => {
  const identification = JSON.parse(localStorage.getItem('identification'));
  const infoEspece = identification?.info_espece;
  const probabilite = JSON.parse(localStorage.getItem('probabilite')) || {};
  console.log(probabilite);


  
  return (
    <div className="identification-page">
      <div className="identification-container">
        <div className="section">
          <div className="image-container">
            {/* Cadre pour l'image */}
            <div className="image-frame">
              {/* Afficher l'image de l'espèce */}
              {infoEspece && <img src={`http://localhost:8000${infoEspece?.cover}`} alt={infoEspece?.espece_nom} className="animal-image" />}
            </div>
          </div>
          

          <div className="info">
            <h2 className="section-title">Nom: {infoEspece?.espece_nom}</h2>
            <p className="section-description">{infoEspece?.description}</p>
          </div>

        </div>

        <div className="section">
          <div className="section-title">Taux de correpondance :</div>
          <div className="section-content section-content-probabilite">{probabilite?.probabilite}%</div>
        </div>

        <div className="section">
          <div className="section-title">Famille :</div>
          <div className="section-content">{infoEspece?.famille}</div>
        </div>



        <div className="section">
          <div className="section-title">Habitat :</div>
          <div className="section-content">{infoEspece?.habitat}</div>
        </div>

        <div className="section">
          <div className="section-title">Région :</div>
          <div className="section-content">{infoEspece?.region}</div>
        </div>

        <div className="section">
          <div className="section-title">Fun Fact :</div>
          <div className="section-content">{infoEspece?.fun_fact}</div>
        </div>

        <div className="section">
          <div className="section-title">Nom Latin :</div>
          <div className="section-content">{infoEspece?.nom_latin}</div>
        </div>

      </div>
    </div>
  );
};

export default Identification;
