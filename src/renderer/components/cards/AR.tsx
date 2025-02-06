import React, { Suspense, useState, useEffect } from "react";
import { ZapparCamera, ImageTracker, ZapparCanvas, Loader, BrowserCompatibility } from '@zappar/zappar-react-three-fiber';
import targetImage from "./brain_morph.zpt";
import CustomLoadingOverlay from "../customLoading/CustomLoadingOverlay";
import LoadModalAR from "../treeD/LoadModalAR";
import HandTracking from "@components/treeD/HandTracking";

export interface ARProps {
    model_path: string
}

const AR: React.FC<ARProps> = ({ model_path }) => {
    const [isTracking, setIsTracking] = useState(false);
    const [distance, setDistance] = useState(1);
console.log(model_path);

    useEffect(() => {
        console.log("isTracking:", isTracking);
    }, [isTracking]);

    return (
        <>
            <BrowserCompatibility />
            <ZapparCanvas gl={{ preserveDrawingBuffer: true }}>
                <ZapparCamera />
                <Suspense fallback={<CustomLoadingOverlay />}>
                    <ImageTracker
                        targetImage={targetImage}
                        onVisible={() => setIsTracking(true)}
                        onNotVisible={() => setIsTracking(false)}
                    >
                        {isTracking && (
                            <Suspense fallback={<CustomLoadingOverlay />}>
                                <LoadModalAR
                                    model_path={model_path}
                                    scale={0.01}
                                    position={[0, 0, -2]}
                                    distance={distance}
                                />
                            </Suspense>
                        )}
                    </ImageTracker>
                </Suspense>
                <directionalLight position={[2.5, 8, 5]} intensity={5} />
                <Loader />
            </ZapparCanvas>
            <HandTracking onDistanceChange={setDistance} />
            <div id="zappar-button" role="button" style={{ display: 'none' }}>
                Play Animation
            </div>
        </>
    );
};

export default AR;