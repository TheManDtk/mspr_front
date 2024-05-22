import React, { useState } from 'react';
import './soumissionImage.css';
import Webcam from 'react-webcam';
import axios from 'axios';

function SoumissionImage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [camera, setCamera] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isFromWebcam, setIsFromWebcam] = useState(false);  // Nouvel état pour suivre l'origine de l'image
  const webcamRef = React.useRef(null);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      setSelectedImageFile(imageFile);
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setIsImageSelected(true);
        setIsFromWebcam(false);  // L'image ne provient pas de la webcam
      };
    }
  };

  const handleSecondButtonClick = () => {
    if (isFromWebcam) {
      alert('Cette fonctionnalité n\'est pas encore implémentée, merci d\'attendre les mises à jour.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImageFile);
  
    axios.post('http://localhost:8000/wildlens/soumissions/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('probabilite', JSON.stringify(response.data.probabilite));
        localStorage.setItem('identification', JSON.stringify(response.data));
        window.location.href = '/identification';
      })
      .catch(error => {
        console.error(error);
      });
  };

  function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const handleTakePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const imageFile = dataURLtoFile(imageSrc, `photo_${Date.now()}.jpg`);
    setSelectedImage(imageSrc);
    setSelectedImageFile(imageFile);
    setCamera(false);
    setIsImageSelected(true);
    setIsFromWebcam(true);  // L'image provient de la webcam
  };

  const handleCancel = () => {
    setCamera(false);
    setIsImageSelected(false);
    setIsFromWebcam(false);  // Réinitialiser l'état
  };

  return (
    <div className="soumission-image-page">
      <div className="demandes-background"></div>
      <div className="cadre">
        {selectedImage ? (
          <img src={selectedImage} alt="une photo sélectionnée" className="image-preview" />
        ) : (
          <div className="message">Aucune image sélectionnée</div>
        )}
        {camera && (
          <div className="camera-container">
            <Webcam ref={webcamRef} />
          </div>
        )}
      </div>
      <div className="button-container">
        {!camera && (
          <>
            <label htmlFor="file-upload" className="custom-file-upload">
              Choisir un fichier
              <input type="file" accept="image/*" id="file-upload" name="image" onChange={handleImageChange} className="file-upload" />
            </label>
            <button onClick={() => setCamera(true)} className={`button-upload ${isImageSelected ? 'disabled' : ''}`}>
              Prendre une photo initial
            </button>
          </>
        )}
        <button onClick={handleSecondButtonClick} disabled={!isImageSelected} className={`button-upload ${!isImageSelected ? 'disabled' : ''}`}>
          Soumettre fichier
        </button>

        {camera && (
          <div className="camera-buttons">
            <button onClick={handleTakePhoto} className="button-take-photo">Prendre une photo</button>
            <button onClick={handleCancel} className="button-cancel">Annuler</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SoumissionImage;
