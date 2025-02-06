import React from "react";
import { Hands } from '@mediapipe/hands';
import { drawLandmarks } from '@mediapipe/drawing_utils';
import * as cam from '@mediapipe/camera_utils';

export interface HandTrackingProps {
    onDistanceChange: (distance: number) => void;
}

const HandTracking: React.FC<HandTrackingProps> = ({ onDistanceChange }) => {
    const videoRef = React.useRef<any>(null);
    const canvasRef = React.useRef<any>(null);
  
    React.useEffect(() => {
      const hands = new Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });
  
      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7,
      });
  
      hands.onResults((results) => {
        drawResults(results);
        if (results.multiHandLandmarks.length > 0) {
          const distance = calculateDistance(results.multiHandLandmarks[0]);
          onDistanceChange(distance);
        }
      });
  
      if (videoRef.current) {
        const camera = new cam.Camera(videoRef.current, {
          onFrame: async () => {
            await hands.send({ image: videoRef.current });
          },
          width: 640,
          height: 480,
        });
        camera.start();
      }
    }, [onDistanceChange]);
  
    const drawResults = (results:any) => {
      const canvasElement = canvasRef.current;
      const canvasCtx = canvasElement.getContext('2d');
  
      canvasElement.width = 1280;
      canvasElement.height = 960;
  
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  
      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
  
          drawLandmarks(canvasCtx, landmarks, {
            color: '#FF0000',
            radius: 5,
          });
        }
      }
    };
  
    const calculateDistance = (landmarks:any ) => {
      const indexTip = landmarks[8];
      const thumbTip = landmarks[4];
  
      const dx = indexTip.x - thumbTip.x;
      const dy = indexTip.y - thumbTip.y;
      const dz = indexTip.z - thumbTip.z;
  
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    };
  
    return (
      <div>
        <video ref={videoRef} style={{ display: 'none' }}></video>
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></canvas>
      </div>
    );
};

export default HandTracking;