import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import ParticleField from './ParticleField';
import FloatingElements from './FloatingElements';
import { get3DSettings, detectWebGL } from './utils/helpers';

const HeroScene = ({ children, interactive = true }) => {
    const settings = get3DSettings();
    const hasWebGL = detectWebGL();

    // Fallback for browsers without WebGL
    if (!hasWebGL) {
        return (
            <div className="relative w-full h-full bg-gradient-to-br from-purple-900 to-indigo-900">
                {children}
            </div>
        );
    }

    return (
        <div className="relative w-full h-full">
            {/* 3D Canvas Background */}
            <Canvas
                className="absolute inset-0 w-full h-full"
                dpr={settings.dpr}
                gl={{ antialias: settings.antialias }}
            >
                <Suspense fallback={null}>
                    {/* Camera */}
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />

                    {/* Lighting */}
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9333ea" />

                    {/* Environment for reflections */}
                    <Environment preset="city" />

                    {/* 3D Elements */}
                    <ParticleField count={settings.particles} color="#9333ea" />
                    <FloatingElements count={5} />

                    {/* Interactive Controls (optional) */}
                    {interactive && (
                        <OrbitControls
                            enableZoom={false}
                            enablePan={false}
                            maxPolarAngle={Math.PI / 2}
                            minPolarAngle={Math.PI / 2}
                            autoRotate
                            autoRotateSpeed={0.5}
                        />
                    )}
                </Suspense>
            </Canvas>

            {/* Content Overlay */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
};

export default HeroScene;
