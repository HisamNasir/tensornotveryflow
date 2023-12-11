"use client"
import React, { useEffect, useState } from 'react';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import { FaSpinner } from 'react-icons/fa';
interface HandGestureComponentProps {
  image: string;
}

const HandGestureComponent: React.FC<HandGestureComponentProps> = ({ image }) => {
    const [numFingers, setNumFingers] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
        const runHandpose = async () => {
          try {
            const net = await handpose.load();
            const img = document.createElement('img');
            img.src = image;
            img.onload = async () => {
              const hands = await net.estimateHands(img);
              if (hands.length > 0) {
                const landmarks = hands[0].landmarks;
                const fingerTips = [4, 8, 12, 16, 20];
                const extendedFingers = fingerTips.filter((tip) => landmarks[tip][2] > 0.5).length;
                setNumFingers(extendedFingers);
              }
              setIsLoading(false); // Set loading to false after processing
            };
          } catch (error) {
            console.error('Error loading handpose model:', error);
            setIsLoading(false); // Set loading to false in case of an error
          }
        };
    
        runHandpose();
      }, [image]);
    
      if (isLoading) {
        return <div className="flex justify-center gap-2  items-center"><span className=' flex j items-center animate-spin m-2'><FaSpinner/> </span> Loading...</div>; // You can replace this with a loading spinner or animation
      }

  return (
    <div className="flex justify-center gap-2  items-center">
        <div className='my-4 p-2 outline-dashed outline-2 rounded-xl bg-sky-100'>
        <h1 className=' font-bold'>Captured Image</h1>
      <img className="my-2 h-48 rounded-xl" src={image} alt="Captured Hand" />
        </div>
      {numFingers !== null && (
        <p className="text-lg font-bold text-blue-500">Fingers: {numFingers}</p>
      )}
    </div>
  );
};

export default HandGestureComponent;
