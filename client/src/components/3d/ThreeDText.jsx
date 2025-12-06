import { Text3D, Center } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const ThreeDText = ({
    text,
    size = 1,
    height = 0.2,
    color = '#9333ea',
    position = [0, 0, 0],
    animate = false
}) => {
    const textRef = useRef();

    useFrame((state) => {
        if (textRef.current && animate) {
            textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <Center position={position}>
            <Text3D
                ref={textRef}
                font="/fonts/helvetiker_regular.typeface.json"
                size={size}
                height={height}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
            >
                {text}
                <meshStandardMaterial
                    color={color}
                    metalness={0.5}
                    roughness={0.2}
                />
            </Text3D>
        </Center>
    );
};

export default ThreeDText;
