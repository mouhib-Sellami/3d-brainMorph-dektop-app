import { Card, Grid, Modal } from "@mantine/core";
import { useControls } from "leva";
import { Canvas } from "@react-three/fiber";
import SlicingPlaneX from "./slice-components/SlicingPlanX";
import SlicingPlaneY from "./slice-components/SlicingPlanY";
import { OrbitControls, Stage } from "@react-three/drei";
import LoadModalWithSlice from "./slice-components/LoadModalWithSlice";

export interface RenderWithoutSlicerModalProps extends BaseModalProps {
    model_path: string
}


const RenderWithSlicerModal: React.FC<RenderWithoutSlicerModalProps> = ({ model_path, isVisible, onClose }) => {
    const { constantX, constantY, transparent } = useControls('plane', {
        transparent: true,
        constantX: { value: 0, min: -1, max: 1, step: 0.01 },
        constantY: { value: 0, min: -1, max: 1, step: 0.01 },
    })
    return (
        <Modal
            opened={isVisible}
            onClose={onClose}
            fullScreen
            radius={0}
            m={0}
            transitionProps={{ transition: 'fade', duration: 200 }}
        >
            <Grid>
                <Grid.Col span={12} mih={"90vh"}>
                    <Card bg="black" w={"100%"} h={"100%"} p={0} m={0}>
                        <Canvas dpr={[2, 1]} shadows camera={{ fov: 90 }} style={{ "position": "absolute" }} onCreated={(state) => (state.gl.localClippingEnabled = true)}>
                            <SlicingPlaneX constant={constantX} transparent={transparent} />
                            <SlicingPlaneY constant={constantY} transparent={transparent} />
                            <color attach="background" args={["#101010"]} />
                            <Stage environment={"warehouse"}>
                                <LoadModalWithSlice model_path={model_path} constantX={constantX} constantY={constantY} scale={0.01} />
                            </Stage>
                            <OrbitControls
                                enableZoom={true}
                                enablePan={true}
                                enableRotate={true}
                                maxDistance={10}
                                minDistance={1}
                            />
                        </Canvas>
                    </Card>
                </Grid.Col>
            </Grid>
        </Modal>
    )
}

export default RenderWithSlicerModal;