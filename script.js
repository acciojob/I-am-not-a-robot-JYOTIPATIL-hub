//your code here
import React, { useState, useEffect } from 'react';
import './style.css'; // Make sure to include your CSS here

const App = () => {
  const imagesArray = ['img1', 'img2', 'img3', 'img4', 'img5'];
  const [shuffledImages, setShuffledImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [resetVisible, setResetVisible] = useState(false);
  const [verifyVisible, setVerifyVisible] = useState(false);
  const [message, setMessage] = useState('');

  // Function to shuffle and randomly duplicate an image
  const shuffleImages = () => {
    const randomImage = imagesArray[Math.floor(Math.random() * imagesArray.length)];
    let imagesWithDuplicate = [...imagesArray, randomImage];
    imagesWithDuplicate = imagesWithDuplicate.sort(() => Math.random() - 0.5);
    setShuffledImages(imagesWithDuplicate);
    setMessage('Please click on the identical tiles to verify that you are not a robot.');
    setSelectedImages([]);
    setResetVisible(false);
    setVerifyVisible(false);
  };

  // On component mount, shuffle images
  useEffect(() => {
    shuffleImages();
  }, []);

  // Handle image click event
  const handleImageClick = (imgClass, index) => {
    if (selectedImages.length === 2 || selectedImages.includes(index)) {
      return; // Prevent clicking more than 2 or double-clicking the same image
    }

    const newSelectedImages = [...selectedImages, index];
    setSelectedImages(newSelectedImages);
    setResetVisible(true);

    if (newSelectedImages.length === 2) {
      setVerifyVisible(true);
    }
  };

  // Handle verify button click
  const handleVerify = () => {
    setVerifyVisible(false);
    const [firstIndex, secondIndex] = selectedImages;
    if (shuffledImages[firstIndex] === shuffledImages[secondIndex]) {
      setMessage('You are a human. Congratulations!');
    } else {
      setMessage('We can\'t verify you as a human. You selected the non-identical tiles.');
    }
  };

  // Handle reset button click
  const handleReset = () => {
    shuffleImages();
  };

  return (
    <div>
      <h3 id="h">Please click on the identical tiles to verify that you are not a robot.</h3>
      <div className="image-container">
        {shuffledImages.map((imgClass, index) => (
          <img
            key={index}
            className={imgClass}
            alt="tile"
            onClick={() => handleImageClick(imgClass, index)}
          />
        ))}
      </div>

      {resetVisible && <button id="reset" onClick={handleReset}>Reset</button>}
      {verifyVisible && <button id="verify" onClick={handleVerify}>Verify</button>}
      <p id="para">{message}</p>
    </div>
  );
};

export default App;
