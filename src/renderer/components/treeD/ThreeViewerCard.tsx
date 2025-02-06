import { OrbitControls, Stage } from "@react-three/drei";
import LoadModal from "./LoadModal";
import { Canvas } from "@react-three/fiber";

export interface ThreeViewerCardProps {
    model_path: string
}

const ThreeViewerCard: React.FC<ThreeViewerCardProps> = ({ model_path }) => {

    return (
        <Canvas dpr={[2, 1]} shadows camera={{ fov: 90 }} style={{ "position": "absolute" }} onCreated={(state) => (state.gl.localClippingEnabled = true)}>
            <color attach="background" args={["#101010"]} />
            <Stage environment={"warehouse"}>
                <LoadModal model_path={model_path} scale={0.01} />
            </Stage>
            <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                maxDistance={10}
                minDistance={1}
            />
        </Canvas>
    )
}

export default ThreeViewerCard;