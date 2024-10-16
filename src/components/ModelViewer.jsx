"use client";

import { useRef, useEffect, useState } from "react";
import "@google/model-viewer";
import { motion } from "framer-motion"; // Import motion




const styles = {
    fadeOut: {
      opacity: 0,
      transition: 'opacity 0.5s ease',
    },
    fadeIn: {
      opacity: 1,
      transition: 'opacity 0.5s ease',
    },
  };

  



export default function ModelViewer({ fileUrl }) {
    const modelRef = useRef(null);
    const [modelLoaded, setModelLoaded] = useState(false);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
       
        const modelViewer = modelRef.current;

        const handleModelLoad = () => {
            console.log("Model loaded successfully!");
            (async () => {
                await delay(2000);

                setModelLoaded(true);
            })();
            initiateAnimations(modelViewer);
        };
        
        const handleModelError = (error) => {
            console.error("Error loading model:", error);
            console.error("Error details:", error.detail);
        };
        
        modelViewer?.addEventListener("load", handleModelLoad);
        modelViewer?.addEventListener("error", handleModelError);

        return () => {
            modelViewer?.removeEventListener("load", handleModelLoad);
            modelViewer?.removeEventListener("error", handleModelError);
        };
    }, [fileUrl]);

    const initiateAnimations = (modelViewer) => {
        const duration = 2000;
        const steps = 100;

        // Scale Animation
        animateScale(modelViewer, 1, duration, steps);

        // Camera Orbit Animation
        const { initialOrbit, targetOrbit } = getOrbitSettings(fileUrl);
        animateCameraOrbit(
            modelViewer,
            initialOrbit,
            targetOrbit,
            duration,
            steps
        );
    };

    const getOrbitSettings = (fileUrl) => {
        const isCoinModel = fileUrl === "/assets/3d/JUBA_COIN.glb";
        return {
            initialOrbit: isCoinModel ? "0deg 0deg 50m" : "0deg 90deg 50m",
            targetOrbit: isCoinModel ? "90deg 0deg 50m" : "0deg 90deg 50m",
        };
    };

    const animateScale = (modelViewer, targetScale, duration, steps) => {
        let scaleValue = 0;
        const increment = targetScale / steps;
        const interval = duration / steps;

        const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

        const scaleInterval = setInterval(() => {
            scaleValue = Math.min(scaleValue + increment, targetScale);
            const easedScale =
                easeInOut(scaleValue / targetScale) * targetScale;
            modelViewer.setAttribute(
                "scale",
                `${easedScale} ${easedScale} ${easedScale}`
            );
            if (scaleValue >= targetScale) clearInterval(scaleInterval);
        }, interval);
    };

    const animateCameraOrbit = (
        modelViewer,
        initialOrbit,
        targetOrbit,
        duration,
        steps
    ) => {
        const [initialAzimuth, initialElevation] = initialOrbit
            .split(" ")
            .map(parseFloat);
        const [targetAzimuth, targetElevation] = targetOrbit
            .split(" ")
            .map(parseFloat);

        let currentAzimuth = initialAzimuth;
        let currentElevation = initialElevation;
        const azimuthIncrement = (targetAzimuth - initialAzimuth) / steps;
        const elevationIncrement = (targetElevation - initialElevation) / steps;
        const interval = duration / steps;

        const orbitInterval = setInterval(() => {
            currentAzimuth += azimuthIncrement;
            currentElevation += elevationIncrement;

            modelViewer.setAttribute(
                "camera-orbit",
                `${currentAzimuth}deg ${currentElevation}deg 50m`
            );
            if (
                Math.abs(currentAzimuth - targetAzimuth) < 0.01 &&
                Math.abs(currentElevation - targetElevation) < 0.01
            ) {
                clearInterval(orbitInterval);
            }
        }, interval);
    };


   


    return (
        <div className="w-full h-full flex items-center justify-center relative">
            
      

            <div
  className={`flex items-center justify-center transition-all duration-500 ${
    modelLoaded ? 'opacity-0' : 'opacity-100'
  }`}
>
  <div className="absolute inset-0 flex items-center justify-center">
    <div
      className={`relative flex flex-col items-center transition-transform duration-500`} // Add transition for scale
      style={{ transform: modelLoaded ? 'scale(0.5)' : 'scale(1)' }} // Scale when modelLoaded is true
    >
      <div className="w-24 h-24 rounded-full border-4 border-transparent border-t-[#FFB800] animate-spin" />
      <div className="w-20 h-20 rounded-full bg-[#FFB800] animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
    </div>
  </div>
</div>

  

<model-viewer
    ref={modelRef}
    src={fileUrl}
    alt="A 3D model"
    auto-rotate
    camera-controls
    shadow-intensity="1" // Adjust shadow intensity (0 to 1)
    exposure="1" // Adjust the exposure level (default is 1)

    style={{
        width: "100%",
        height: "100%",
        scale: modelLoaded ? "1" : "0",
        transition: "scale 2s ease-in-out", // Smooth scaling
    }}
/>






        </div>
    );
}
