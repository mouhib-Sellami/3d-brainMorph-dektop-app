import { useGLTF } from "@react-three/drei";
import React from "react";
import { Material, Mesh } from "three";

export interface LoadModalProps {
  model_path: string;
  scale: number;
  position: [number, number, number];
}

const LoadModalAR: React.FC<LoadModalProps> = (props) => {
  const { model_path, scale, position } = props;

  const { scene: originalScene } = useGLTF(model_path);

  const clonedScene = React.useMemo(() => {
    const clone = originalScene.clone();

    clone.traverse((child) => {
      if (child instanceof Mesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material = child.material.map((mat: Material) => mat.clone());
        } else {
          child.material = child.material.clone();
        }
      }
    });

    return clone;
  }, [originalScene]);

  return <primitive object={clonedScene} scale={scale} position={position} />;
};

export default LoadModalAR;
