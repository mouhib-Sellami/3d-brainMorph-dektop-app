import { useGLTF } from "@react-three/drei";
import React from "react";
import { Material, Mesh, Plane } from "three";

export interface LoadModalWithSliceProps {
    model_path: string,
    scale: number
    constantX: number
    constantY: number
}

const LoadModalWithSlice: React.FC<LoadModalWithSliceProps> = (props) => {
    const { scene: originalScene } = useGLTF(props.model_path);

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
    }, [originalScene])

    const clippingPlaneX = React.useMemo(() => {
        const plane = new Plane();
        plane.normal.set(0, 0, -1);
        return plane;
    }, []);

    const clippingPlaneY = React.useMemo(() => {
        const plane = new Plane();
        plane.normal.set(0, -1, 0);
        return plane;
    }, []);

    React.useEffect(() => {
        clippingPlaneX.constant = props.constantX;
        clippingPlaneY.constant = props.constantY;
    }, [clippingPlaneX, props.constantX, clippingPlaneY, props.constantY]);

    clonedScene.traverse((child: any) => {
        if (child.isMesh) {
            child.material.clippingPlanes = [clippingPlaneX, clippingPlaneY];
            child.material.clipShadows = true;
        }
    });

    return <primitive object={clonedScene} {...props} />
}

export default LoadModalWithSlice;