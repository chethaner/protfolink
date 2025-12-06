import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';

const FloatingElements = ({ count = 5 }) => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.001;
        }
    });

    // Generate random floating elements
    const elements = Array.from({ length: count }, (_, i) => ({
        position: [
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
        ],
        scale: Math.random() * 0.5 + 0.3,
        speed: Math.random() * 0.5 + 0.5,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    }));

    return (
        <group ref={groupRef}>
            {elements.map((el, i) => (
                <FloatingElement key={i} {...el} index={i} />
            ))}
        </group>
    );
};

const FloatingElement = ({ position, scale, speed, color, index }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            // Floating animation
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + index) * 0.3;

            // Rotation
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <RoundedBox
            ref={meshRef}
            args={[1, 1, 1]}
            radius={0.1}
            smoothness={4}
            position={position}
            scale={scale}
        >
            <meshStandardMaterial
                color={color}
                metalness={0.5}
                roughness={0.2}
                transparent
                opacity={0.7}
            />
        </RoundedBox>
    );
};

export default FloatingElements;
