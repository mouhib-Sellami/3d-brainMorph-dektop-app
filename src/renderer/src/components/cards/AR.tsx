// import React, { useRef, useState, useEffect } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import * as THREE from "three";
// import LoadModal from "../treeD/LoadModal";
// import { OrbitControls, Stage } from "@react-three/drei";
// import { BrowserMultiFormatReader } from "@zxing/library";
// import LoadModalAR from "../treeD/LoadModalAR";

// const CameraFeed = ({ onQrDetected }) => {
//   const videoRef = useRef<any>(null);
//   const [qrScanner] = useState(new BrowserMultiFormatReader());

//   useEffect(() => {
//     // Start camera stream
//     navigator.mediaDevices
//       .getUserMedia({ video: { facingMode: "environment" } })
//       .then((stream) => {
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }

//         // Start scanning for QR codes
//         qrScanner.decodeFromVideoDevice(null, videoRef.current, (result:any, err) => {
//           if (result) {
//             console.log("QR Code detected:", result.text);
//             onQrDetected(result);
//           }
//         });
//       })
//       .catch((err) => console.error("Camera access error:", err));

//     return () => {
//       qrScanner.reset();
//     };
//   }, [onQrDetected, qrScanner]);

//   return (
//     <video
//       ref={videoRef}
//       autoPlay
//       playsInline
//       muted
//       style={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         objectFit: "fill",
//         width: "100%",
//       }}
//     />
//   );
// };

// const AR = (props) => {
//   const [qrPosition, setQrPosition] = useState<[number, number, number] | null>(null);

//   // Handle QR code detection
//   const handleQrDetected = (result) => {
//     console.log(result);
    
//     const { result: { text }, location } = result;
//     console.log("location");
//     console.log(location);
    
//     setQrPosition([1, , 1]);
//   };
//   console.log(qrPosition);
  
//   return (
//     <div style={{ position: "relative" }}>
//       {/* Camera Feed */}
//       <CameraFeed onQrDetected={handleQrDetected} />

//       {/* AR Canvas */}
//       <Canvas dpr={[2, 1]} shadows camera={{ fov: 90 }} onCreated={(state) => (state.gl.localClippingEnabled = true)}>
//         <ambientLight intensity={0.8} />
//         <directionalLight position={[2, 2, 2]} />

//         {/* Pass position to the LoadModal if QR is detected */}
//         {qrPosition && (
//           <Stage environment={"warehouse"}>
//             <LoadModalAR model_path={props.model_path} scale={0.01} position={qrPosition} />
//           </Stage>
//         )}

//         <OrbitControls
//           enableZoom={true}
//           enablePan={true}
//           enableRotate={true}
//           maxDistance={10}
//           minDistance={1}
//         />
//       </Canvas>
//     </div>
//   );
// };

// export default AR;
