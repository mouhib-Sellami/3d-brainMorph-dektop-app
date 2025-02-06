import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React from "react";
import { Box3, Mesh, Vector3 } from "three";

export interface LoadModalProps {
  model_path: string;
  scale: number;
  position: [number, number, number];
  distance: number
}

const LoadModalAR: React.FC<LoadModalProps> = (props) => {
  const { model_path, scale, position, distance } = props;
  const { scene: originalScene } = useGLTF(model_path);
  const modelRef = React.useRef<any>();

  const clonedScene = React.useMemo(() => {
    const clone = originalScene.clone();

    const box = new Box3().setFromObject(clone);
    const center = new Vector3();
    box.getCenter(center);

    clone.position.sub(center);

    clone.traverse((child) => {
      if (child instanceof Mesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material = child.material.map((mat) => mat.clone());
        } else {
          child.material = child.material.clone();
        }
      }
    });

    return clone;
  }, [originalScene]);

  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.x += delta * 0.5;
      modelRef.current.rotation.y += delta * 0.5;
      modelRef.current.scale.setScalar(scale * (distance > 0.1 ? distance + 1 : 1));
    }
  });

  return (
    <group ref={modelRef} position={position}>
      <primitive object={clonedScene} />
    </group>
  );
};

export default LoadModalAR;
