"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const MouseCamera = () => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.5 - camera.position.x) * 0.02;
    camera.position.y += (mouse.current.y * 0.3 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  if (typeof window !== "undefined") {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
  }

  return null;
};

const FloatingGeometry = ({ position, speed, geometry, scale, color, opacity }) => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.003 * speed;
      ref.current.rotation.y += 0.004 * speed;
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.5;
    }
  });

  const geomMap = {
    icosahedron: <icosahedronGeometry args={[1, 0]} />,
    octahedron: <octahedronGeometry args={[1, 0]} />,
    torusKnot: <torusKnotGeometry args={[0.6, 0.2, 64, 16]} />,
    dodecahedron: <dodecahedronGeometry args={[1, 0]} />,
    torus: <torusGeometry args={[0.7, 0.3, 16, 32]} />,
    tetrahedron: <tetrahedronGeometry args={[1, 0]} />,
    box: <boxGeometry args={[1, 1, 1]} />,
  };

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.3}>
      <mesh ref={ref} position={position} scale={scale}>
        {geomMap[geometry] || geomMap.icosahedron}
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={opacity}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
};

const GlowSphere = () => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.material.distort = 0.3 + Math.sin(state.clock.elapsedTime) * 0.15;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, -8]} scale={2.5}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color="#c8a25a"
        transparent
        opacity={0.05}
        distort={0.3}
        speed={2}
        roughness={0}
      />
    </mesh>
  );
};

const ConnectionLines = ({ count = 30 }) => {
  const ref = useRef();
  const linePositions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const x1 = (Math.random() - 0.5) * 20;
      const y1 = (Math.random() - 0.5) * 14;
      const z1 = -3 - Math.random() * 8;
      const x2 = x1 + (Math.random() - 0.5) * 4;
      const y2 = y1 + (Math.random() - 0.5) * 4;
      const z2 = z1 + (Math.random() - 0.5) * 2;
      arr.push(x1, y1, z1, x2, y2, z2);
    }
    return new Float32Array(arr);
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={linePositions.length / 3}
          array={linePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#c8a25a"
        transparent
        opacity={0.04}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#c8a25a" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#534666" />
      <pointLight position={[0, 5, 5]} intensity={0.2} color="#e0c17a" />

      <GlowSphere />
      <ConnectionLines count={25} />

      <FloatingGeometry position={[-5, 2, -4]} speed={1.2} geometry="icosahedron" scale={1.3} color="#c8a25a" opacity={0.2} />
      <FloatingGeometry position={[5, -1, -5]} speed={0.8} geometry="torusKnot" scale={0.9} color="#534666" opacity={0.18} />
      <FloatingGeometry position={[-3, -3, -6]} speed={1} geometry="octahedron" scale={1.1} color="#c8a25a" opacity={0.15} />
      <FloatingGeometry position={[4, 3, -7]} speed={0.7} geometry="dodecahedron" scale={1} color="#6b5a80" opacity={0.12} />
      <FloatingGeometry position={[0, -4, -5]} speed={1.4} geometry="torus" scale={0.8} color="#e0c17a" opacity={0.14} />
      <FloatingGeometry position={[-6, -1, -8]} speed={1.1} geometry="tetrahedron" scale={0.7} color="#534666" opacity={0.1} />
      <FloatingGeometry position={[6, 1, -6]} speed={0.9} geometry="box" scale={0.5} color="#c8a25a" opacity={0.12} />
      <FloatingGeometry position={[-1, 4, -7]} speed={1.3} geometry="box" scale={0.4} color="#6b5a80" opacity={0.1} />
      <FloatingGeometry position={[2, -2, -3]} speed={0.6} geometry="tetrahedron" scale={0.6} color="#e0c17a" opacity={0.1} />
      <FloatingGeometry position={[-4, 0, -9]} speed={0.5} geometry="dodecahedron" scale={0.8} color="#534666" opacity={0.08} />

      <Stars radius={60} depth={60} count={2500} factor={4} saturation={0} fade speed={1.2} />

      <MouseCamera />
    </>
  );
};

export default Scene;
