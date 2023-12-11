'use client'
import React, { useState } from 'react';
import WebcamC from '../ui/WebcamC';
import HandGestureC from '../ui/HandGestureC';
import '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
const Home: React.FC = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const handleCapture = (image: string) => {
    setCapturedImage(image);
  };
  return (
    <div>
      <WebcamC onCapture={handleCapture} />
      {capturedImage && <HandGestureC image={capturedImage} />}
    </div>
  );
};
export default Home;
