// import React, { useEffect, useMemo } from "react";
// import { Center, Container } from "@mantine/core";
// import { useGLTF, Stage, PresentationControls, OrbitControls } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
// import { useControls } from 'leva'
// import { BackSide, DoubleSide, Line3, Plane, Vector3 } from "three";


// function Model(props) {

//     const { scene } = useGLTF("./combined_mesh_transparency.glb");

//     const clippingPlaneX = useMemo(() => {
//         const plane = new Plane();
//         plane.normal.set(0, 0, -1);
//         return plane;
//     }, []);

//     const clippingPlaneY = useMemo(() => {
//         const plane = new Plane();
//         plane.normal.set(0, -1, 0);
//         return plane;
//     }, []);

//     useEffect(() => {
//         clippingPlaneX.constant = props.constantX;
//         clippingPlaneY.constant = props.constantY;
//     }, [clippingPlaneX, props.constantX, clippingPlaneY, props.constantY]);

//     scene.traverse((child: any) => {
//         if (child.isMesh) {
//             child.material.clippingPlanes = [clippingPlaneX, clippingPlaneY];
//             child.material.clipShadows = true;
//         }
//     });

//     return <primitive object={scene} {...props} />
// }

// function SlicingPlaneX({ constant, transparent }) {

//     return (
//         <mesh position={[0, 0, constant]}>
//             <planeGeometry attach="geometry" args={[2.5, 2.5]} />
//             <meshStandardMaterial
//                 attach="material"
//                 roughness={1}
//                 metalness={0}
//                 side={DoubleSide}
//                 color={transparent ? '#f5f5f5' : '#212121'}
//                 opacity={transparent ? 0.09 : 1}
//                 transparent={transparent}
//             />
//         </mesh>
//     )
// }
// function SlicingPlaneY({ constant, transparent }) {

//     return (
//         <mesh position={[0, constant, 0]} rotation={[Math.PI / 2, 0, 0]}>
//             <planeGeometry attach="geometry" args={[2.5, 2.5]} />
//             <meshStandardMaterial
//                 attach="material"
//                 roughness={1}
//                 metalness={0}
//                 side={DoubleSide}
//                 color={transparent ? '#f5f5f5' : '#212121'}
//                 opacity={transparent ? 0.01 : 1}
//                 transparent={transparent}
//             />
//         </mesh>
//     )
// }

// const Landing: React.FC = () => {
//     const { constantX, constantY, transparent } = useControls('plane', {
//         transparent: true,
//         constantX: { value: 0, min: -1, max: 1, step: 0.01 },
//         constantY: { value: 0, min: -1, max: 1, step: 0.01 },
//     })

//     return (
//         <Canvas dpr={[2, 1]} shadows camera={{ fov: 90 }} style={{ "position": "absolute" }} onCreated={(state) => (state.gl.localClippingEnabled = true)}>
//             <SlicingPlaneX constant={constantX} transparent={transparent} />
//             <SlicingPlaneY constant={constantY} transparent={transparent} />
//             <color attach="background" args={["#101010"]} />
//             <Stage environment={"warehouse"}>
//                 <Model constantX={constantX} constantY={constantY} scale={0.01} />
//             </Stage>
//             <OrbitControls
//                 enableZoom={true}
//                 enablePan={true}
//                 enableRotate={true}
//                 maxDistance={10}
//                 minDistance={1}
//             />
//         </Canvas>
//     )
// }

// export default Landing;