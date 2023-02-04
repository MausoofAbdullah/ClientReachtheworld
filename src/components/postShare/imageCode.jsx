import React, { useState } from 'react';

function ImageUploader() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Invalid file type');
      return;
    }

    // Check file size
    if (file.size > 1000000) {
      setError('File is too large (max 1MB)');
      return;
    }

    reader.onload = (e) => {
      setImage(e.target.result);
      setError(null);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <input type="file" onChange={handleChange} />
      {error && <p>{error}</p>}
      {image && <img src={image} alt="uploaded" />}
    </>
  );
}

export default ImageUploader;
