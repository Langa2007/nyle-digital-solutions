'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Float,
  Html,
  PresentationControls,
  Sparkles,
} from '@react-three/drei';
import { Code2, Database, Globe2, ShieldCheck, Zap, Cpu } from 'lucide-react';
import { useRef } from 'react';
import * as THREE from 'three';


// ─── Crystal Tower (central focal piece) ────────────────────────────────────
function CrystalTower() {
  const topRef = useRef<THREE.Mesh>(null);
  const midRef = useRef<THREE.Mesh>(null);
  const baseRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (topRef.current) topRef.current.rotation.y = t * 0.8;
    if (midRef.current) midRef.current.rotation.y = -t * 0.5;
    if (baseRef.current) baseRef.current.rotation.y = t * 0.3;
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 2.1) * 0.06);
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.9;
      ring1Ref.current.rotation.z = t * 0.4;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.6;
      ring2Ref.current.rotation.y = t * 1.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Base prism */}
      <mesh ref={baseRef} position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.55, 0.85, 0.9, 6, 1]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.9}
          roughness={0.1}
          emissive="#1d4ed8"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Mid crystal shard */}
      <mesh ref={midRef} position={[0, 0.25, 0]}>
        <octahedronGeometry args={[0.72, 0]} />
        <meshStandardMaterial
          color="#38bdf8"
          metalness={0.7}
          roughness={0.05}
          emissive="#0284c7"
          emissiveIntensity={0.9}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Top spire */}
      <mesh ref={topRef} position={[0, 1.1, 0]}>
        <tetrahedronGeometry args={[0.52, 0]} />
        <meshStandardMaterial
          color="#e0f2fe"
          metalness={0.6}
          roughness={0.02}
          emissive="#7dd3fc"
          emissiveIntensity={1.4}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Glow aura */}
      <mesh ref={glowRef} position={[0, 0.25, 0]}>
        <sphereGeometry args={[1.05, 16, 16]} />
        <meshStandardMaterial
          color="#38bdf8"
          transparent
          opacity={0.06}
          emissive="#38bdf8"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Orbital ring 1 — cyan */}
      <mesh ref={ring1Ref} position={[0, 0.25, 0]}>
        <torusGeometry args={[1.28, 0.018, 12, 100]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#06b6d4"
          emissiveIntensity={2.2}
        />
      </mesh>

      {/* Orbital ring 2 — amber */}
      <mesh ref={ring2Ref} position={[0, 0.25, 0]}>
        <torusGeometry args={[1.6, 0.012, 12, 120]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={1.8}
        />
      </mesh>
    </group>
  );
}

// ─── Orbiting Satellite ───────────────────────────────────────────────────────
interface SatelliteProps {
  radius: number;
  speed: number;
  phase: number;
  tilt: number;
  color: string;
  emissive: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  size: number;
}

function Satellite({
  radius,
  speed,
  phase,
  tilt,
  color,
  emissive,
  label,
  icon: Icon,
  size,
}: SatelliteProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + phase;
    if (groupRef.current) {
      groupRef.current.position.set(
        Math.cos(t) * radius,
        Math.sin(t * 0.4) * 0.45 + Math.sin(tilt),
        Math.sin(t) * radius,
      );
    }
    if (bodyRef.current) bodyRef.current.rotation.y += 0.02;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={bodyRef} castShadow>
        <dodecahedronGeometry args={[size, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.85}
          metalness={0.55}
          roughness={0.2}
        />
      </mesh>
      <Html center distanceFactor={8.5} transform>
        <div className="vantech-3d-label">
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </div>
      </Html>
    </group>
  );
}

// ─── Data-stream ribbon ───────────────────────────────────────────────────────
function DataRibbon({ index }: { index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const startAngle = (Math.PI * 2 * index) / 5;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * (0.35 + index * 0.08);
      meshRef.current.rotation.x = Math.sin(t * 0.55 + startAngle) * 0.22;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0.25, 0]}>
      <torusKnotGeometry
        args={[1.95 + index * 0.3, 0.01, 120, 4, index % 3 === 0 ? 2 : 3, 5]}
      />
      <meshStandardMaterial
        color={index % 2 === 0 ? '#818cf8' : '#34d399'}
        emissive={index % 2 === 0 ? '#6366f1' : '#10b981'}
        emissiveIntensity={1.5}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

// ─── Floating Code Panels ─────────────────────────────────────────────────────
function CodePanel({ position, delay }: { position: [number, number, number]; delay: number }) {
  return (
    <Float speed={1.1} floatIntensity={0.55} rotationIntensity={0.08}>
      <group position={position}>
        <mesh castShadow>
          <boxGeometry args={[0.72, 0.45, 0.04]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.6}
            roughness={0.35}
            emissive="#1e3a5f"
            emissiveIntensity={0.4}
            transparent
            opacity={0.82}
          />
        </mesh>
        {/* Glowing edge strip */}
        <mesh position={[0, 0.21, 0.021]}>
          <boxGeometry args={[0.72, 0.03, 0.01]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={3}
          />
        </mesh>
        {/* Fake code lines */}
        {[0, -0.07, -0.14].map((y, i) => (
          <mesh key={i} position={[-0.06 + i * 0.02, y, 0.022]}>
            <boxGeometry args={[0.38 - i * 0.08, 0.025, 0.005]} />
            <meshStandardMaterial
              color={i === 0 ? '#7dd3fc' : i === 1 ? '#34d399' : '#fbbf24'}
              emissive={i === 0 ? '#38bdf8' : i === 1 ? '#10b981' : '#f59e0b'}
              emissiveIntensity={1.2}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// ─── Hex Grid Ground ─────────────────────────────────────────────────────────
function HexGrid() {
  const gridRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (gridRef.current) {
      (gridRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.25 + Math.sin(clock.elapsedTime * 1.4) * 0.12;
    }
  });

  return (
    <group position={[0, -1.95, 0]}>
      <mesh ref={gridRef} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 4.5, 6]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.75}
          roughness={0.2}
          emissive="#0891b2"
          emissiveIntensity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Concentric hex rings */}
      {[1.2, 2.2, 3.2].map((r, i) => (
        <mesh key={r} position={[0, 0.01 + i * 0.01, 0]} rotation={[-Math.PI / 2, 0, (i % 2) * 0.52]}>
          <ringGeometry args={[r - 0.015, r, 6]} />
          <meshStandardMaterial
            color={i === 0 ? '#22d3ee' : i === 1 ? '#818cf8' : '#34d399'}
            emissive={i === 0 ? '#06b6d4' : i === 1 ? '#6366f1' : '#10b981'}
            emissiveIntensity={1.5}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Scene ───────────────────────────────────────────────────────────────────
const satellites: SatelliteProps[] = [
  {
    radius: 2.2,
    speed: 0.55,
    phase: 0,
    tilt: 0.4,
    color: '#22d3ee',
    emissive: '#0891b2',
    label: 'WebGL UI',
    icon: Code2,
    size: 0.22,
  },
  {
    radius: 2.6,
    speed: 0.38,
    phase: 2.1,
    tilt: -0.3,
    color: '#a78bfa',
    emissive: '#7c3aed',
    label: 'Cloud API',
    icon: Globe2,
    size: 0.19,
  },
  {
    radius: 2.0,
    speed: 0.72,
    phase: 4.3,
    tilt: 0.6,
    color: '#34d399',
    emissive: '#059669',
    label: 'Secure Data',
    icon: Database,
    size: 0.20,
  },
  {
    radius: 2.9,
    speed: 0.44,
    phase: 1.2,
    tilt: -0.5,
    color: '#fbbf24',
    emissive: '#d97706',
    label: 'Launch Ops',
    icon: ShieldCheck,
    size: 0.18,
  },
  {
    radius: 1.8,
    speed: 0.92,
    phase: 3.5,
    tilt: 0.2,
    color: '#f472b6',
    emissive: '#db2777',
    label: 'AI Engine',
    icon: Zap,
    size: 0.17,
  },
  {
    radius: 3.1,
    speed: 0.29,
    phase: 5.8,
    tilt: -0.7,
    color: '#60a5fa',
    emissive: '#2563eb',
    label: 'DevOps Core',
    icon: Cpu,
    size: 0.21,
  },
];

const codePanels: Array<{ position: [number, number, number]; delay: number }> = [
  { position: [-2.8, 0.9, -0.8], delay: 0 },
  { position: [2.6, 1.2, -1.0], delay: 0.3 },
  { position: [-2.5, -0.7, 0.4], delay: 0.6 },
  { position: [2.9, -0.5, 0.2], delay: 0.9 },
];

export default function Vantech3DScene() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[640px] overflow-visible">
      <Canvas
        shadows
        camera={{ position: [0, 1.2, 7.2], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.45} />
        <directionalLight position={[5, 8, 6]} intensity={2.8} castShadow />
        <pointLight position={[-4, 3, 2]} color="#22d3ee" intensity={80} distance={10} />
        <pointLight position={[4, -2, 3]} color="#a78bfa" intensity={60} distance={9} />
        <pointLight position={[0, 2, -2]} color="#fbbf24" intensity={40} distance={7} />

        <Environment preset="night" />

        {/* Dense sparkle field */}
        <Sparkles count={130} scale={[7, 5.5, 5]} size={1.8} speed={0.35} color="#93c5fd" />
        <Sparkles count={60} scale={[5, 4, 4]} size={2.8} speed={0.55} color="#f9a8d4" />

        <PresentationControls
          global
          cursor
          speed={1.2}
          zoom={0.9}
          rotation={[0.1, -0.2, 0]}
          polar={[-0.35, 0.35]}
          azimuth={[-0.55, 0.55]}
        >
          <Float speed={0.9} floatIntensity={0.18} rotationIntensity={0.06}>
            {/* Central crystal tower */}
            <CrystalTower />

            {/* Data-stream ribbons */}
            {[0, 1, 2].map((i) => (
              <DataRibbon key={i} index={i} />
            ))}

            {/* Orbiting satellites */}
            {satellites.map((sat) => (
              <Satellite key={sat.label} {...sat} />
            ))}

            {/* Floating code panels */}
            {codePanels.map((p, i) => (
              <CodePanel key={i} {...p} />
            ))}

            {/* Hex grid ground */}
            <HexGrid />
          </Float>
        </PresentationControls>
      </Canvas>
    </div>
  );
}
