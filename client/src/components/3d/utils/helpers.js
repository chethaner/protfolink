// 3D utility functions
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Custom hook for smooth rotation
export const useRotation = (speed = 0.01) => {
    const ref = useRef();

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += speed;
        }
    });

    return ref;
};

// Custom hook for floating animation
export const useFloating = (amplitude = 0.2, speed = 1) => {
    const ref = useRef();

    useFrame((state) => {
        if (ref.current) {
            ref.current.position.y = Math.sin(state.clock.elapsedTime * speed) * amplitude;
        }
    });

    return ref;
};

// Custom hook for mouse following
export const useMouseFollow = (intensity = 0.1) => {
    const ref = useRef();

    useFrame((state) => {
        if (ref.current) {
            const { mouse } = state;
            ref.current.rotation.x = mouse.y * intensity;
            ref.current.rotation.y = mouse.x * intensity;
        }
    });

    return ref;
};

// Detect WebGL support
export const detectWebGL = () => {
    try {
        const canvas = document.createElement('canvas');
        return !!(
            window.WebGLRenderingContext &&
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
    } catch (e) {
        return false;
    }
};

// Check device performance level
export const getPerformanceLevel = () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );

    if (isMobile) return 'low';

    // Simple heuristic based on hardware concurrency
    const cores = navigator.hardwareConcurrency || 2;
    if (cores >= 8) return 'high';
    if (cores >= 4) return 'medium';
    return 'low';
};

// Responsive 3D settings based on device
export const get3DSettings = () => {
    const level = getPerformanceLevel();

    const settings = {
        high: {
            antialias: true,
            shadows: true,
            particles: 1000,
            dpr: [1, 2],
        },
        medium: {
            antialias: true,
            shadows: false,
            particles: 500,
            dpr: [1, 1.5],
        },
        low: {
            antialias: false,
            shadows: false,
            particles: 200,
            dpr: [1, 1],
        },
    };

    return settings[level];
};
