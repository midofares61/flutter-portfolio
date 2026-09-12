"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";
import { useInView } from "framer-motion";

const Particles = ({ count = 80, color = "#c8a25a", spread = 20, size = 0.03 }) => {
  const meshRef = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5;
    }
    return pos;
  }, [count, spread]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const FloatingRing = ({ radius = 3, speed = 0.3, color = "#c8a25a", opacity = 0.15 }) => {
  const ringRef = useRef();
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.3 + 0.5;
      ringRef.current.rotation.z = state.clock.elapsedTime * speed * 0.5;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
};

const ParticleField = ({
  className = "",
  particleCount = 80,
  showStars = true,
  showRings = true,
  color = "#c8a25a",
  intensity = "medium",
}) => {
  const configs = {
    light: { particles: 40, starCount: 500, spread: 15, size: 0.025 },
    medium: { particles: 80, starCount: 1000, spread: 20, size: 0.03 },
    heavy: { particles: 150, starCount: 2000, spread: 25, size: 0.035 },
  };
  const cfg = configs[intensity] || configs.medium;
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "200px" });

  return (
    <div ref={containerRef} className={`particle_field ${className}`}>
      {isInView && (
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <Particles
              count={particleCount || cfg.particles}
              color={color}
              spread={cfg.spread}
              size={cfg.size}
            />
            {showStars && (
              <Stars
                radius={40}
                depth={40}
                count={cfg.starCount}
                factor={3}
                saturation={0}
                fade
                speed={0.8}
              />
            )}
            {showRings && (
              <>
                <FloatingRing radius={4} speed={0.2} color={color} opacity={0.08} />
                <FloatingRing radius={6} speed={0.15} color="#534666" opacity={0.06} />
              </>
            )}
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default ParticleField;
