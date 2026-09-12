"use client";

import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useInView } from "framer-motion";

const WireframeShape = ({ position, geometry, scale, speed, color, opacity }) => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.003 * speed;
      ref.current.rotation.y += 0.004 * speed;
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.4;
    }
  });

  const geomProps = {
    icosahedron: <icosahedronGeometry args={[1, 0]} />,
    octahedron: <octahedronGeometry args={[1, 0]} />,
    torusKnot: <torusKnotGeometry args={[0.6, 0.2, 64, 16]} />,
    dodecahedron: <dodecahedronGeometry args={[1, 0]} />,
    torus: <torusGeometry args={[0.7, 0.3, 16, 32]} />,
    tetrahedron: <tetrahedronGeometry args={[1, 0]} />,
    cone: <coneGeometry args={[0.7, 1.4, 4]} />,
    box: <boxGeometry args={[1, 1, 1]} />,
  };

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.3}>
      <mesh ref={ref} position={position} scale={scale}>
        {geomProps[geometry] || geomProps.icosahedron}
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

const presets = {
  hero: [
    { pos: [-5, 2, -4], geo: "icosahedron", scale: 1.3, speed: 1.2, color: "#c8a25a", op: 0.2 },
    { pos: [5, -1, -5], geo: "torusKnot", scale: 0.9, speed: 0.8, color: "#534666", op: 0.18 },
    { pos: [-3, -3, -6], geo: "octahedron", scale: 1.1, speed: 1, color: "#c8a25a", op: 0.15 },
    { pos: [4, 3, -7], geo: "dodecahedron", scale: 1, speed: 0.7, color: "#6b5a80", op: 0.12 },
    { pos: [0, -4, -5], geo: "torus", scale: 0.8, speed: 1.4, color: "#e0c17a", op: 0.14 },
    { pos: [-6, -1, -8], geo: "tetrahedron", scale: 0.7, speed: 1.1, color: "#534666", op: 0.1 },
    { pos: [6, 1, -6], geo: "cone", scale: 0.6, speed: 0.9, color: "#c8a25a", op: 0.12 },
    { pos: [-1, 4, -7], geo: "box", scale: 0.5, speed: 1.3, color: "#6b5a80", op: 0.1 },
  ],
  sparse: [
    { pos: [-4, 2, -5], geo: "octahedron", scale: 0.7, speed: 0.8, color: "#c8a25a", op: 0.12 },
    { pos: [4, -2, -6], geo: "dodecahedron", scale: 0.6, speed: 1, color: "#534666", op: 0.1 },
    { pos: [0, 3, -7], geo: "tetrahedron", scale: 0.5, speed: 0.6, color: "#6b5a80", op: 0.08 },
  ],
  code: [
    { pos: [-5, 1, -4], geo: "box", scale: 0.5, speed: 0.7, color: "#c8a25a", op: 0.12 },
    { pos: [5, -2, -5], geo: "box", scale: 0.4, speed: 0.9, color: "#534666", op: 0.1 },
    { pos: [-3, -3, -6], geo: "tetrahedron", scale: 0.6, speed: 0.8, color: "#6b5a80", op: 0.1 },
    { pos: [3, 3, -7], geo: "octahedron", scale: 0.5, speed: 1, color: "#c8a25a", op: 0.08 },
    { pos: [0, -1, -5], geo: "cone", scale: 0.4, speed: 1.1, color: "#e0c17a", op: 0.09 },
  ],
  network: [
    { pos: [-4, 0, -3], geo: "icosahedron", scale: 0.8, speed: 0.5, color: "#c8a25a", op: 0.15 },
    { pos: [4, 2, -4], geo: "icosahedron", scale: 0.6, speed: 0.7, color: "#534666", op: 0.12 },
    { pos: [0, -3, -5], geo: "icosahedron", scale: 0.5, speed: 0.9, color: "#6b5a80", op: 0.1 },
    { pos: [-3, 3, -6], geo: "dodecahedron", scale: 0.7, speed: 0.6, color: "#c8a25a", op: 0.1 },
    { pos: [3, -1, -4], geo: "torus", scale: 0.5, speed: 0.8, color: "#e0c17a", op: 0.1 },
  ],
};

const FloatingShapes = ({ preset = "sparse", className = "" }) => {
  const shapes = presets[preset] || presets.sparse;
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "200px" });

  return (
    <div ref={containerRef} className={`floating_shapes ${className}`}>
      {isInView && (
        <Canvas
          camera={{ position: [0, 0, 8], fov: 55 }}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.4} color="#c8a25a" />
            <pointLight position={[-10, -10, -5]} intensity={0.2} color="#534666" />
            {shapes.map((s, i) => (
              <WireframeShape
                key={i}
                position={s.pos}
                geometry={s.geo}
                scale={s.scale}
                speed={s.speed}
                color={s.color}
                opacity={s.op}
              />
            ))}
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default FloatingShapes;
