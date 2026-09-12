"use client";

import { Canvas } from "@react-three/fiber";
import { Text, Float, OrbitControls } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import { useInView } from "framer-motion";

const allSkills = [
  "Flutter", "Dart", "BLoC", "Cubit", "Provider",
  "REST API", "GraphQL", "JSON", "Laravel", "Serverpod",
  "Supabase", "Firestore", "Firebase Auth", "OAuth",
  "SQLite", "Drift", "Hive",
  "Material", "Responsive", "Rive", "Clean Arch",
  "Git", "GitHub Actions", "Fastlane", "Google Play", "App Store",
  "Android", "iOS", "Paymob",
];

const fibonacci = (n, radius) => {
  const points = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < n; i++) {
    const theta = Math.acos(1 - (2 * (i + 0.5)) / n);
    const phi = (2 * Math.PI * i) / goldenRatio;
    points.push([
      radius * Math.sin(theta) * Math.cos(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(theta),
    ]);
  }
  return points;
};

const SkillLabel = ({ position, text }) => {
  return (
    <Float speed={0.5} rotationIntensity={0} floatIntensity={0.3}>
      <Text
        position={position}
        fontSize={0.22}
        color="#c8a25a"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.85}
        font={undefined}
      >
        {text}
      </Text>
    </Float>
  );
};

const Globe = () => {
  const points = useMemo(() => fibonacci(allSkills.length, 3), []);

  return (
    <group>
      {/* Outer wireframe sphere */}
      <mesh>
        <sphereGeometry args={[3.6, 24, 24]} />
        <meshBasicMaterial color="#534666" wireframe transparent opacity={0.06} />
      </mesh>
      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#c8a25a" transparent opacity={0.3} />
      </mesh>
      {/* Orbit rings */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.2, 0.008, 16, 100]} />
        <meshBasicMaterial color="#c8a25a" transparent opacity={0.12} />
      </mesh>
      <mesh rotation={[Math.PI / 5, Math.PI / 4, 0]}>
        <torusGeometry args={[3.4, 0.008, 16, 100]} />
        <meshBasicMaterial color="#534666" transparent opacity={0.1} />
      </mesh>
      <mesh rotation={[Math.PI / 2.5, Math.PI / 6, Math.PI / 8]}>
        <torusGeometry args={[3, 0.008, 16, 100]} />
        <meshBasicMaterial color="#6b5a80" transparent opacity={0.08} />
      </mesh>
      {/* Skill labels */}
      {allSkills.map((skill, i) => (
        <SkillLabel key={i} position={points[i]} text={skill} />
      ))}
    </group>
  );
};

const SkillsSphere = ({ className = "" }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "200px" });

  return (
    <div ref={containerRef} className={`skills_sphere ${className}`}>
      {isInView && (
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <Globe />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.8}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={(3 * Math.PI) / 4}
            />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default SkillsSphere;
