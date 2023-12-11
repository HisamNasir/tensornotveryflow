'use client'
import React, { useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import { FaBeer, FaCamera } from "react-icons/fa";
interface WebcamComponentProps {
  onCapture: (image: string) => void;
}

const WebcamC: React.FC<WebcamComponentProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  }, [onCapture]);

  return (
    <div className="flex flex-col items-center py-8">
      <div className='p-4 shadow-2xl rounded-xl bg-slate-100 border border-sl'>
      <h1 className=' font-semibold text-lg tracking-wider'>Take picture of your hand </h1>
      <Webcam
        className="mb-4 rounded-xl mt-4"
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ width: 640, height: 360, facingMode: 'user' }}
      />
      <div className=' flex justify-center'>

      <button
        className="bg-black text-white p-4 rounded-full flex items-center text-3xl gap-2"
        onClick={capture}
      >
        <FaCamera/>
      </button>
      </div>

      </div>
    </div>
  );
};

export default WebcamC;
