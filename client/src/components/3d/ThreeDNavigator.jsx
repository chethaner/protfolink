import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Text, OrbitControls, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const ThreeDNavigator = ({ portfolio, onSectionChange }) => {
    const [currentRoom, setCurrentRoom] = useState('entrance');
    const cameraRef = useRef();

    // Room positions in 3D space
    const rooms = {
        entrance: { position: [0, 0, 0], label: 'Welcome' },
        profile: { position: [5, 0, 0], label: 'About Me' },
        experience: { position: [0, 0, 5], label: 'Experience' },
        projects: { position: [-5, 0, 0], label: 'Projects' },
        contact: { position: [0, 0, -5], label: 'Contact' },
    };

    const navigateToRoom = (roomName) => {
        setCurrentRoom(roomName);
        onSectionChange?.(roomName);
    };

    return (
        <div className="relative w-full h-screen">
            {/* 3D Canvas */}
            <Canvas>
                <PerspectiveCamera
                    ref={cameraRef}
                    makeDefault
                    position={rooms[currentRoom].position}
                />

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Environment preset="sunset" />

                {/* Floor */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                    <planeGeometry args={[50, 50]} />
                    <meshStandardMaterial color="#1a1a2e" />
                </mesh>

                {/* Room Objects */}
                {Object.entries(rooms).map(([key, room]) => (
                    <Room
                        key={key}
                        position={room.position}
                        label={room.label}
                        isActive={currentRoom === key}
                        onClick={() => navigateToRoom(key)}
                    />
                ))}

                <OrbitControls enableZoom={false} />
            </Canvas>

            {/* Navigation UI Overlay */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="flex gap-2 bg-black/50 backdrop-blur-md rounded-full p-2">
                    {Object.entries(rooms).map(([key, room]) => (
                        <motion.button
                            key={key}
                            onClick={() => navigateToRoom(key)}
                            className={`px-4 py-2 rounded-full font-semibold transition-all ${currentRoom === key
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-white/20 text-white hover:bg-white/30'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {room.label}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Current Room Info */}
            <div className="absolute bottom-4 left-4 z-10">
                <div className="bg-black/50 backdrop-blur-md rounded-lg p-4 text-white">
                    <h3 className="text-2xl font-bold">{rooms[currentRoom].label}</h3>
                    <p className="text-sm text-gray-300">Use WASD or drag to navigate</p>
                </div>
            </div>
        </div>
    );
};

// Individual room component
const Room = ({ position, label, isActive, onClick }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
            if (isActive) {
                meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
            } else {
                meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
            }
        }
    });

    return (
        <group position={position}>
            {/* Room platform */}
            <mesh ref={meshRef} onClick={onClick}>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial
                    color={isActive ? '#9333ea' : '#4b5563'}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Label */}
            <Text
                position={[0, 2, 0]}
                fontSize={0.5}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {label}
            </Text>

            {/* Light beam when active */}
            {isActive && (
                <pointLight position={[0, 3, 0]} intensity={2} color="#9333ea" />
            )}
        </group>
    );
};

export default ThreeDNavigator;
