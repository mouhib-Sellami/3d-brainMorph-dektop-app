import { DoubleSide } from "three";

function SlicingPlaneX({ constant, transparent }) {

    return (
        <mesh position={[0, 0, constant]}>
            <planeGeometry attach="geometry" args={[2.5, 2.5]} />
            <meshStandardMaterial
                attach="material"
                roughness={1}
                metalness={0}
                side={DoubleSide}
                color={transparent ? '#f5f5f5' : '#212121'}
                opacity={transparent ? 0.05 : 1}
                transparent={transparent}
            />
        </mesh>
    )
}

export default SlicingPlaneX;