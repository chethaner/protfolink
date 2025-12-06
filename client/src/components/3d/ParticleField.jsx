import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { get3DSettings } from './utils/helpers';

const ParticleField = ({ count, color = '#9333ea' }) => {
    const mesh = useRef();
    const settings = get3DSettings();
    const particleCount = count || settings.particles;

    // Generate random positions for particles
    const particles = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const colorObj = new THREE.Color(color);

        for (let i = 0; i < particleCount; i++) {
            // Random position in 3D space
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

            // Slightly randomize colors
            colors[i * 3] = colorObj.r + Math.random() * 0.1;
            colors[i * 3 + 1] = colorObj.g + Math.random() * 0.1;
            colors[i * 3 + 2] = colorObj.b + Math.random() * 0.1;
        }

        return { positions, colors };
    }, [particleCount, color]);

    // Animated particle movement
    useFrame((state) => {
        if (mesh.current) {
            const positions = mesh.current.geometry.attributes.position.array;

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;

                // Wave motion
                positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;

                // Reset particles that drift too far
                if (positions[i3 + 1] > 5) positions[i3 + 1] = -5;
                if (positions[i3 + 1] < -5) positions[i3 + 1] = 5;
            }

            mesh.current.geometry.attributes.position.needsUpdate = true;

            // Slow rotation
            mesh.current.rotation.y += 0.0002;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={particles.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particleCount}
                    array={particles.colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export default ParticleField;
