"use client";

import { useRef, useEffect } from "react";
import "@google/model-viewer";

export default function ModelViewer({ fileUrl }) {
  const modelRef = useRef(null);

  useEffect(() => {
    const modelViewer = modelRef.current;

    // Example: Add a listener for when the model is loaded
    modelViewer?.addEventListener('load', () => {
      console.log('Model loaded!');

      // Set the initial scale of the model
      modelViewer.setAttribute('scale', '1.4 1.4 1.4'); // Adjust the scale as needed

      // Adjust the camera position
      modelViewer.setAttribute('camera-orbit', '0deg 90deg 50m'); // Adjust the camera angle and distance
    });

    return () => {
      modelViewer?.removeEventListener('load', () => {
        console.log('Model loaded!');
      });
    };
  }, []);

  return (
    <div className="w-full h-96 flex items-center justify-center">
      {fileUrl}
      <model-viewer
        ref={modelRef}
        src={fileUrl}
        alt="A 3D model"
        auto-rotate
        camera-controls
        style={{ width: '100%', height: '100%' }}
        onClick={() => modelRef.current?.setAttribute('camera-controls', 'true')} // Enable camera controls on click
      >
      </model-viewer>
    </div>
  );
}