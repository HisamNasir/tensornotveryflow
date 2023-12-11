'use client'
import React, { useState } from 'react';
import WebcamComponent from '../ui/WebcamComponent';
import HandGestureComponent from '../ui/HandGestureComponentProps';
import '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
const Home: React.FC = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleCapture = (image: string) => {
    setCapturedImage(image);
  };

  return (
    <div>
      <WebcamComponent onCapture={handleCapture} />
      {capturedImage && <HandGestureComponent image={capturedImage} />}
    </div>
  );
};

export default Home;
